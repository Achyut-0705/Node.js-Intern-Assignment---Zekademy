const express = require("express");

const authRoutes = require("./Auth/auth.route.js");
const imageRoutes = require("./Image.route.js");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/image", imageRoutes);

router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
