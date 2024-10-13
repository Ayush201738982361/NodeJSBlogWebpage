const express = require("express");
require("dotenv").config();
const path = require("path");
const { connectDB } = require("./connection");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const cookieParser = require("cookie-parser");
const { checkForAuth } = require("./middlewares/auth");
const { Blogs } = require("./models/blog");
const PORT = process.env.PORT || 80;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(checkForAuth);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/user", userRoutes);
app.use("/blogs", blogRoutes);

connectDB(process.env.MONGO_URL).then(() => {
  console.log("MongoDB Connected");
});

app.get("/", async (req, res) => {
  const allBlogs = await Blogs.find({}).sort("createdAt");
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.listen(PORT, () => {
  console.log(`Server Started At Port ${PORT}`);
});
