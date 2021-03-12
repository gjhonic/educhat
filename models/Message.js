const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MongoClient = require("mongodb").MongoClient;
const dburl = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(dburl, { useUnifiedTopology: true });

class Message {
  message = '';
  user_from = '';
  user_to = '';
  datetime = '';

}
module.exports = Message;