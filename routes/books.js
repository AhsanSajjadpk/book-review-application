const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");
// Path to books.json
const booksFilePath = path.resolve(__dirname, "../models/books.json");

//  Get all books – Using async callback function 
router.get("/books", async (req, res) => {
  try {
    const data = await fs.readFile(booksFilePath, "utf8");
    const books = JSON.parse(data);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error reading books data" });
  }
});

// ✅ Route to get book by ISBN
router.get("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  fs.readFile(booksFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading books data" });
    }
    
    const books = JSON.parse(data);
    const book = books.find(b => b.isbn === isbn);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  });
});

// ✅ Route to get books by author
router.get("/books/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase(); // Convert to lowercase for case-insensitive search

  fs.readFile(booksFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading books data" });
    }

    const books = JSON.parse(data);
    const filteredBooks = books.filter(b => b.author.toLowerCase() === author);

    if (filteredBooks.length === 0) {
      return res.status(404).json({ error: "No books found for this author" });
    }

    res.json(filteredBooks);
  });
});

// ✅ Route to get books by title
router.get("/books/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase(); // Case-insensitive search

  fs.readFile(booksFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading books data" });
    }

    const books = JSON.parse(data);
    const filteredBooks = books.filter(b => b.title.toLowerCase().includes(title));

    if (filteredBooks.length === 0) {
      return res.status(404).json({ error: "No books found with this title" });
    }

    res.json(filteredBooks);
  });
});


// ✅ Route to get book reviews by ISBN (returns only the reviews array)
router.get("/books/:isbn/reviews", (req, res) => {
  const isbn = req.params.isbn;

  fs.readFile(booksFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading books data" });
    }

    const books = JSON.parse(data);
    const book = books.find(b => b.isbn === isbn);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (!book.reviews || book.reviews.length === 0) {
      return res.status(404).json({ error: "No reviews found for this book" });
    }

    res.json(book.reviews); // ✅ Return only the reviews array
  });
});


// ✅ Get book by ISBN using Promises
router.get("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  fs.readFile(booksFilePath, "utf8")
    .then((data) => {
      const books = JSON.parse(data);
      const book = books.find((b) => b.isbn === isbn);

      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      res.json(book);
    })
    .catch(() => {
      res.status(500).json({ error: "Error reading books data" });
    });
});


// ✅ Get books by Author using Promises
router.get("/books/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase(); // Convert to lowercase for case-insensitive search

  fs.readFile(booksFilePath, "utf8")
    .then((data) => {
      const books = JSON.parse(data);
      const filteredBooks = books.filter((b) => b.author.toLowerCase() === author);

      if (filteredBooks.length === 0) {
        return res.status(404).json({ error: "No books found for this author" });
      }

      res.json(filteredBooks);
    })
    .catch(() => {
      res.status(500).json({ error: "Error reading books data" });
    });
});


// ✅ Get books by Title using Promises
router.get("/books/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase(); 

  fs.readFile(booksFilePath, "utf8")
    .then((data) => {
      const books = JSON.parse(data);
      const filteredBooks = books.filter((b) => b.title.toLowerCase() === title);

      if (filteredBooks.length === 0) {
        return res.status(404).json({ error: "No books found with this title" });
      }

      res.json(filteredBooks);
    })
    .catch(() => {
      res.status(500).json({ error: "Error reading books data" });
    });
});




// router.get("/", bookController.getAllBooks);

// router.get("/isbn/:isbn", bookController.getBookByISBN);

// router.get("/author/:author", bookController.getBooksByAuthor);

// router.get("/title/:title", bookController.getBooksByTitle);

// router.get("/:id/reviews", bookController.getBookReviews);


//task 8
// router.post("/:id/review", authMiddleware, bookController.addReview);


//task 9
// router.delete("/:id/review/:reviewId", authMiddleware, bookController.deleteReview);

module.exports = router;

