import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios'

const baseUrl = '/api/notes'


ReactDOM.createRoot(document.getElementById('root')).render(<App />)

/* axios.get(baseUrl).then(response => {
  const persons = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App persons={persons} />
  )
}) */




