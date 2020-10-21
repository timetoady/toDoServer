const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
    todo: String,
    completed: Boolean,
    category: { type: Schema.Types.ObjectId, ref: 'Categories' }
    
})

module.exports = mongoose.model('Todos', TodoSchema )