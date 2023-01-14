const { Dogs, User } = require("../models");

const dogControllers = {
  // GET all users
  getAllDogs(req, res) {
    Dogs.find({})
      .populate("owner")
      .then((dbDogData) => {
        res.json(dbDogData);
      })
      .catch((err) => {
        res.status();
      });
  },
  addDogToUser({ params, body }, res) {
    const userId = params.userId;
    const newDog = body;
    Dogs.create(newDog)
      .then((dbDogData) => {
        return User.findOneAndUpdate(
          { _id: userId },
          { $push: { dogs: dbDogData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
module.exports = dogControllers;
