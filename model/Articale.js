const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    title: String,
    body: String,
    likes: Number
})

const Artical = mongoose.model('Artical',schema)

module.exports = Artical