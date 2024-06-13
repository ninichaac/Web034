const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config(); // เพื่อใช้ environment variables จากไฟล์ .env

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/project";
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // ใช้ environment variable ที่เก็บ Google Client ID
const client = new OAuth2Client(CLIENT_ID);

// Middleware
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  picture: String,
});

const User = mongoose.model('User', userSchema);

// Sample route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/Login.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/pro.html'));
});

// API route for Google Sign-In
app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, name, email, picture } = payload;

    let user = await User.findOne({ googleId: sub });

    if (!user) {
      user = new User({
        googleId: sub,
        name,
        email,
        picture,
      });
      await user.save();
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
