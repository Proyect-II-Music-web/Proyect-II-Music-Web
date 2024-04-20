const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const MONGODB_NAME = 'music-web';

const DB = `${MONGODB_URI}/${MONGODB_NAME}`

mongoose
  .connect(`${DB}`)
    .then(() => console.log(`Connected to DB: ${MONGODB_NAME}`))
    .catch((err) => console.error('Database error:', err))

module.exports = DB