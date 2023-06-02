import Helmet from 'react-helmet'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        (async function getData() {
            const blogs = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`)
            setBlogs(blogs.data)
        })()
    }, [])
    return (
        <>
            <Helmet>
                <title>Blogs</title>
            </Helmet>
            <div className='bg-primary h-12 text-center'>
            </div>
            <div className='py-5'>
                <h1 className='text-4xl text-center text-primary font-bold tracking-wider'>Blogs posts</h1>
            </div>

            <div className='w-100 min-h-24 px-24 py-10 flex flex-wrap gap-10 justify-center'>
                {blogs.map(
                    (post, index) => (
                        <div className="card card-compact w-96 bg-base-100 shadow-xl" key={index}>
                            <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj_0mLWu2GcjGJroj4TsRsbDiVrb18s_4EgQ&usqp=CAU" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{post.title}</h2>
                                <p className="badge badge-secondary">Written by {post.author}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Read more</button>
                                </div>
                            </div>
                        </div>
                    )
                )

                }
            </div>
        </>
    )
}

export default Blogs