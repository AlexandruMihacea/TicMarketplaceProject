const express = require("express");
const postController = require("../controllers/postController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", upload.single("image"), postController.create);
router.get("/", postController.getAll);
router.get("/:postId", postController.getById);
router.get("/user/:userId", postController.getByUser); 
router.put("/:postId", postController.update);
router.delete("/:postId", postController.delete);

module.exports = router;