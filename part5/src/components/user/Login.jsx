import { Helmet } from "react-helmet";
import { Navigate, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
export default function Login({ user }) {
    if (user.loggedIn) {
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
                            <p className="py-6">Please <Link to="/signin" className="underline text-primary">signup here</Link> in case you don't yet have an account</p>
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <div className="card-body">
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
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
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

