import { ENV } from "./utils/env.js";

export const DB_NAME = "chatify";

export const OPTIONS = {
  httpOnly: true, // prevent XSS attacks: cross-site scripting
  secure: ENV.NODE_ENV === "production" ? true : false,
  sameSite: "strict", // CSRF attacks
};
