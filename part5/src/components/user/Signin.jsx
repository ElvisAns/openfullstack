import { Helmet } from "react-helmet";
import { Navigate,Link } from 'react-router-dom'
import PropTypes from 'prop-types'
export default function Signin({ user }){
    if (user.loggedIn) {
        return <Navigate to="/profile" replace />
    }
    else {
        return (
            <>
                <Helmet>
                    <title>User | signin</title>
                </Helmet>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row">
                        <div className="text-center lg:text-left mr-10">
                            <h1 className="text-5xl font-bold">Create your account now!</h1>
                            <p className="py-6">Please <Link to="/login" className="underline text-primary">login here</Link> in case you already have an account</p>
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Your name" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="text" placeholder="password" className="input input-bordered" />
                                    <label className="label text-red-700 text-xs">
                                        use has error
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Repeat password</span>
                                    </label>
                                    <input type="text" placeholder="password" className="input input-bordered" />
                                    <label className="label text-red-700 text-xs">
                                        use has error
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

