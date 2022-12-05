import { useState } from 'react'
import AddForm from "./components/AddForm";
import Phonebook from './components/PhoneBook';
import Search from './components/Search';

import './default.css'

const App = () => {
  const [persons, updatePersons] = useState([])
  const [newPerson, setNewPersonState] = useState("John Doe")
  const [newPhone, setNewPhoneState] = useState("");
  const [personsToShow, updatePersonsToShowState] = useState("")
  const [peronsFIltered, applyFilter] = useState([])

  const setNewPerson = (event) => {
    setNewPersonState(event.target.value)
  }

  const setNewPhone = (event) => {
    setNewPhoneState(event.target.value)
  }

  const saveUser = (event) => {
    event.preventDefault()
    if (newPerson.length < 5 || newPhone.length < 6) {
      alert("Please fill correct entry")
      return;
    }
    const old = [...persons];
    const exists = old.filter(person => person.name === newPerson)
    if (exists.length) {
      alert("User Already registered");
      return;
    }

    old.push({
      name: newPerson,
      phone: newPhone
    })
    updatePersons(old)
    //setNewPersonState("")
    //setNewPhoneState("")
    applyFilter(old)
    alert(`${newPerson} successfully recorded`)
  }

  const updatePersonsToShow = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    updatePersonsToShowState(event.target.value);
  
    if (searchTerm.length < 1) {
      applyFilter(persons)
      return
    }
    const filter_result = persons.filter((v) => v.name.toLowerCase().indexOf(searchTerm)!== -1 );
    applyFilter(filter_result)
  }

  return (
    <div className="App">
      <Search personsToShow={personsToShow} updatePersonsToShow={updatePersonsToShow} />
      <Phonebook persons={peronsFIltered} />
      <AddForm saveUser={saveUser} setNewPhone={setNewPhone} newPhone={newPhone} newPerson={newPerson} setNewPerson={setNewPerson} />
    </div>
  );
}

export default App;
