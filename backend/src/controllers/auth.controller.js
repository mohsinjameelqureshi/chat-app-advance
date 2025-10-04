import { OPTIONS } from "../constants.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({
      validateBeforeSave: false,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

const signup = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  // validation
  if (
    [fullname, email, password].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // checking passowrd length
  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters");
  }

  // checking if email is valid : regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Please provide a valid email address");
  }

  // check if user exist
  const existedUser = await User.findOne({
    email,
  });

  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }
  try {
    // creating user in database
    const user = await User.create({
      fullname,
      email,
      password,
    });

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    // querring the user to check weather the user is created
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while creating user in database"
      );
    }

    res
      .status(201)
      .cookie("accessToken", accessToken, OPTIONS)
      .cookie("refreshToken", refreshToken, OPTIONS)
      .json(
        new ApiResponse(201, { user: createdUser, accessToken }, "success")
      );
  } catch (error) {
    console.error("Error while signup", error.message);
    throw new ApiError(500, "Something went wrong while signup");
  }
});

export { signup };
