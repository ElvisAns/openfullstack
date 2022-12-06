import {useState} from 'react'
import CountryViewer from './components/CountryViewer';
import axios from 'axios'
import './App.css';

function App() {
  const [searchText,updateSearchText] = useState('');
  const [countryData,updateCountryDatas] = useState([]);

  const loadCountryData = (event)=>{
    const search = event.target.value;
    updateSearchText(search)
    axios.get(`https://restcountries.com/v3.1/name/${search}`).then(res=>{
      updateCountryDatas(res.data)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <h1>Country Datas</h1>
        </p>
        <input placeholder="search" onChange={loadCountryData} value={searchText} type="search"/>
        <CountryViewer countries={countryData} />
      </header>
    </div>
  );
}

export default App;
