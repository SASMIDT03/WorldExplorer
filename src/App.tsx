import { useState, useEffect } from 'react';
import type { Country } from "./interface/Country.ts";

export function App() {

    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population")
            .then(res => res.json())
            .then((data: Country[]) => {
                data.sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common))
                setCountries(data);
            })
    }, []);

    return (
        <div>
            <h1>Hello World</h1>
            <p>Displaying {countries.length} countries</p>
            <div>{countries.map((country) => (
                <p key={country.name.common}> {country.name.common}</p>
            ))}</div>
        </div>
    )
}


