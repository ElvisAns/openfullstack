import { Outlet, Navigate } from 'react-router-dom'
import { PropType } from 'prop-types'

const ProtectedRoute = ({ user }) => {
    const { loggedIn } = user;
    if (loggedIn) {
        return <Outlet />
    }
    else {
        return <Navigate to="/" replace />
    }
}



export default ProtectedRoute