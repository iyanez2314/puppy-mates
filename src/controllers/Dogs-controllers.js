const { Dogs, Users } = require("../models");

const dogControllers = {
  // GET all users
  getAllDogs(req, res) {
    Dogs.find({})
      .populate({
        path: "users",
      })
      .then((dbDogData) => {
        res.json(dbDogData);
      })
      .catch((err) => {
        res.status();
      });
  },
  addDogToUser({ params, body }) {
    const userId = params.userId;
    const newDog = body;
    Dogs.create(newDog)
      .then((dbDogData) => {
        return Users.findOneAndUpdate(
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
