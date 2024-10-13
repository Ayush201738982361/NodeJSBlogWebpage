const { User } = require("../models/users");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      email,
      password,
      name,
    });
    console.log(user);
    res.redirect("/");
  } catch (err) {
    console.log("There might be an error", err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log("User authenticated:", token);
    return res.cookie("token", token).redirect("/");
  } catch (err) {
    res.render("/login", {
      error: "Incorrect email or password",
    });
  }
});
