
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import Table from './table';
import LoginPage from './LoginPage'; // Import your Login page component
import SignupPage from './SignupPage'; // Import your Signup page component
import Navbar from './navbar'; // Import Navbar component

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Include Navbar component */}
        <Routes> {/* Wrap Route components within Routes */}
          <Route path="/login" element={<LoginPage />} /> {/* Route to the login page */}
          <Route path="/signup" element={<SignupPage />} /> {/* Route to the signup page */}
          <Route path="/" element={<Table />} /> {/* Default route to the table */}
          <Route path="/table" element={<table />} /> {/* Route to the table page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
