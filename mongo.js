const mongoose = require('mongoose')
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url =
`mongodb+srv://Meikam0ngo:${password}@cluster0.w5oruqa.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', true);
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
name: String,
number: String
})

const Person = mongoose.model('Person', noteSchema)

const person = new Person({
  name: newName,
  number: newNumber
})

if ((newName != undefined) && (newNumber != undefined)) {
    person.save().then(result => {
        console.log(`Lisätään ${newName} ${newNumber} puhelinluetteloon`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name + " " + person.number)
        })
        mongoose.connection.close()
      })
}