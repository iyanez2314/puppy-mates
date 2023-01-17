const { Dogs, User } = require("../models");

const dogControllers = {
  /* ------------------------------ GET all users ----------------------------- */
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
  /* --- GET all the dogs associated with Owner => GET /api/dogs/:ownerId --- */
  getAllDogsAssociatedWithOwner({ params }, res) {
    const userId = params.userId;
    User.findOne({ _id: userId })
      .populate("dogs")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(400).json({ message: "Sorry this user does not exsist!" });
      });
  },

  /* -------------------------------- fix this -------------------------------- */
  updateDogInfo({ params, body }, res) {
    const userId = params.userId;
    const dogId = params.dogId;
    const updatedDogInfo = body;
    Dogs.findOneAndUpdate({ _id: dogId }, updatedDogInfo, { new: true })
      .then((dbDogData) => {
        if (!dbDogData) {
          res.status(404).json({ message: "No dog found with this id" });
          return;
        }
        res.json(dbDogData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
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
