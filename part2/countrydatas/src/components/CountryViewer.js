import axios from 'axios'
import { useState,useEffect } from "react"

const CountryView = (props) => {
    const specs = props.country_data
    console.log(props)
    const name = specs.name.official
    const capital = specs.capital[0]
    const languages = specs.languages;
    const area = specs.area
    const flag = specs.flags.png

    const wheatherapikey = process.env.REACT_APP_APPID

    const [wheatherDt, saveWheather] = useState({
        temp : '...',
        windSpeed : '...'
    });

    useEffect(()=>{
    axios.get(`//api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${wheatherapikey}`).then(response => {
        const temp = parseFloat(response.data.main.temp).toFixed(2) - 273.15;
        const windSpeed = response.data.wind.speed;
        saveWheather({
            temp : Math.round(temp*100)/100,
            windSpeed : windSpeed
        })
    })
    },[])

    return (
        <div>
            <h3>{name}</h3>
            <h4>Capital : {capital}</h4>
            <h4>Area {area} km<sup>2</sup></h4>
            <p>{Object.values(languages).forEach(element => <li>{element}</li>)}</p>
            <img src={flag} alt="flag" />
            <hr/>
            <h4>Wheather Data</h4>
            <p>Temperature : {wheatherDt.temp} °C Today</p>
            <p>wind Speed : {wheatherDt.windSpeed} Kph</p>
        </div>
    )


}

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
            <CountryView country_data={datas} />
        )
    }

    if (props.countries.length < 10) {
        return (
            <div>
                <h2>Your search result</h2>
                <ul>
                    {
                        countries.map((value, i) => <li key={i}>{value.name.official} <button>Show more</button></li>)
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