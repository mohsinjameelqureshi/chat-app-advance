import express from "express";
// import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const morganFormat = ":method :url :status :response-time ms";

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

//common middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// logger middleware
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// import routes
import healthRoute from "./routes/healthcheck.route.js";
import authRoutes from "./routes/auth.route.js";

// routes
// healthCheck
app.use("/api/healthcheck", healthRoute);
app.use("/api/auth", authRoutes);
// app.use("/api/v1/healthcheck", healthCheckRouter);

// global error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      data: err.data,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export { app };
