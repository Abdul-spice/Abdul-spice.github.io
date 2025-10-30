const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("./models/user_profiles");

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URL);

  const hashedPassword = await bcrypt.hash("1234", 10);

  const user = new User({
    name: "taf",
    email: "taf@gmail.com",
    password: hashedPassword
  });

  await user.save();
  console.log("✅ User seeded successfully");
  mongoose.disconnect();
}

seed();