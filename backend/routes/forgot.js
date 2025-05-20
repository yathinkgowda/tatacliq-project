// const jwt = require('jsonwebtoken');
// const User = require('../Modules/User'); // adjust path if needed
// const sendEmail = require('../utils/sendEmail'); // your nodemailer function
// const jwt = require('jsonwebtoken');



// router.post("/forgot-password", async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const cleanEmail = email.replace(/[^a-zA-Z0-9@._-]/g, "").toLowerCase().trim();
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(cleanEmail)) {
//       return res.status(400).json({ message: "Invalid email format" });
//     }

//     const user = await User.findOne({ email: cleanEmail });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // ✅ Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
//     user.resetToken = token;
//     user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
//     await user.save();

//     const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
//     const html = `
//       <p>Hi ${user.firstName || "User"},</p>
//       <p>You requested to reset your password. Click the link below:</p>
//       <a href="${resetLink}">${resetLink}</a>
//       <p>This link will expire in 15 minutes.</p>
//     `;

//     await sendEmail(user.email, "Reset Your Password", html);
//     res.json({ message: "Reset password link sent to email." });
//   } catch (error) {
//     console.error("Error in /forgot-password:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });




// router.post("/reset-password/:token", async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     // ✅ Verify JWT token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findOne({
//       _id: decoded.id,
//       resetToken: token,
//       resetTokenExpiry: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }

//     user.password = password;
//     user.resetToken = undefined;
//     user.resetTokenExpiry = undefined;

//     await user.save();
//     res.json({ message: "Password reset successfully" });
//   } catch (error) {
//     console.error("Error in /reset-password:", error.message);
//     res.status(400).json({ message: "Invalid or expired token" });
//   }
// });

