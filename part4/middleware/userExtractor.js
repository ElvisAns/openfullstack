const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET); //the payload
  request.user = {}
  if (decodedToken) {
    request.user.id = decodedToken.id;
    request.user.username = decodedToken.username;
    request.user.loggedIn = true;
  } else if (request.token) {
    request.user.error = "token invalid";
    request.user.loggedIn = false;
  } else {
    request.user.error = "No token provided in the request";
    request.user.loggedIn = false;
  }
  next();
};

module.exports = { userExtractor };
