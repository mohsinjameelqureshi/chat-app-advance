import { OPTIONS } from "../constants.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ENV } from "../utils/env.js";

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
  let { fullname = "", email = "", password = "" } = req.body;
  fullname = fullname.trim();
  email = email.trim().toLowerCase();
  password = password.trim();

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
      .json(new ApiResponse(201, { user: createdUser }, "success"));

    // optimized way to send welcome mail
    sendWelcomeEmail(createdUser?.email, createdUser?.fullname, ENV.CLIENT_URL)
      .then(() => console.log(`Welcome email sent to ${createdUser.email}`))
      .catch((err) =>
        console.error("Failed to send welcome email:", err.message)
      );
  } catch (error) {
    console.error("Error while signup", error.message);
    throw new ApiError(500, "Something went wrong while signup");
  }
});

const login = asyncHandler(async (req, res) => {
  let { email = "", password = "" } = req.body;
  email = email.trim().toLowerCase();
  password = password.trim();

  // validation
  if ([email, password].some((field) => field === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user exists
  const user = await User.findOne({ email });

  if (!user || !(await user.isPasswordCorrect(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!loggedInUser) {
    throw new ApiError(500, "Error while logging in user");
  }

  res
    .status(200)
    .cookie("accessToken", accessToken, OPTIONS)
    .cookie("refreshToken", refreshToken, OPTIONS)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser },
        "User Logged in successfully"
      )
    );
});

export { signup, login };
