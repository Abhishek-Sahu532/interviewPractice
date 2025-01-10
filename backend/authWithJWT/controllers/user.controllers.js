import { User } from "../models/user.models.js";
import crypto from "crypto";

export const registerNewUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    // console.log(firstName, lastName, email, password, confirmPassword);

    if (
      [firstName, lastName, email, password, confirmPassword].some(
        (field) => field.trim() == ""
      )
    ) {
      return res.status(400).json({
        // success: false,
        message: "Please provide the required details",
      });
    }

    let existingUser = User.find({ email: email });

    // console.log(existingUser);
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: `This ${email} id is already used by another user`,
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and comfirm Password are not matching",
      });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // console.log(emailPattern.test(email));
    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide the valid email",
      });
    }

    if (password.length < 4 || password.length > 10) {
      return res.status(400).json({
        success: false,
        message: "Please provide the valid password",
      });
    }

    let newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    let user = await User.findById(newUser?._id)?.select(
      "-password -accessToken -refreshToken"
    );
    // console.log(user);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // console.log(emailPattern.test(email));
    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide the valid email",
      });
    }

    let user = await User.findOne({ email });
    console.log("user........", user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "The user is not registered with us",
      });
    }

    let hash = crypto.createHash("sha256");
    hash.update(password);
    let hashedPassword = hash.digest("hex");
    // console.log("hashedPassword", hashedPassword);

    if (hashedPassword !== user?.password) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    let accessToken = await user.generateAccessToken();

    let refreshToken = await user.generateRefreshToken();
    await user.save({ validateBeforeSave: false });

    const loggedUser = await User.findById(user?._id).select(
      "-password -refreshToken -accessToken"
    );
    const options = {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        loggedUser,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user?._id,
      {
        $unset: { refreshToken: 1 },
      },
      {
        new: true,
      }
    );
    const options = {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    return res
      .status(200)
      .clearCookie("accessToken", { ...options, value: null })
      .clearCookie("refreshToken", { ...options, value: null })
      .json({
        success: true,
        message: "User logged out successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    let user = req.user;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};
