const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Modules/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('../Modules/product');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const sendEmail = require("../utils/sendEmail");
// Add at the top of your main server file
require('dotenv').config();





router.get('/Register', (req, res) => {
    res.sendFile(path.join(__dirname, '../login', 'Login.js'));
});



// Register route
router.post('/Register', async (req, res) => {
    // console.log('Request body:', req.body);
    const { firstName, lastName, email, contactNumber, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = new User({ firstName, lastName, email, contactNumber, password });
        await user.save();

        res.status(201).json({ success: true, message: ' registered successfully' });
    } catch (err) {
        console.error('Register Error:', err);  // More explicit
        res.status(500).json({ success: false, message: err.message || 'Server error' });
    }
});


// Login route
router.post('/Login', async (req, res) => {
  console.log("Incoming request body:", req.body);
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ success: true, token, user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
// Fetch all users
router.get('/user', async (req, res) => {
    try {
      const users = await User.find({}, '-password -resetToken -resetTokenExpiry');
      res.status(200).json({ success: true, users });
    } catch (err) {
      console.error('Fetch Users Error:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  




router.post("/forgot-password", async (req, res) => {
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const cleanEmail = email.replace(/[^a-zA-Z0-9@._-]/g, "").toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email: cleanEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    const html = `
      <p>Hi ${user.firstName || "User"},</p>
      <p>You requested to reset your password. Click the link below:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 15 minutes.</p>
    `;

    await sendEmail(user.email, "Reset Your Password", html);
    res.json({ message: "Reset password link sent to email." });
  } catch (error) {
    console.error("Error in /forgot-password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});







// POST /reset-password/:token



router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // ✅ Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded.id,
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in /reset-password:", error.message);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});





  
  




router.get('/product', async (req, res) => {
    try {
      const products = await Product.find();
      // console.log('Fetched Products:', products); // <=== Add this line
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});


module.exports = router;