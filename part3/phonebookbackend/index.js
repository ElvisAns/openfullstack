const express = require('express')
const fs = require('fs')
const crypto = require("crypto")
const morgan = require('morgan')
const db = require('./db.json')
const cors = require('cors')
const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
morgan.token('request-body', function (req, res) { return JSON.stringify(req.body)})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body', {
    skip: function (req, res) { return req.method !== "POST" }
}))


app.get('/api/persons', (request, response) => {
    response.send(db)
})

app.get('/info', (request, response) => {
    const n = db.length
    const date = new Date()
    response.send(`<h3>PhoneBook has info for ${n} people(s)</h3><br><h4>${date}</h4>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = db.find((v, i) => v.id == id)
    const notFound = { response: "The person id not found in phone book" }
    if (!person) {
        response.status(404).send(notFound).end();
        return;
    }
    response.send(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = db.find((v, i) => v.id == id)
    const notFound = { response: "The person id not found in phone book" }
    if (person === undefined) {
        response.status(404).send(notFound).end();
        return;
    }
    const remaining_persons = db.filter(v => v.id != id);
    fs.writeFileSync('./db.json', JSON.stringify(remaining_persons));
    response.send({ response: `sucess deleting the user with id ${id}` })
})

app.post('/api/persons', (request, response) => {
    const name = request.body.name
    const number = request.body.number

    if (name === undefined || number === undefined) {
        response.status(400).send({ response: 'Your request isnt sending necessary datas' }).end();
        return;
    }

    if (name.length < 5) {
        response.status(400).send({ response: 'The name has to be 5characters long or more' }).end();
        return;
    }

    if (db.find(v => v.name === name)) {
        response.status(400).send({ response: 'A similar name is already recorded' }).end();
        return;
    }

    if (number.length < 10) {
        response.status(400).send({ response: 'The number has to be 10characters long or more' }).end();
        return;
    }

    const db_copy = [...db]
    const id_arr = db_copy.map((v, i) => Number(v.id) || 0)
    const id = crypto.randomBytes(6).toString("hex")
    db_copy.push({
        id, //shortcut for id:id
        name,
        number,
    })
    fs.writeFileSync('./db.json', JSON.stringify(db_copy));
    response.send({ response: `success add the user with id ${id} to the phonebook` })
})

app.patch('/api/persons/:id', (request, response) => {
    const name = request.body.name
    const number = request.body.number
    const id = request.params.id;
    const person = db.find((v, i) => v.id == id)
    const notFound = { response: "The person id not found in phone book" }
    if (person === undefined) {
        response.status(404).send(notFound).end();
        return;
    }

    const updated_list = db.map(v => {
        if (v.id != id) return v;
        if (name !== undefined) {
            if (name.length < 5) {
                response.status(400).send({ response: 'The name has to be 5characters long or more' }).end();
                return v;
            }
            if (db.find(v => v.name === name && v.id != id)) {
                response.status(400).send({ response: 'A similar name is already recorded' }).end();
                return v;
            }
            v.name = name;
        }
        if (number !== undefined) {
            if (number.length < 10) {
                response.status(400).send({ response: 'The number has to be 10characters long or more' }).end();
                return v;
            }
            v.number = number;
        }
        return v
    })

    fs.writeFileSync('./db.json', JSON.stringify(updated_list));
    response.send({ response: `sucess updated the user with id ${id} to the phonebook` });


})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})