const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); // เพื่อใช้ environment variables จากไฟล์ .env


const PORT = 3000;

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/project";

// const userRoutes = require('./routes/user');

// app.use('/api/users', userRoutes);

// Middleware
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Sample route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/Login.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

