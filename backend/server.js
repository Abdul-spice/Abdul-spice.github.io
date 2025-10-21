const dotenv = require('dotenv');
dotenv.config();
console.log("Mongo URL:", process.env.mongo_url);

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const user_profiles = require('./models/user_profiles.js');

connectDB();

app.use(express.json());

const user_profilesRoutes = require('./routes/user_profiles');
app.use("/api/user_profiles", user_profilesRoutes);

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT);
});


//console.log(process.env.mongo_url);


const bcrypt = require('bcrypt');