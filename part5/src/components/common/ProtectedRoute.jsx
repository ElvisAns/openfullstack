import { Outlet, Navigate } from 'react-router-dom'
import { useSelector} from 'react-redux'

const ProtectedRoute = () => {
    const userInfo = useSelector((state) => state.user.userInfo)
    if (userInfo.loggedIn) {
        return <Outlet />
    }
    else {
        return <Navigate to="/" replace />
    }
}



export default ProtectedRoute