const express = require("express");
const router = express.Router();
const { createPost } = require("../controllers/PostController");
router.post("/create-post", createPost);

module.exports = router;
