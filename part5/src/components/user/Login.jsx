import { Helmet } from "react-helmet";
import { Navigate, Link } from 'react-router-dom'
import { useState } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import validator from "validator";
import { login } from "../../store/slices/userSlice";
import { useSelector, useDispatch } from 'react-redux'

export default function Login() {
    const userInfo = useSelector((state) => state.user.userInfo)
    const dispatch = useDispatch()
    //const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [modalText, setModalText] = useState({})
    const [password, setPwd] = useState("")
    const [error_message, setErrorMessage] = useState({ password: "", email: "" })
    const [loading, setLoading] = useState(false)

    async function updateError(e) {
        e.preventDefault();
        if (loading) return; //debouncing submission
        let error_message_upd = { ...error_message };
        let readyToSubmit = true;

        if (!validator.isEmail(email)) {
            error_message_upd = { ...error_message_upd, email: "The email address is not valid" }
            readyToSubmit = false;
        }
        else {
            error_message_upd = { ...error_message_upd, email: "" }
        }


        if (password.length < 8) {
            error_message_upd = { ...error_message_upd, password: "Password very short" }
            readyToSubmit = false;
        }
        else {
            error_message_upd = { ...error_message_upd, password: "" }
        }
        setErrorMessage(error_message_upd)
        if (readyToSubmit) {
            try {
                setLoading(true)
                const userData = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                    username: email,
                    password: password
                })
                dispatch(login({...userData.data,loggedIn:true}))
                setModalText({ info: "Successfully loggedin" })
            }
            catch (e) {
                setModalText({ error: e.response.data.error })
            }
            finally {
                setTimeout(() => setLoading(false), 1000)
            }
        }
    }

    if (userInfo.loggedIn) {
        return <Navigate to="/profile" replace />
    }
    else {
        return (
            <>
                <Helmet>
                    <title>User | login</title>
                </Helmet>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row">
                        <div className="text-center lg:text-left mr-10">
                            <h1 className="text-5xl font-bold">Login now!</h1>
                            <p className="py-6">Please <Link to="/signin" className="underline text-primary">signup here</Link> in case you don&apos;t yet have an account</p>
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" name='email' className="input input-bordered" />
                                    <label className="label text-red-700 text-xs">
                                        {error_message.email}
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input data-testid="passwordInput" type="password" value={password} onChange={(e) => setPwd(e.target.value)} placeholder="password" className="input input-bordered" />
                                    <label className="label text-red-700 text-xs">
                                        {error_message.password}
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button disabled={loading} className="btn btn-primary" onClick={(e) => updateError(e)}>Login
                                        {loading && <div role="status pl-2">
                                            <svg aria-hidden="true" className="inline w-4 h-4 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>}
                                    </button>
                                </div>
                                {modalText.error && <div className="alert alert-error text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setModalText({})} className="cursor-pointer stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className="grow">{modalText.error}</span>
                                </div>}

                                {modalText.info && <div className="alert alert-success">
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setModalText({})} className="cursor-pointer stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className="grow">{modalText.info}</span>
                                </div>}
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}