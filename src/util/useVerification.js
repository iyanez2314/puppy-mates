const mongoose = require("mongoose");
const { Posts, User } = require("../models");

/**
 *
 * @param {*} props will be the user object we need to query to check if the user has this post in their array
 */
module.exports = async (props) => {
  try {
    const userId = props.userId;
    const postId = props.id;
    const objectIntoArr = [userId, postId];
    const dbUserData = await User.findOne({ _id: props.userId });
    const userDataPost = dbUserData.posts[0].toString();
    const userDataId = dbUserData._id.toString();
    const newArr = [userDataId, userDataPost];
    return objectIntoArr.every((el) => newArr.includes(el));
  } catch (err) {
    console.log(err);
  }
};
