const { Schema, model } = require("mongoose");

const DogsModel = Schema({
  breed: {
    type: String,
    required: true,
  },
  nameOfDog: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Owner",
  },
});

const Dogs = model("Dogs", DogsModel);
module.exports = Dogs;
