import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/common/NavBar'
import Footer from './components/common/Footer'
import Welcome from './components/Welcome'
import Blogs from './components/Blogs'
import Account from './components/Account'
import ProtectedRoute from './components/common/ProtectedRoute'

import Signin from './components/user/Signin'
import Login from './components/user/Login'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index path="/" element={<Welcome/>}></Route>
          <Route path="/blogs" element={<Blogs/>}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Account/>}></Route>
          </Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path="*" element={<p>There&lsquo;s nothing here: 404!</p>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
