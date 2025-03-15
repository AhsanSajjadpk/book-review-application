const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", bookController.getAllBooks);

router.get("/isbn/:isbn", bookController.getBookByISBN);

router.get("/author/:author", bookController.getBooksByAuthor);

router.get("/title/:title", bookController.getBooksByTitle);

router.get("/:id/reviews", bookController.getBookReviews);


//task 8
router.post("/:id/review", authMiddleware, bookController.addReview);


//task 9
router.delete("/:id/review/:reviewId", authMiddleware, bookController.deleteReview);

module.exports = router;

