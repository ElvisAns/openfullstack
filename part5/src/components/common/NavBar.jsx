import { NavLink, Link } from "react-router-dom";

export default function NavBar() {
  return (<div className="navbar bg-base-100">
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li><NavLink to="/blogs" className="bg-transparent text-black hover:bg-blue-100" activeClassName='bg-blue-200'>Blogs</NavLink></li>
          <li tabIndex={0}>
            <a className="justify-between">
              User
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
            </a>
            <ul className="p-2 bg-white">
              <li><NavLink to='/login' className="bg-transparent text-black hover:bg-blue-100" activeClassName='bg-blue-200'>Login</NavLink></li>
              <li><NavLink to='/profile' className="bg-transparent text-black hover:bg-blue-100" activeClassName='bg-blue-200'>Profile</NavLink></li>
            </ul>
          </li>
          <li><NavLink to='/signin' className="bg-transparent text-black hover:bg-blue-100" activeClassName='bg-blue-200'>Signup</NavLink></li>
        </ul>
      </div>
      <NavLink to='/' className="bg-transparent text-black btn btn-ghost normal-case text-xl" activeClassName='bg-blue-200'>Our Blogs</NavLink>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li><NavLink to="/blogs" className="bg-transparent text-black hover:bg-blue-100" activeClassName='bg-blue-200'>Blogs</NavLink></li>
        <li tabIndex={0}>
          <a>
            User
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
          </a>
          <ul className="p-2 bg-white">
            <li><NavLink to='/login' className="bg-transparent text-black hover:bg-blue-100" activeClassName='bg-blue-200'>Login</NavLink></li>
            <li><NavLink to='/profile' className="bg-transparent text-black hover:bg-blue-100" activeClassName='bg-blue-200'>Profile</NavLink></li>
          </ul>
        </li>
        <li><NavLink to="/signin" className="bg-transparent text-black hover:bg-blue-100" activeClassName='bg-blue-200'>Signup</NavLink></li>
      </ul>
    </div>
    <div className="navbar-end">
      <a className="btn btn-sm btn-primary normal-case">Get started</a>
    </div>
  </div>
  );
}
