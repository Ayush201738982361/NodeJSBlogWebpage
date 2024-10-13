const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogs",
    },
  },
  { timestamps: true }
);

const Comments = mongoose.model("blog-comments", commentSchema);

module.exports = {
  Comments,
};
