import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <NavLink to="/Home" className="navbar-link" activeclassname="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="navbar-link" activeclassname="active">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="navbar-link" activeclassname="active">
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
