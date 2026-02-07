import "./CountryCard.css"
import { motion } from "framer-motion"

type CountryCardProps = {
    name: string;
    population: number;
    continent: string;
    flag: string;
}

export function CountryCard({name, population, continent, flag}: CountryCardProps) {


    return (
        <div className={"CardContainer"}>
            <motion.div
                className={"CardBackground"}
                whileHover={{rotateY: 180}}
                transition={{type: "spring", stiffness: 100, damping: 10}}
                style={{ transformStyle: "preserve-3d" }}
            >
                <div className={"CardFace Front"}>
                    <h3>{name}</h3>
                    <div className={"FlagContainer"}>
                        <img src={flag}/>
                    </div>
                </div>

                <div className={"CardFace Back"}>
                    <h3>{name}</h3>
                    <div className="InformationPoint"><h4>Population:</h4><p>{population}</p></div>
                    <div className="InformationPoint"><h4>Continent:</h4><p>{continent}</p></div>
                </div>
            </motion.div>
        </div>

    )
}