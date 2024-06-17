const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected...');
    console.log(`Connected to database: ${mongoose.connection.name}`);
  })
  const db = mongoose.connection;
  db.on('error', console.error.bind(console,'error connect to mongodb'));
  db.once('open', function(){
    console.log('connect to mongo db')
  });

  module.exports = db;

