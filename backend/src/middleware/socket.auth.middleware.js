import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV } from "../utils/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    console.log("socket middleware called");
    // extract token from cookie named "accessToken"
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }

    // verify the token
    const decoded = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    // find the user from DB
    const user = await User.findById(decoded._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    // attach user info to socket
    socket.user = user;
    socket.userId = user._id.toString();

    console.log(
      `Socket authenticated for user: ${user.fullname} (${user._id})`
    );

    next();
  } catch (error) {
    console.log("Error in socket authentication:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
