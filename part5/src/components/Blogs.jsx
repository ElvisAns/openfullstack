import Helmet from 'react-helmet'
import { useEffect } from 'react'
import axios from 'axios'
import { useState, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import validator from 'validator'
import { logout } from "../store/slices/userSlice";
import { useNavigate } from 'react-router'

const newBlogReducer = (state, action) => {
    if (action.type == "update") {
        return action.payload;
    }
    if (action.type == "clear") {
        return { title: '', likes: 0, url: '' };
    }
}
const blogFormDispatcher = (state, action) => {
    let newState = { ...state }
    let ready = true
    if (!validator.isURL(action.url)) {
        newState.url = 'Please enter a correct url'
        ready = false
    }
    else {
        newState.url = ''
    }
    if (!validator.isLength(action.title, { min: 4 })) {
        newState.title = 'This title is very short'
        ready = false
    }
    else {
        newState.title = ''
    }
    newState.ready = ready
    return newState
}

const Blogs = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [blogs, setBlogs] = useState([])
    const [newBlogs, newBlogDispatcher] = useReducer(newBlogReducer, { title: '', likes: 0, url: '' })
    const [blogFormErros, blogFormErrorDispatcher] = useReducer(blogFormDispatcher, { title: '', likes: '', url: '', ready: false })
    const userInfo = useSelector((state) => state.user.userInfo)

    useEffect(() => {
        (async function getData() {
            const blogs = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`)
            setBlogs(blogs.data)
        })()
    }, [])

    useEffect(() => {
        if (blogFormErros.ready) {

            (async function func() {
                try {
                    setLoading(true)
                    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`, {
                        title: newBlogs.title,
                        url: newBlogs.url,
                        likes: newBlogs.likes,
                        author: userInfo.name
                    })
                    const blogs = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`)
                    setBlogs(blogs.data)
                    newBlogDispatcher({ type: 'clear' })
                    setLoading(false)
                    setMessage("Blog create with success!")

                    const elt = document.getElementById("alert");
                    elt.scrollIntoView({ behavior: 'smooth' }, true);

                    setTimeout(() => {
                        setMessage('')
                    }, 2000)
                }
                catch (e) {
                    if (e.response.status == 401) {
                        setMessage("Session lost, please reconnect!")

                        const elt = document.getElementById("alert");
                        elt.scrollIntoView({ behavior: 'smooth' }, true);
                        setTimeout(() => {
                            dispatch(logout())
                            navigate('/login')
                        }, 2000)
                    }
                }
            })()

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blogFormErros])

    const deleteBlog = async (blogId) => {

        try {
            setLoading(true)
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/${blogId}`)
            const blogs = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`)
            setBlogs(blogs.data)
            newBlogDispatcher({ type: 'clear' })
            setLoading(false)
            setMessage("Blog deleted with success!")
            const elt = document.getElementById("alert");
            elt.scrollIntoView({ behavior: 'smooth' }, true);
            setTimeout(() => {
                setMessage('')
            }, 2000)
        }
        catch (e) {
            if (e.response.status == 401) {
                setMessage("Session lost, please reconnect!")

                const elt = document.getElementById("alert");
                elt.scrollIntoView({ behavior: 'smooth' }, true);
                setTimeout(() => {
                    dispatch(logout())
                    navigate('/login')
                }, 2000)
            }
        }
    }
    return (
        <>
            <Helmet>
                <title>Blogs</title>
            </Helmet>
            <div className='bg-primary h-12 text-center'>
            </div>
            {message && <div className="alert" id='__alert'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>{message}</span>
            </div>}
            <div className='py-5'>
                <h1 className='text-4xl text-center text-primary font-bold tracking-wider'>Blogs posts</h1>
            </div>

            {userInfo.loggedIn && (
                <div className='w-100 text-center flex flex-col justify-center'>
                    <h1 className='text-2xl text-center font-bold tracking-wider'>Create a new one</h1>
                    <h1>Create a new one</h1>
                    <div className="py-5 w-100 text-center">
                        <input value={newBlogs.title} onChange={(e) => newBlogDispatcher({ type: 'update', payload: { ...newBlogs, title: e.target.value } })} className='block my-0 w-80 mx-auto px-4 py-3 rounded-full border border-slate-400' placeholder='title' />
                        <label className="label text-red-700 text-xs block">{blogFormErros.title}</label>
                        <input value={newBlogs.url} onChange={(e) => newBlogDispatcher({ type: 'update', payload: { ...newBlogs, url: e.target.value } })} className='block my-0 w-80 mx-auto px-4 py-3 rounded-full border border-slate-400' placeholder='url' />
                        <label className="label text-red-700 text-xs block">{blogFormErros.url}</label>
                        <input value={newBlogs.likes} onChange={(e) => newBlogDispatcher({ type: 'update', payload: { ...newBlogs, likes: e.target.value } })} type='number' className='block my-0 w-80 mx-auto px-4 py-3 rounded-full border border-slate-400' placeholder='likes' />
                        <label className="label text-red-700 text-xs block">{blogFormErros.likes}</label>
                        <button disabled={loading} className='btn btn-primary rounded-full px-16' onClick={() => blogFormErrorDispatcher(newBlogs)}>Publish
                            {loading && <div role="status pl-2">
                                <svg aria-hidden="true" className="inline w-4 h-4 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>}
                        </button>
                    </div>
                </div>)}

            <div className='w-100 min-h-24 px-24 py-10 flex flex-wrap gap-10 justify-center'>
                {blogs.map(
                    (post, index) => (
                        <div className="card card-compact w-96 bg-base-100 shadow-xl" key={index}>
                            <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj_0mLWu2GcjGJroj4TsRsbDiVrb18s_4EgQ&usqp=CAU" alt="Shoes" /></figure>
                            <div className="card-body">
                                <div className='flex flex-col md:flex-row w-100 justify-between card-title'>
                                    <h2 >{post.title}</h2>
                                    <h2>Likes: {post.likes}</h2>
                                    {userInfo.name == post.author && <span className='text-red-600 cursor-pointer' onClick={() => deleteBlog(post.id)}>Delete</span>}
                                </div>
                                <p className="badge badge-secondary">Written by {post.author}</p>
                                <div className="card-actions justify-end">
                                    <a className="btn btn-primary" href={post.url} target="_blank" rel="noreferrer">Read more</a>
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