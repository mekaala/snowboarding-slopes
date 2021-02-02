const mongoose = require('./connection.js')


const Building = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    website: {type: String, required: true},
    image: String
})


module.exports = mongoose.model('Building', Building);