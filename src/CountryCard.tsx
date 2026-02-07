import "./CountryCard.css"

type CountryCardProps = {
    name: string;
    population: number;
    continent: string;
    flag: string;
}

export function CountryCard({name, population, continent, flag}: CountryCardProps) {

    return (
        <div className={"CardBackground"}>
            <div className={"FlagContainer"}>
                <img src={flag}/>
            </div>
            <h3>{name}</h3>
            <div className="InformationPoint"><h4>Population:</h4><p>{population}</p></div>
            <div className="InformationPoint"><h4>Continent:</h4><p>{continent}</p></div>
        </div>
    )
}