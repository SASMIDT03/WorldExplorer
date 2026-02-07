import { useState, useEffect } from 'react';
import type { Country } from "./interface/Country.ts";
import { CountryCard } from "./CountryCard.tsx";
import "./App.css"

export function App() {

    const [countries, setCountries] = useState<Country[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population")
            .then(res => res.json())
            .then((data: Country[]) => {
                data.sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common))
                setCountries(data);
            })
    }, []);

    const filteredCountries: Country[] = countries.filter((country: Country) => {
        return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    })

    return (
        <div>
            <header>
                <h1>World Explorer</h1>
                <p>Displaying {filteredCountries.length} countries</p>
            </header>
            <div className={"MainContainer"}>
                <input
                    type={"text"}
                    placeholder="Search... "
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        console.log("st: ", searchTerm)
                    }}
                    className="SearchInput"
                />
                <div className={"CountryGrid"}>
                    {filteredCountries.map((country) => (
                        <CountryCard
                            key = {country.name.common}
                            name = {country.name.common}
                            population = {country.population}
                            continent = {country.region}
                            flag = {country.flags.png} />
                    ))}
                </div>
            </div>


        </div>
    )
}


