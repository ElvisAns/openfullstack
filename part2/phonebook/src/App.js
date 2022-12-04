import {useState} from 'react'
import AddForm from "./components/AddForm";
import Phonebook from './components/PhoneBook';

const App = () => {
  const [persons,updatePersons] = useState([])
  const [newPerson,setNewPersonState] = useState("John Doe")
  const [newPhone,setNewPhoneState] = useState("+1...");

  const setNewPerson = (event)=>{
    setNewPersonState(event.target.value)
  }

  const setNewPhone = (event)=>{
    setNewPhoneState(event.target.value)
  }

  const saveUser = (event)=>{
    event.preventDefault()
    const old = [...persons];
    const exists = old.filter(person=>person.name===newPerson)
    if(exists.length){
      alert("User Already registered");
      return;
    }

    old.push({
      name : newPerson,
      phone : newPhone
    })
    updatePersons(old)
    setNewPersonState("")
    setNewPhoneState("")
    alert(`${newPerson} successfully recorded`)
  }

  return (
    <div className="App">
      <Phonebook persons={persons}/>
      <AddForm saveUser={saveUser} setNewPhone={setNewPhone} newPhone={newPhone} newPerson={newPerson} setNewPerson={setNewPerson}/>
    </div>
  );
}

export default App;
