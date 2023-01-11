// const express = require("express");
// const mongoose = require("mongoose");
// const User = mongoose.model("User");
// const Group = mongoose.model("Groups");

// const router = express.Router();

// // Creating a group
// router.post("/group", async (req, res) => {
//   try {
//     const { nameOfGroup } = req.body;

//     const newGroup = Group.create({
//       nameOfGroup: nameOfGroup,
//     });

//     res.send(newGroup);
//   } catch (error) {
//     return res.sendStatus(400).send(error);
//   }
// });

// // Get all groups
// router.get("/groups", async (req, res) => {
//   try {
//     const allGroups = await Group.find();
//     res.send(allGroups);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });
// module.exports = router;
