import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav >
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/patients">
        Patients
      </NavLink>
      <NavLink to="/doctors">
        Doctors
      </NavLink>
      <NavLink to="/appointments">
        Appointments
      </NavLink>
    </nav>
  );
}

export default NavBar;
