const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const dataSchema = new Schema({
  title: String,
  description: String,
  user: ObjectId,
  html: String,
  css: String,
  js: String,
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
