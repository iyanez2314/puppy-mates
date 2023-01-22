const { Dogs, User } = require("../models");
const useVerification = require("../util/useVerification");

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
  /* --- GET all the dogs associated with Owner --- */
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

  /* -------------------------------- PUT Dog info -------------------------------- */
  async updateDogInfo({ params, body }, res) {
    const updatedDogInfo = body;
    const userId = params.userId;
    const dogId = params.dogId;
    try {
      const isAbleToMakeEdit = await useVerification("dog", params);
      if (isAbleToMakeEdit) {
        let options = {
          _id: dogId,
        };
        let dog = await Dogs.findOne(options);
        if (!dog) {
          return res
            .status(404)
            .send({ error: "Dog not found or you are not the owner" });
        }
        const updatedDog = await Dogs.findByIdAndUpdate(dogId, updatedDogInfo, {
          new: true,
        });
        res.send(updatedDog);
      }
    } catch (error) {
      res.status(422).send({ error: error.message });
    }
  },

  /* --------------------------- POST dog associated with user -------------------------- */
  addDogToUser({ params, body }, res) {
    const newDog = body;
    const userId = params.userId;

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
