// server.js
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');
const { pool, testConnection } = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

// ── Test database connection on startup ──
testConnection();

// ── Auth routes (signup, login) ──
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);  // ✅ actually using it


// ── User CRUD routes (protected by authenticateToken) ──
app.use('/api', require('./routes/userRoutes'));

// ── Example protected route using JWT middleware ──
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.email}. This is a protected route.` });
});

// ── Test DB connection route (for quick check) ──
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({ msg: 'DB Connected', result: rows });
  } catch (err) {
    res.status(500).json({ msg: 'DB Connection Failed', error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Server is up ✅');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
