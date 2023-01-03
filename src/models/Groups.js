const { Schema, model } = require("mongoose");

const GroupsModel = Schema({
  groupId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  nameOfGroup: {
    type: String,
    required: true,
  },
  membersOfGroup: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Groups = model("Groups", GroupsModel);
module.exports = Groups;
