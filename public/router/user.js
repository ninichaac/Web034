const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).send('User created');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
