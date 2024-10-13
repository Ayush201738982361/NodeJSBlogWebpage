const { Router } = require("express");
const { User } = require("../models/users");

const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  // Create user
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      email,
      password,
      name,
    });
    console.log(user);
    res.redirect("home");
  } catch (err) {
    console.log("There might be an error", err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (err) {
    res.render("/login", {
      error: "Incorrect email or password",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
