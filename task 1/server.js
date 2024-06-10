const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'your_database_name'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// JWT Secret
const jwtSecret = 'your_jwt_secret';

// Register endpoint
app.post('/auth/register', async (req, res) => {
  const { name, phoneNumber, password, email, city, country } = req.body;
  try {
    // Check if user already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    await db.query('INSERT INTO users (name, phone_number, password, email, city, country) VALUES (?, ?, ?, ?, ?, ?)', [name, phoneNumber, hashedPassword, email, city, country]);

    // Generate OTP and send to email (Not implemented here)

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login endpoint
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    

// Add Contact endpoint
app.post('/contacts/add', async (req, res) => {
  const { name, phoneNumber } = req.body;
  try {
    // Save contact to database
    await db.query('INSERT INTO contacts (name, phone_number) VALUES (?, ?)', [name, phoneNumber]);

    res.status(201).json({ message: 'Contact added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
