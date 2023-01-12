const mongoose = require('mongoose')
// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

const phoneBookSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3
	},
	number: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				return /^\d{2,3}-\d{5,}$/.test(v)
			},
		}
	},
})

phoneBookSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString() //we create the id column and remove _id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('phoneBook', phoneBookSchema)