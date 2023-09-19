const express = require('express');
const bankController = require("../controller/bankController");
const {
    uploadSingle
} = require("../middleware/multer");
const router = express.Router();

router.post("/create", uploadSingle, bankController.addBank);
// router.get("/read", categoryController.viewCategory);
// router.patch("/update/:id", categoryController.updateCategory);
// router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;