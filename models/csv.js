const text = require("body-parser/lib/types/text");
const { links } = require("express/lib/response");
var mongoose = require("mongoose");

var csvSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  Title: {
    type: String,
  },
  Email: {
    type: String,
  },
  Linkedin: {
    type: String,
  },
  Company: {
    type: String,
  },
  Industry: {
    type: String,
  },
  Website: {
    type: String,
  },
  Headquarters: {
    type: String,
  },
  Revenue: {
    type: Number,
  },
  Company_Size: {
    type: String,
  },
});

module.exports = mongoose.model("studentsrecords", csvSchema);
