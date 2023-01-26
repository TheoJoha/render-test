import { useState, useEffect } from 'react'
import axios from 'axios'
import Entry from './components/Entry'
import personService from './services/persons'
import './index.css'


const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(props.persons)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addEntry = (event) => { 
    event.preventDefault();
        const newObject = {
        name: newName,
        num: newNum
        }
        let alreadyExistingPerson = false
        let id = 0
        let message = null
        
        for (let i = 0; i < persons.length; i++) {
        console.log(JSON.stringify(persons[i].name), JSON.stringify(event.target.value))
        if (JSON.stringify(persons[i].name) === JSON.stringify(newObject.name)) {
            window.confirm(`${newName} is already in the phonebook. Do you want to replace the old number with a new one?`)
            alreadyExistingPerson = true
            id = i + 1
        }}
        setPersons(persons.concat(newObject))
        setNewNum('')
        

      if (alreadyExistingPerson == false) {
        personService
        .create(newObject)
        .then(returnedPerson => {
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
        })
        message = `Added ${newObject.name}`
      }

      if (alreadyExistingPerson == true) {
        personService
        .update(id, newObject)
        .then(response => {
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.map(person => person.id !== id ? person : response.data))
          setNewName('')
        })
        message = `Number changed to ${newObject.num}`
      }
      setErrorMessage(message)


    }
    
  const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
    }
  
  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    console.log(filter, 1)
    filterPersons(event.target.value)
  }

  function filterPersons (enteredWord) {
    let arrOfPersons = []
    if (enteredWord.length == 0) {
      arrOfPersons = persons
    }
    else {
      for (let i = 0; i < persons.length; i++) {
        for (let j = 0; j < enteredWord.length; j++) {
          if (JSON.stringify(persons[i].name[j]).toUpperCase() !== JSON.stringify(enteredWord[j]).toUpperCase()) {
            break
          }
          if (j == enteredWord.length - 1) {
            arrOfPersons.push(persons[i])
          }
        }
      }
    }
    setFilteredPersons(arrOfPersons)
    console.log(filteredPersons)
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <>
      <Notification message={errorMessage} />
      </>
      <div>
        <div>
        Filter by input: <input
        value={filter}
        onChange={handleFilterChange} 
            />
        </div>
        <h2>Add a name</h2>
      <form onSubmit={addEntry} >
<div>
  name: <input
            value={newName}
            onChange={handleNameChange} />
</div>
<div>
  number: <input 
            value={newNum}
            onChange={handleNumChange}
            />
  </div>
<div>
  <button type="submit">add</button>
</div>
</form>
      </div>
      <h2>Numbers</h2>
      <div>
      <FilteredRegister filtered={filteredPersons} />
      </div>
    </div>
  )
}

// Component(s)
const FilteredRegister = ({ filtered }) => {
  return (<>
    {filtered.map(entry => 
    <>              
    <Entry key={entry.name} entry={entry} />
    </>
      )}
      
    </>
  )
}

const Notification = ({ message }) => {
  console.log("notification is run")
  if (message === "" || message == null) {
    return null
  }
  console.log("returns message")
  return (
    <div className='error'>
      {message}
    </div>
  )
}

export default App