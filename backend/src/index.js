import connectDB from "./db/index.js";
import { server } from "./sockets/socket.js";
import { ENV } from "./utils/env.js";

const PORT = ENV.PORT || 8005;

// app.listen(PORT, () => {
//   console.log("Server is running on port: ", PORT);
// });

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("server is running on port: ", PORT);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });
