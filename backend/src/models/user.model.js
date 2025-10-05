import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../utils/env.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// hashing pasword before saving in DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// comparing password for user login
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// short lived token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullname: this.fullname,
    },
    ENV.ACCESS_TOKEN_SECRET,
    {
      expiresIn: ENV.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// longed lived token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    ENV.REFRESH_TOKEN_SECRET,
    { expiresIn: ENV.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);
