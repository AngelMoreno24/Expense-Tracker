import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {

  const logout = () => {

    localStorage.removeItem("accessToken");


  }


  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <NavLink to="/Home" className="navbar-link" activeclassname="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="navbar-link" activeclassname="active" onClick={logout}>
            logout
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
