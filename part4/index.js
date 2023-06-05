const { app, connectDB } = require("./app");
const { MONGODB_URI, PORT } = require("./utils/config");
const logger = require("./utils/logger");

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
});
