const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dogs",
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

// Mongoose middleware that will run before a instance of a user is created
UserSchema.pre("save", function (next) {
  const user = this;

  // IF the passowrd has not been modified we will continue because we only want to hash the password if it has been changed
  if (!user.isModified("password")) {
    return next();
  }

  // This will do the slat rounds for us
  bcrypt.genSalt(10, (err, salt) => {
    // if there is an error we will stop the process by calling the next call backa function
    if (err) {
      return next(err);
    }
    // if we have no error we will start the process of hashing
    bcrypt.hash(user.password, salt, (err, hash) => {
      // if we get an error in the process of doing the salt rounds we will call the next() call back function and pass in the err to stop the process
      if (err) {
        return next(err);
      }
      // If we do not receive an error we will reassign the password property with the hashed version and call the next() call back function to continue the process of saving the user to the DB
      user.password = hash;
      next();
    });
  });
});

/**
 *
 * @param {*} canidatePassword Will be the password we receive when we try to login
 * @returns will return true or false depending if the password entered matched the hashed password stored
 */
UserSchema.methods.comparePassword = function (canidatePassword) {
  const user = this;
  return new Promise((res, rej) => {
    bcrypt.compare(canidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return rej(err);
      }

      if (!isMatch) {
        return rej(false);
      }

      res(true);
    });
  });
};

const User = model("User", UserSchema);

module.exports = User;
