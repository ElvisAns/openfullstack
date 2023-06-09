const mongoose = require("mongoose");
const supertest = require("supertest");
const { app,connectDB } = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const { before } = require("lodash");

let currentPostId;

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "John Doe",
    url: "https://google.com",
    likes: 7,
  },
  {
    title: "Browser can execute only JavaScript",
    author: "Jane Doe",
    url: "https://facebook.com",
    likes: 2,
  },
];

let intialUser = {
  name: "Test0014",
  username: "Test004@test.com",
  password: "12345678",
};

let currentUser = {};


connectDB();
const api = supertest(app);

describe("Blog api test", () => {
  beforeAll(async () => {
    //run before all test cases in contrast to beforeEach which runs after each test case
    await Blog.deleteMany({});
    await User.deleteMany({});
    //await Blog.insertMany(initialBlogs)
  }, 10000);

  test("The blog api can create a user", async () => {
    await api.post("/api/users").send(intialUser).expect(201);
    const users = await api.get("/api/users");
    currentUser = users.body.find(
      (user) =>
        user.name == intialUser.name && user.username == intialUser.username
    );
    expect(JSON.stringify(currentUser)).not.toBe("{}");
  }, 10000);

  test("Existing user can login to the system", async () => {
    const { username, password } = intialUser;
    const userInfo = await api
      .post("/api/login")
      .send({ username, password })
      .expect(200);
    expect(userInfo.body.token).toBeDefined();
    intialUser.token = userInfo.body.token;
  }, 10000);

  test("valid blog post can be added", async () => {
    const newBlog = {
      title: "Learning without practicing is a waste of time!",
      author: "Elvis Ansima",
      url: "https://facebook.com",
      likes: 5,
    };
    let response = await api.get("/api/blogs");
    const initialBlogsLength = response.body.length;
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${intialUser.token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    response = await api.get("/api/blogs");

    const titles = response.body.map((blog) => blog.title);
    expect(response.body).toHaveLength(initialBlogsLength + 1);
    expect(titles).toContain(newBlog.title);
  }, 10000);

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 10000);

  test("blogs unique identifier should be named id and present for all blogs", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => expect(blog.id).toBeDefined());
  }, 10000);

  test("only loggedIn user can create a blog", async () => {
    const newBlog = {
      title: "Learning without practicing is a waste of time!",
      author: "Elvis Ansima",
      url: "https://facebook.com",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  }, 10000);

  test("a new blog post should have default likes to 0 when not specified", async () => {
    const newBlog = {
      title: "Default value are better specified on the DB schema",
      author: "Elvis Ansima",
      url: "https://dev.to",
    };
    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${intialUser.token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    currentPostId = response.body.id;
    expect(response.body.likes).toBe(0);
  }, 10000);

  test("a new blog post should have a title otherwise we got 400 error", async () => {
    const newBlog = {
      author: "Elvis Ansima",
      url: "https://dev.to",
    };
    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${intialUser.token}`)
      .send(newBlog)
      .expect(400);
  }, 10000);

  test("editing a post should be possible and persisted to database", async () => {
    await api
      .patch("/api/blogs/" + currentPostId)
      .set("Authorization", `Bearer ${intialUser.token}`)
      .send({
        title: "I am having a new Title",
        likes: 50,
      })
      .expect(200);

    response = await api.get("/api/blogs/" + currentPostId);
    const { title, likes } = response.body;
    expect(title).toBe("I am having a new Title");
    expect(likes).toBe(50);
  }, 10000);

  test("Only post owner can delete a blog post", async () => {
    let newBwoy = {
      name: "NewBwoy",
      username: "NewBwoy.test",
      password: "12345678",
    };
    await api.post("/api/users").send(newBwoy).expect(201);

    const { username, password } = newBwoy;
    const userInfo = await api
      .post("/api/login")
      .send({ username, password })
      .expect(200);
    expect(userInfo.body.token).toBeDefined();

    await api
      .delete("/api/blogs/" + currentPostId)
      .set("Authorization", `Bearer ${userInfo.body.token}`)
      .expect(401);
  });
  test("deleting a blog post should persist to the database", async () => {
    await api
      .delete("/api/blogs/" + currentPostId)
      .set("Authorization", `Bearer ${intialUser.token}`);
    response = await api.get("/api/blogs");
    const ids = response.body.map((blog) => blog.id);
    expect(ids).not.toContain(currentPostId);
  }, 10000);

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
