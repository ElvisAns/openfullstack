const {Router} = require('express')
const blogRouter =  Router();
const Blog = require('../models/blog');

blogRouter.get('/:id?', async (request, response,next) => {
    if(!request.params.id){
      const blogs = await Blog.find({})
      response.json(blogs).end()
    }
    else{
      const blog = await Blog.findById(request.params.id)
      response.json(blog).end()
    }
  })
  
blogRouter.post('/', async (request, response,next) => {
  if('title' in request.body){
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result).end()
  }
  else{
    response.status(400).json({error:"Bad request, missing the title field"})
  }
})

blogRouter.delete('/:id',async(request,response,next)=>{
  res = await Blog.findByIdAndRemove(request.params.id)
  response.status(201).json(res)
})

blogRouter.patch('/:id',async(request,response,next)=>{
 res = await Blog.findByIdAndUpdate(request.params.id,request.body)
 response.status(200).json(res)
})

module.exports =  blogRouter
  