// controllers/userController.js
const { pool } = require('../config/db');

// ── CREATE ──
exports.createUser = async (req, res) => {
  const {
    username,
    full_name,
    email,
    phone,
    role,
    avatar_url,
    password_hash,
    is_active,
    created_by
  } = req.body;

  try {
    const [result] = await pool.query(
      `
      INSERT INTO users
        (username, full_name, email, phone, role, avatar_url, password_hash, is_active, created_by)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        username,
        full_name,
        email,
        phone,
        role,
        avatar_url,
        password_hash,
        is_active,
        created_by
      ]
    );

    // Send back the newly created user_id
    return res.status(201).json({ user_id: result.insertId });
  } catch (err) {
    console.error('createUser error:', err);
    return res.status(500).json({ error: err.message });
  }
};

// ── READ ALL ──
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM users`);
    return res.json(rows);
  } catch (err) {
    console.error('getAllUsers error:', err);
    return res.status(500).json({ error: err.message });
  }
};

// ── READ ONE BY ID ──
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE user_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(rows[0]);
  } catch (err) {
    console.error('getUserById error:', err);
    return res.status(500).json({ error: err.message });
  }
};

// ── UPDATE ──
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    username,
    full_name,
    email,
    phone,
    role,
    avatar_url,
    password_hash,
    is_active,
    updated_by
  } = req.body;

  try {
    const [result] = await pool.query(
      `
      UPDATE users SET
        username       = ?,
        full_name      = ?,
        email          = ?,
        phone          = ?,
        role           = ?,
        avatar_url     = ?,
        password_hash  = ?,
        is_active      = ?,
        updated_by     = ?
      WHERE user_id = ?
      `,
      [
        username,
        full_name,
        email,
        phone,
        role,
        avatar_url,
        password_hash,
        is_active,
        updated_by,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('updateUser error:', err);
    return res.status(500).json({ error: err.message });
  }
};

// ── DELETE ──
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      `DELETE FROM users WHERE user_id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('deleteUser error:', err);
    return res.status(500).json({ error: err.message });
  }
};
