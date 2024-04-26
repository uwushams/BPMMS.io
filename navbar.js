import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './navbar.css'; // Import CSS file for Navbar

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/login">Login</Link></li> {/* Link to the login page */}
        <li><Link to="/signup">Signup</Link></li> {/* Link to the signup page */}
        <li><Link to="/">Table</Link></li> {/* Link to the table page */}
      </ul>
    </nav>
  );
};

export default Navbar;
