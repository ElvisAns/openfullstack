import CountrySingleViewer from "./CountrySingleViewer"

const CountryViewer = (props) => {
    const countries = props.countries
    if (countries.length < 1) {
        return (
            <h2>No Data to be shown for now</h2>
        )
    }

    if (countries.length === 1) {
        const datas = countries[0]
        return (
            <CountrySingleViewer country_data={datas} />
        )
    }

    if (props.countries.length < 10) {
        return (
            <div>
                <h2>Your search result</h2>
                <ul>
                    {
                        countries.map((value, i) => <li key={i}>{value.name.official} <button onClick={()=>props.loadSpecificCountry(value.name.official)}>Show more</button></li>)
                    }
                </ul>
            </div>
        )
    }

    return (
        <h2>Please be more specific with your search query</h2>
    )
}

export default CountryViewer