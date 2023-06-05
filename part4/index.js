const { app, connectDB } = require("./app");
const { MONGODB_URI, PORT } = require("./utils/config");
const logger = require("./utils/logger");
var cors = require('cors')
app.use(cors())
connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
});
