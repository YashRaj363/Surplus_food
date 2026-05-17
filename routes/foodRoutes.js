// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/authMiddleware");
// const { addFood, getFood, claimFood } = require("../controllers/foodController");
// const multer = require('multer');



// // Storage settings
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'uploads/'); // make sure this folder exists
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });


// // Add new food (only for logged-in users)
// router.post("/addfood", auth, addFood);

// // Get all food
// router.get("/getfood", getFood);

// // Claim food
// router.post("/:id/claim", auth, claimFood);
// router.post('/add', upload.single('image'), addFood);



// module.exports = router;





const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { addFood, getFood, claimFood } = require("../controllers/foodController");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Make sure uploads folder exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Storage settings
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Add new food (logged-in users) with **multiple images**
router.post("/addfood", auth, upload.array('images', 5), addFood);

// Get all food
router.get("/getfood", getFood);

// Claim food
router.post("/:id/claim", auth, claimFood);

module.exports = router;
