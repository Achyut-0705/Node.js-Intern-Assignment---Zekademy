const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleWare = require("../../middlewares/Auth.middleware.js");

// multer config
const storage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});

const imageController = require("../../controllers/image.controller.js");

router.post(
  "/upload",
  [authMiddleWare.auth, storage.single("image")],
  imageController.upload
);

router.get("/:image_id", authMiddleWare.auth, imageController.getImage);

module.exports = router;
