import { useState, useEffect } from 'react'
import AddForm from "./components/AddForm";
import Phonebook from './components/PhoneBook';
import Search from './components/Search';
import phoneBook from './services/phoneBook';
import Notification from './components/Notifications';

import './default.css'

const App = () => {
  const [persons, updatePersons] = useState([])
  const [newPerson, setNewPersonState] = useState("John Doe")
  const [newPhone, setNewPhoneState] = useState("");
  const [personsToShow, updatePersonsToShowState] = useState("")
  const [peronsFIltered, applyFilter] = useState(persons)
  const [notification, saveNotification] = useState({ message: '', error: false })

  useEffect(() => {
    phoneBook.getAll().then((data) => {
      applyFilter(data)
      updatePersons(data)
    })
  }, [])

  const setNewPerson = (event) => {
    setNewPersonState(event.target.value)
  }

  const setNewPhone = (event) => {
    setNewPhoneState(event.target.value)
  }

  const saveUser = (event) => {
    event.preventDefault()
    if (newPerson.length < 5 || newPhone.length < 6) {
      //alert("Please fill correct entry")
      saveNotification({
        message: "Please fill correct entry",
        error: true
      })
      return;
    }
    const old = [...persons];
    const exists = old.filter(person => person.name === newPerson)
    if (exists.length) {
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm(`The name ${newPerson} exists in your phonebook , do you want to update his number?`);

      if (confirmation) {
        phoneBook.updateOne(exists[0].id, {
          number: newPhone,
        }).then(res => {
          const filtered = persons.filter(v => v.id !== exists[0].id)
          filtered.push({
            name: exists[0].name,
            number: newPhone,
            id: exists[0].id
          })
          applyFilter(filtered)
          updatePersons(filtered)
          saveNotification({
            message:`The data for ${newPerson} has been updated successfully`,
            error: false
          })
    
        }).catch(err => {
          //alert("Error occured while trying to update the user datas")
          saveNotification({
            message: "Error occured while trying to update the user datas",
            error: true
          })
        })
      }
      return;
    }

    phoneBook.saveNew({
      name: newPerson,
      number: newPhone,
      id: old.length + 1
    }).then((res) => {
      old.push({
        name: newPerson,
        number: newPhone,
        id: old.length + 1
      })
      updatePersons(old)
      //setNewPersonState("")
      //setNewPhoneState("")
      applyFilter(old)
      saveNotification({
        message: `${newPerson} successfully recorded`,
        error: false
      })

    }).catch(err => {
      //alert("An error occured while trying to save to phonebook")
      saveNotification({
        message: "An error occured while trying to save to phonebook",
        error: true
      })
    })

  }

  const updatePersonsToShow = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    updatePersonsToShowState(event.target.value);

    if (searchTerm.length < 1) {
      applyFilter(persons)
      return
    }
    const filter_result = persons.filter((v) => v.name.toLowerCase().indexOf(searchTerm) !== -1);
    applyFilter(filter_result)
  }

  const deleteEntry = (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm(`Are you sure you want to delete ${name}`);
    if (confirmed) {
      phoneBook.deleteById(id).then(res => {
        const old = [...persons]
        const filtered = old.filter(v => v.id !== id)
        applyFilter(filtered)
        updatePersons(filtered)
        saveNotification({
          message: `${name} successfully deleted`,
          error: false
        })
      }).catch(err => {
        //alert("An error occured while trying to delete the entry")
        saveNotification({
          message: "An error occured while trying to delete the entry",
          error: true
        })
      })
    }
  }

  return (
    <div className="App">
      <Search personsToShow={personsToShow} updatePersonsToShow={updatePersonsToShow} />
      {notification.message && <Notification notification={notification} notificationStateSetter={saveNotification}/>}
      <Phonebook persons={peronsFIltered} deleteService={deleteEntry} />
      <AddForm saveUser={saveUser} setNewPhone={setNewPhone} newPhone={newPhone} newPerson={newPerson} setNewPerson={setNewPerson} />
    </div>
  );
}

export default App;
