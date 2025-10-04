import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import { app } from "./app.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT || 8005;

// app.listen(PORT, () => {
//   console.log("Server is running on port: ", PORT);
// });

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on port: ", PORT);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });
