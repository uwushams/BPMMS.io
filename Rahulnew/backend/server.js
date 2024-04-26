const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Use cors middleware
app.use(cors());

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL password
  database: 'users',
  port: 3306 // Default MySQL port
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Route to handle signup request
app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  // Perform signup action
  const queryString = 'INSERT INTO users (email, password) VALUES (?, ?)';
  connection.query(queryString, [email, password], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log('Signup successful');
    res.status(200).json({ message: 'Signup successful' });
  });
});

// Route to handle login request
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Query the database to find a user with the provided email and password
  const queryString = 'SELECT * FROM users WHERE email = ? AND password = ?';
  connection.query(queryString, [email, password], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      // No user found with the provided credentials
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // User found with the provided credentials
    console.log('Login successful');
    res.status(200).json({ message: 'Login successful' });
  });
});

// Route to handle storing values from table.js
app.post('/table', (req, res) => {
  const { patientName, name, relation, age, regDate, sys, dia, pulses } = req.body;

  // Perform action to store values in the database
  const queryString = 'INSERT INTO patient_table (patientName, name, relation, age, regDate, sys, dia, pulses) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(queryString, [patientName, name, relation, age, regDate, sys, dia, pulses], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log('Values stored successfully');
    res.status(200).json({ message: 'Values stored successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
