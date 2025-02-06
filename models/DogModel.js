var mongoose = require("mongoose")

var DogSchema = new mongoose.Schema(
  {
    name: String,
    breed: String,
    birth_day: String,
    competition: Array,
    userID: String,
  },
  {
    collection: "dogs",
  }
)

module.exports = mongoose.model("DogModel", DogSchema)
