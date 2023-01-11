const mongoose = require('mongoose')
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const nameInput = process.argv[3]
const numberInput = process.argv[4]

const url = process.env.MONGODB_URI;
console.log('connecting to ', url)

mongoose.connect(url, {
  useNewUrlParser: true
})


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: nameInput,
  number: numberInput
})

if ((nameInput !== undefined) && (numberInput !== undefined)) {
  person.save().then(() => {
    console.log(`lisätään ${nameInput} numero ${numberInput} luetteloon`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
}