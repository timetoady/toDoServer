const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Categories = new Schema({
  category: String,
  todos: [{type: Schema.Types.ObjectId, ref: 'Todos'}]
});

module.exports = mongoose.model("Categories", Categories);
