import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ENV } from "../utils/env.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req?.cookies?.accessToken ||
    req?.body?.accessToken ||
    req?.headers?.authorization?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Access token is required");
  }

  try {
    const decodeToken = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodeToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Unauthorized! user not found in database");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid access token");
  }
});
