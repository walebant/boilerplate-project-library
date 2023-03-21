const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = () => {
  mongoose.connect(process.env.DB);

  const database = mongoose.connection;
  // console.log(database);
  // await client.db("issue-tracker").collection("issues");

  database.on('error', error => {
    console.log(error);
  });

  database.once('connected', () => {
    console.log('Database Connected successfully 🚀');
  });
};

module.exports = connectDatabase;
