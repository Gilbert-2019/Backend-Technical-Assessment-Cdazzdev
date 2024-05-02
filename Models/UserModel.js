const mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
// const crypto = require("crypto-js");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  {
    timestamps: true,
  }
);

// Login
userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Register
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Forgot password
userSchema.methods.getResetToken = function(){
  // Generating token
 const resetToken = crypto.randomBytes(64).toString('hex');
  
//    hashing and adding resetPasswordToken to userSchema
this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

this.resetPasswordTime = Date.now() + 15 * 60 * 1000;

return resetToken;
}

module.exports = mongoose.model("User", userSchema);


// const User = mongoose.model("User", userSchema);

// export default User;
