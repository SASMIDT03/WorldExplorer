import "./CountryCard.css"
import type { ExpandedCountry} from "./interface/ExpandedCountry.ts";
import { motion } from "framer-motion"
import {useEffect, useState} from "react";

type CountryCardProps = {
    name: string;
    flag: string;
}

export function CountryCard({name, flag}: CountryCardProps) {

    const [hashedFetched, setHashedFetched] = useState<boolean>(false)
    const [country, setCountry] = useState<ExpandedCountry>()

    const handleFlipUpdate = (latest: { rotateY: number; }) => {
        if (latest.rotateY >= 90 && !hashedFetched) {
            console.log("Flip updated")
            fetchExpandedCountryData()
            setHashedFetched(true)
        }
    }

    function fetchExpandedCountryData() {
        fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,flags,region,population,capital,cioc`)
            .then(res => res.json())
            .then(data => setCountry(data[0]))
    }

    useEffect(() => {
        if (!country) return
        console.log("c: ", country?.capital[0])
    }, [country]);

    return (
        <div className={"CardContainer"}>
            <motion.div
                className={"CardBackground"}
                whileHover={{rotateY: 180}}
                transition={{type: "spring", stiffness: 100, damping: 10}}
                style={{ transformStyle: "preserve-3d" }}
                onUpdate={handleFlipUpdate}
            >
                <div className={"CardFace Front"}>
                    <h3>{name}</h3>
                    <div className={"FlagContainer"}>
                        <img src={flag}/>
                    </div>
                </div>

                <div className={"CardFace Back"}>
                    <h3>{name}</h3>
                    <div className="InformationPoint"><h4>Capital: </h4><p>{country?.capital}</p></div>
                    <div className="InformationPoint"><h4>Continent:</h4><p>{country?.region}</p></div>
                    <div className="InformationPoint"><h4>Population: </h4><p>{country?.population}</p></div>
                    <div className="InformationPoint"><h4>IOC: </h4><p>{country?.cioc}</p></div>


                </div>
            </motion.div>
        </div>

    )
}