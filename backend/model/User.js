const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true,
    validate:{
      validator: function(value) {
        return /^[a-zA-Z0-9]+$/.test(value);
      },
      message: "Username must only contain alphanumeric characters."
    }
   },
  email: { type: String, required: true, unique: true,
    validate:{
      validator: function(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email format."
    }
   },
  password: { type: String, required: true, minlength: 8 },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

module.exports = mongoose.model("User", userSchema);
