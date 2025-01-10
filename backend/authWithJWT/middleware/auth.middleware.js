import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJwt = async (req, res, next) => {
  try {
    let token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    let decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not foudn",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid access token",
    });
  }
};
