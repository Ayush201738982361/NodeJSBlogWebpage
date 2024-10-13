const mongoose = require("mongoose");
const { createUserToken } = require("../services/auth");
const { createHmac, randomBytes } = require("crypto");

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
    profileImage: {
      type: String,
      default: "image/default.png",
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");
    const salt = user.salt;
    const hashedPassword = user.password;
    const providedPasswordHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    if (hashedPassword !== providedPasswordHash) {
      throw new Error("Password doesn't match");
    }
    const token = createUserToken(user);
    return token;
  }
);

const User = mongoose.model("users", userSchema);

module.exports = {
  User,
};
