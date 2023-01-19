const mongoose = require("mongoose");
const { Posts, User } = require("../models");

/**
 *
 * @param {*} user will be the user object we need to query to check if the user has this post in their array
 */
module.exports = (props) => {
  console.log(props);
  User.findOne({ _id: props.userId })
    .then((dbUserData) => {
      console.log(dbUserData);
      //   console.log(dbUserData.posts[0].toString());
    })
    .catch((err) => {
      console.log(err);
    });
};
