
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  // In your User schema
email: { 
    type: String, 
    required: true, 
    unique: true,
    index: true,
    lowercase: true,
    trim: true
},
  contactNumber: { type: String, required: false },
  password: { type: String, required: false },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
  tokens: [{
    token: {
      type: String,
      required: false
    }
  }]
}, { timestamps: false });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password function
UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Generate auth token
UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
  // Store token in user's tokens array
  user.tokens = user.tokens.concat({ token });
  await user.save();
  
  return token;
};


UserSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  return resetToken;
};

UserSchema.methods.clearResetToken = function() {
  this.resetToken = undefined;
  this.resetTokenExpiry = undefined;
};

module.exports = mongoose.model('User', UserSchema);