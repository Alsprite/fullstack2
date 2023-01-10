const mongoose = require('mongoose')

const password = process.argv[2]
// const newName = process.argv[3]
// const newNumber = process.argv[4]

const url = `mongodb+srv://Meikam0ngo:${password}@cluster0.w5oruqa.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', true)

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    required: true,
    unique: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)