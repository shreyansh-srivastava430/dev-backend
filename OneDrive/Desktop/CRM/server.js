// Load required modules
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// ✅ Define the app before using it
const app = express();
const PORT = process.env.PORT || 5000;

// Log environment variables (optional for debugging)
console.log('🔐 DB_USER:', process.env.DB_USER);
console.log('🔐 DB_PASSWORD:', process.env.DB_PASSWORD ? '******' : 'undefined');
console.log('🔐 DB_NAME:', process.env.DB_NAME);

// Connect to MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'crm_db',
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    return;
  }
  console.log('✅ MySQL Connected:', db.threadId);
});

// ✅ Public API Route - after `app` is defined
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('❌ Error fetching users:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('CRM backend is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
