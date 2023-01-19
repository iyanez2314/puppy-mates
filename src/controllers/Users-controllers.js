const { User } = require("../models");

const userControllers = {
  // GET all users
  getAllUsers(req, res) {
    User.find({})
      .populate("dogs")
      .populate("posts")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "There was an error fetching users!" });
      });
  },

  // Updatind the user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
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
    User.findOne({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(400).json({ message: "Sorry this user does not exsist" });
      });
  },
};

module.exports = userControllers;
