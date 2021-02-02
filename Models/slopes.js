const mongoose = require('./connection.js')


const Slope = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    difficulty: {type: String, required: true},
    image: String
})


module.exports = mongoose.model('Slope', Slope);