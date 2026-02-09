import {useState, useEffect, useMemo} from 'react';
import type { Country } from "./interface/Country.ts";
import { CountryCard } from "./CountryCard.tsx";
import "./App.css"

export function App() {

    const [countries, setCountries] = useState<Country[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<"countryName" | "population">("countryName");


    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,flags,population")
            .then(res => res.json())
            .then((data: Country[]) => {
                setCountries(data);
            })
    }, []);

    const displayedCountries: Country[] = useMemo(() => {
        const filteredCountries: Country[] = countries.filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        )

        return [...filteredCountries].sort((a: Country, b: Country) =>{
            if (sortBy === "population") { return b.population - a.population}
            return a.name.common.localeCompare(b.name.common)
        })
    }, [countries, searchTerm, sortBy])

    return (
        <div>
            <header>
                <h1>World Explorer</h1>
                <p>Displaying {displayedCountries.length} countries</p>
            </header>
            <div className={"MainContainer"}>
                <div className={"SearchTools"}>
                    <input
                        type={"text"}
                        placeholder="Search... "
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            console.log("st: ", searchTerm)
                        }}
                        className="SearchInput"
                    />
                    <button className="SortPopulation" onClick={() => setSortBy("population")}>F</button>
                </div>

                <div className={"CountryGrid"}>
                    {displayedCountries.map((country) => (
                        <CountryCard
                            key = {country.name.common}
                            name = {country.name.common}
                            flag = {country.flags.png} />
                    ))}
                </div>
            </div>


        </div>
    )
}


