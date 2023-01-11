const { Users } = require("../models");

const userControllers = {
  // Get All users
  getAllUsers(req, res) {
    Users.find({})
      .populate({
        path: "posts",
      })
      .populate({
        path: "dogs",
      })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Updatind the user
  updateUser({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(400).json({ message: "No user found with that id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Getting a user by Id
  getUserById({ params }, res) {
    Users.findOne({ _id: params.id }).then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
      }
    });
  },
};

module.exports = userControllers;
