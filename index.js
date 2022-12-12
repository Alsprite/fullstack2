const { response } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require("./models/person")

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())

app.use(requestLogger)

app.use(cors())

app.use(express.static('build'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get("/info", (request, response) => {
  Person.find({}).then(persons => {
    persons.map(person => person.toJSON());
    response.send(
      `<p>Puhelinluettelossa ${persons.length} henkilön tiedot</p>`
    );
  });
});

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({
      error: "name missing"
    });
  }

  if (body.number === undefined) {
    return response.status(400).json({
      error: "number missing"
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 100000)
  });

  person
    .save()
    .then(savedNote => savedNote.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson);
    })
    .catch(error => {
      return response.status(400).json({
        error: "name must be unique"
      });
    });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()));
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})