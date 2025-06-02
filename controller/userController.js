const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = await User.createUser(name, email);
    res.status(201).json({ message: 'User created', userId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
};
