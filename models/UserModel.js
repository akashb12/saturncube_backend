const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    doj: {
      type: Date,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  const user = this;
  console.log(user);
  const saltRounds = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, saltRounds);
  if (hash) {
    user.password = hash;
    next();
  } else {
    next();
  }
});
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
const User = mongoose.model("SaturncubeUser", userSchema);
module.exports = { User };
