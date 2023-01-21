const mongoose = require("mongoose");
const { Dogs, Posts, User } = require("../models");

/**
 *
 * @param {*} props will be the user object we need to query to check if the user has this post in their array
 */
module.exports = async (option, props) => {
  switch (option) {
    case "post":
      try {
        const userId = props.userId;
        const postId = props.id;
        const objectIntoArr = [userId, postId];
        const dbUserData = await User.findById({ _id: props.userId });
        const newArr = [dbUserData];
        const result = verificationFactory(objectIntoArr, newArr, "posts");
        return result;
      } catch (err) {
        console.log(err);
      }
    case "dog":
      try {
        const userId = props.userId;
        const dogId = props.dogId;
        const objectIntoArr = [userId, dogId]; // array to check against
        const dbUserData = await User.findById({ _id: userId }); // object to check
        const newArr = [dbUserData];
        const result = verificationFactory(objectIntoArr, newArr, "dogs");
        return result;
      } catch (err) {
        console.log(err);
      }
    default:
      return;
  }
};

/**
 *
 * @param {*} checkAgainstThisArray The array we need to check to make sure the user has the these values in their own properties
 * @param {*} objToCheck is the object we need to check
 * @param {*} option will allow us to run a forloop depending on the option they chose
 * @returns a boolean
 */

function verificationFactory(checkAgainstThisArray, objToCheck, option) {
  let outputArray = [checkAgainstThisArray[0]];
  for (let i = 0; i < objToCheck.length; i++) {
    if (option === "dogs") {
      for (let j = 0; j < objToCheck[i].dogs.length; j++) {
        outputArray.push(objToCheck[i].dogs[j].toString());
        const check = checkIfEqual(checkAgainstThisArray, outputArray);
        if (check) {
          return true;
        }
        outputArray.pop();
      }
    } else if (option === "posts") {
      for (let j = 0; j < objToCheck[i].posts.length; j++) {
        outputArray.push(objToCheck[i].posts[j].toString());
        const check = checkIfEqual(checkAgainstThisArray, outputArray);
        if (check) {
          return true;
        }
        outputArray.pop();
      }
    }
  }
  return false;
}

function checkIfEqual(arg1, arg2) {
  if (arg1.every((val) => arg2.includes(val)) && arg1.length === arg2.length) {
    return true;
  } else {
    return false;
  }
}
