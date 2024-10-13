const mongoose = require("mongoose");

async function connectDB(url) {
  return await mongoose.connect(url);
}

module.exports = {
  connectDB,
};

// URL "mongodb://127.0.0.1:27017/Blogs"
