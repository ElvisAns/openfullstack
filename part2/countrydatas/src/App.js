import { useState } from 'react'
import CountryViewer from './components/CountryViewer';
import axios from 'axios'
import './App.css';

function App() {
  const [searchText, updateSearchText] = useState('');
  const [countryData, updateCountryDatas] = useState([]);

  const loadCountryData = (event) => {
    const search = event.target.value;
    updateSearchText(search)
    axios.get(`https://restcountries.com/v3.1/name/${search}`).then(res => {
      updateCountryDatas(res.data)
    })
  }

  const loadSpecificCountry = name=>{
    updateSearchText(name)
    axios.get(`https://restcountries.com/v3.1/name/${name}`).then(res => {
      updateCountryDatas(res.data)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Country Datas</h1>
        <input placeholder="search" onChange={loadCountryData} value={searchText} type="search" />
        <CountryViewer loadSpecificCountry={loadSpecificCountry} countries={countryData} />
      </header>
    </div>
  );
}

export default App;
