const express = require('express');
const user_profiles = require('../models/user_profiles.js');
const { getAllUsers, createUser, updateUser, deleteUser } = require('../controller/user_profiles.controllers.js');

const router = express.Router();

router.get('/',getAllUsers);  
router.post("/",createUser); 
router.put("/:id",updateUser);
router.delete("/:id",deleteUser);
//basic routes
module.exports = router;