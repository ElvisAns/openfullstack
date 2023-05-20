const bcrypt = require("bcrypt");
const { Router } = require("express");
const usersRouter = Router();
const User = require("../models/user");

const { userExtractor } = require("../middleware/userExtractor");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 4) {
    response
      .status(400)
      .json({ error: "Your password must be more than 3 characters length" });
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs"); //blogs is the field we want to populate

  response.json(users);
});

usersRouter.get("/profile", userExtractor, async function (request, response) {
  if (!request.user.loggedIn) {
    return response.status(403).json({ error: "You must be logged in" });
  }
  const userInfo = await User.findById(request.user.id);
  return response.status(200).json(userInfo);
});

module.exports = usersRouter;
