const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blog");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const mongoose = require("mongoose");

const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./middleware/errorLogger");
const { tokenExtractor } = require("./middleware/tokenExtractor");

const { MONGODB_URI, PORT } = require("./utils/config");

logger.info("connecting to", MONGODB_URI);

const connectDB = async () => {
  try {
    const con = await mongoose.connect(MONGODB_URI);
    logger.info("Connected to Mongo DB");
  } catch (error) {
    logger.error("Error connecting to Mongo DB");
    process.exit(1);
  }
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = { connectDB, app };
