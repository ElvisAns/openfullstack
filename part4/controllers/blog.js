const jwt = require("jsonwebtoken");
const { Router } = require("express");
const blogRouter = Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const { userExtractor } = require("../middleware/userExtractor");

blogRouter.get("/:id?", async (request, response, next) => {
  if (!request.params.id) {
    const blogs = await Blog.find({}).populate("user", { username: 1, id: 1 }); //user is the field we want to auto populate
    response.json(blogs).end();
  } else {
    const blog = await Blog.findById(request.params.id);
    response.json(blog).end();
  }
});

blogRouter.post("/", userExtractor, async (request, response, next) => {
  if (!request.user.loggedIn) {
    return response.status(401).json({ error: request.user.error });
  }
  const user = await User.findById(request.user.id);

  if ("title" in request.body) {
    const body = request.body;
    const blog = new Blog({
      title: body.title,
      author: body.author,
      likes : body.likes,
      user: user.id,
      url: body.url,
    });
    const result = await blog.save();
    user.blogs = user.blogs.concat(blog._id);
    await user.save();
    response.status(201).json(result).end();
  } else {
    response
      .status(400)
      .json({ error: "Bad request, missing the title field" });
  }
});

blogRouter.delete("/:id", userExtractor, async (request, response, next) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    id: 1,
  });
  if (!request.user.loggedIn) {
    return response.status(401).json({ error: request.user.error });
  }
  if (!blog) {
    return response
      .status(404)
      .json({ error: `Blog ${request.params.id} not found` });
  }

  const user = await User.findById(request.user.id);
  if (blog.user._id.toString() === user._id.toString()) {
    const res = await Blog.findByIdAndRemove(request.params.id);
    response.status(201).json({ message: "delete with success" });
  } else {
    return response
      .status(401)
      .json({ error: "You dont have permission to delete this blog" });
  }
});

blogRouter.patch("/:id",userExtractor, async (request, response, next) => {
  const res = await Blog.findByIdAndUpdate(request.params.id, request.body);
  response.status(200).json(res);
});

module.exports = blogRouter;
