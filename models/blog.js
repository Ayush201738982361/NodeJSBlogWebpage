const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const Blogs = mongoose.model("blog", blogSchema);

module.exports = {
  Blogs,
};
