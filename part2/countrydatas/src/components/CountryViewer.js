import axios from 'axios'
import { useState, useEffect } from "react"

const CountryView = ({ country_data }) => {
    const specs = country_data[0]
    const name = specs.name.official
    const capital = specs.capital[0]
    const languages = specs.languages.forEach(element => `<li>${element}</li>`).join("");
    const area = specs.area
    const flag =  specs.flag.png
    const wheatherapikey = process.env.REACT_APP_APPID

    const [wheatherDt, saveWheather] = useState([]);

    useEffect(() => {
        axios.get(`//api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${wheatherapikey}`).then(response => {
            const temp = parseFloat(response.data.main.temp) - 273.15;
            const windSpeed = response.data.wind.speed;
            saveWheather([temp, windSpeed]);
        })
    })


}

const CountryViewer = (props) => {
    if (props.countries.length < 1) {
        return (
            <h2>No Data to be shown for now</h2>
        )
    }

    if (props.countries.length === 1) {
        const datas = props.countries[0]
        return (
            <CountryView country_data={datas} />
        )
    }

    if (props.countries.length < 10) {
        return (
            <ul>
                <h2>Your search result</h2>
                {
                    props.countries.map(v => (<li>{v.name} <button>Show more</button></li>))
                }
            </ul>
        )
    }

    return (
        <h2>Please be more specific with your search query</h2>
    )
}

export default CountryViewer