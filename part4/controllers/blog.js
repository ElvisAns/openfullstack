const {Router} = require('express')
const blogRouter =  Router();
const Blog = require('../models/blog');
const { result } = require('lodash');

blogRouter.get('/', async (request, response,next) => {
    const blogs = await Blog.find({})
    response.json(blogs).end()
  })
  
blogRouter.post('/', async (request, response,next) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result).end()
})

module.exports =  blogRouter
  