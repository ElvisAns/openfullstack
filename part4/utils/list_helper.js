var _ = require("lodash");

const dummy = (blogs) => {
  // ...
  return 1;
};

const totalLikes = (blogs) => {
  return blogs[0].likes;
};

const favoriteBlog = (blogs) => {
  let favoriteBlogOb = blogs[0];
  const len = blogs.length - 1;
  for (let i = 1; i < len; i++) {
    const b1 = blogs[i];
    if (favoriteBlogOb.likes < b1.likes) {
      favoriteBlogOb = { ...b1 };
    }
  }
  return {
    title: favoriteBlogOb.title,
    author: favoriteBlogOb.author,
    likes: favoriteBlogOb.likes,
  };
};

const mostBlogs = (blogs) => {
  const authors = _.groupBy(blogs, "author");
  const blogsNumber = _.orderBy(
    authors,
    [(author_posts) => author_posts.length],
    ["desc"]
  );
  const mostBlog = blogsNumber[0];
  return {
    author: mostBlog[0].author,
    blogs: mostBlog.length,
  };
};

const mostLiked = (blogs) => {
  const authors = _.groupBy(blogs, "author");
  const author_and_likes = _.map(authors, (blogs, author) => {
    const total = _.reduce(blogs, (result, value) => result + value.likes, 0);
    return {
      author,
      likes: total,
    };
  });
  const author_and_likes_ordered = _.orderBy(
    author_and_likes,
    ["likes"],
    ["desc"]
  );
  return author_and_likes_ordered[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLiked,
};
