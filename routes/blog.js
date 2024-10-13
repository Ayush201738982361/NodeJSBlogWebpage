const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const { Blogs } = require("../models/blog");
const { Comments } = require("../models/blog-comments");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.resolve(`./image/uploads`);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()} - ${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
const router = Router();

router.get("/add-new-blogs", (req, res) => {
  res.render("addblog", {
    user: req.user,
  });
});

router.post("/add-new-blogs", upload.single("coverImage"), async (req, res) => {
  console.log(req.body);
  const { title, body } = req.body;
  try {
    const blog = await Blogs.create({
      title,
      body,
      createdBy: req._id,
      coverImageURL: `uploads/${req.file.filename}`,
    });
    console.log(blog);
  } catch (err) {
    console.log("Error", err);
  }
  return res.redirect("/");
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    const comments = await Comments.find({ blogId: req.params.id });
    console.log(blog);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    return res.render("blog", {
      user: req.user,
      blog,
      comments,
    });
  } catch (err) {
    console.log("Error fetching blog:", err);
    return res.status(500).send("Server error");
  }
});

router.post("/comment/:blogId", async (req, res) => {
  const comment = await Comments.create({
    comment: req.body.comment,
    blogId: req.params.blogId,
  });
  return res.render("/", {
    comment,
  });
});

module.exports = router;
