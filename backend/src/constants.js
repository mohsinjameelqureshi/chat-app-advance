export const DB_NAME = "chatify";

export const OPTIONS = {
  httpOnly: true, // prevent XSS attacks: cross-site scripting
  secure: process.env.NODE_ENV === "production" ? true : false,
  sameSite: "strict", // CSRF attacks
};
