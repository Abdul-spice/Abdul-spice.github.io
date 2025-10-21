const user_profiles = require('../models/user_profiles.js');

exports.getAllUsers = async (req, res) => {
      try {
        const users = await user_profiles.find();
        res.status(200).json({ success: true, data: users });
      } 
      catch (err) {
        console.error("Error in Get Users:", err.message);
        res.status(500).json({ success: false, message: "Server Error" });
      }
    };

exports.createUser = async (req, res) => {

  const name = req.body.name; //user will send this data
  const email = req.body.email; //user will send this data
  const password = req.body.password; //user will send this data
console.log("POST / hit");

if (!email.includes("@")) {
  return res.status(400).json({ success: false, message: "Invalid email format" });
}
if(!name || !email || !password) {
    return res.status(400).json({ success:false, message:"Please provide all fields"});
  }
console.log("user_profiles type:", typeof user_profiles);
  const existingUser = await user_profiles.findOne({ email });
if (existingUser) {
  return res.status(409).json({ success: false, message: "Email already registered" });
}

const bcrypt = require('bcrypt');
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new user_profiles({ name, email, password: hashedPassword });
  
  try {
    await newUser.save();
    res.status(201).json({ success:true, message:"User created successfully", data:newUser});}
    catch (err) {
      console.error("Error in Create User:", err.message);
      res.status(500).json({ success:false, message:"Server Error"});
    }
};    

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    const updatedUser = await user_profiles.findByIdAndUpdate(userId, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    console.error("Error in Update User:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteUser = async (req, res) => { 
  const userId = req.params.id;

    try {
  await user_profiles.findByIdAndDelete(userId);
  res.status(200).json({ success: true, message: "User deleted successfully" });
} catch (err) {
  console.error("Error in Delete User:", err.message);
  res.status(500).json({ success: false, message: "Server Error" });
}
}