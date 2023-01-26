import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios'

/* const persons = [
    { name: 'Arto Hellas', num: '040-123456', id: 1 },
    { name: 'Ada Lovelace', num: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', num: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', num: '39-23-6423122', id: 4 }
] */


// ReactDOM.createRoot(document.getElementById('root')).render(<App />)

axios.get('http://localhost:3001/api/persons').then(response => {
  const persons = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App persons={persons} />
  )
})




