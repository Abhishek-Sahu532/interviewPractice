import mongoose, { Schema } from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
  firstName: {
    type: String,
    require: true,
    trim: true,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  accessToken: {
    type: String,
    trim: true,
  },
  refreshToken: {
    type: String,
    trim: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this?.isModified("password")) {
    let hash = await crypto.createHash("sha256");
    hash.update(this.password);
    this.password = hash.digest("hex");
    next();
  }
  next();
});

userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
