const mongoose = require("mongoose");

const GroupsModel = mongoose.Schema({
  nameOfGroup: {
    type: String,
    required: true,
  },
  membersOfGroup: {
    // TODO: Need to refer to the users ID property
  },
});
