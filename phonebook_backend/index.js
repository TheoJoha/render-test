const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')


app.use(morgan(':method :url :body'))
app.use(express.json())
app.use(cors())

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

let entries = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "num": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "num": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "num": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "num": "39-23-6423122"
      }
  ]

let information = `Phonebook has info for ${entries.length} people`

let date = new Date()
date = date.toString()

infoDateObj = {
    info: information,
    date: date
}

testList = []
testList.push(infoDateObj.info)
testList.push(infoDateObj.date)


app.get('/info', (request, response) => {
    response.json(Object.values(infoDateObj))
  })

// get an entry
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const entry = entries.find(entry => entry.id === id)

    if (entry) {
        response.json(entry)
      } else {
        response.status(404).end()
      }
  })

// delete an entry
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    entries = entries.filter(entry => entry.id !== id)
  
    response.status(204).end()
  })


// get all entries
app.get('/api/persons', (request, response) => {
    response.json(entries)
})


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)

    randNum = getRandomInt(10000)
    body["id"] = randNum 

    // error checks
    if (!body.num) {
        return response.status(400).json({ 
        error: 'number missing' 
        })
    }

    if (!body.name) {
        return response.status(400).json({ 
        error: 'name missing' 
        })
    }

    for (let i = 0; i < entries.length; i++) {
        if (body.name == entries[i].name) {
            return response.status(400).json({ 
            error: 'name must be unique'
            })
        }
    }

    const entry = body
    console.log(entry)

    entries = entries.concat(entry)

    response.json(entry)

})


morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
  

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Sample app listening at http://localhost:${PORT}`)
})


