import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar" style={{ backgroundColor: '#dff1fb' }}>
      <div className="container-fluid">
        <ul className="navbar-nav d-flex flex-row justify-content-center w-100">
          <li className="nav-item">
            <NavLink 
              exact 
              to="/" 
              className="nav-link" 
              activeClassName="active"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/patients" 
              className="nav-link" 
              activeClassName="active"
            >
              Patients
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/doctors" 
              className="nav-link" 
              activeClassName="active"
            >
              Doctors
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/appointments" 
              className="nav-link" 
              activeClassName="active"
            >
              Appointments
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
