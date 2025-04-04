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
    // Read books.json file correctly
    const data = await fs.promises.readFile(booksFilePath, "utf8");
    const books = JSON.parse(data);
    res.json(books);
  } catch (error) {
    console.error("Error reading books.json:", error);
    res.status(500).json({ error: "Error reading books data" });
  }

});

// ✅ Route to get book by ISBN
router.get("/books/isbn/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;
    const data = await fs.promises.readFile(booksFilePath, "utf8");
    const books = JSON.parse(data);

    // 📌 Check if book exists
    if (books.books[isbn]) {
      res.json(books.books[isbn]);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});







// ✅ Route to get books by author
router.get("/author/:author", async (req, res) => {
  try {
    const { author } = req.params; // ✅ Get author name from route params

    const data = await fs.promises.readFile(booksFilePath, "utf8");
    const books = JSON.parse(data);

    // 📌 Filter books by author name
    const filteredBooks = Object.values(books.books).filter(
      (book) => book.author.toLowerCase() === author.toLowerCase()
    );

    if (filteredBooks.length > 0) {
      res.json(filteredBooks);
    } else {
      res.status(404).json({ error: "No books found for this author" });
    }
  } catch (error) {
    console.error("Error fetching books by author:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

// ✅ Route to get books by title
router.get("/title/:title", async (req, res) => {
  try {
    const { title } = req.params; // ✅ Get book title from route params

    const data = await fs.promises.readFile(booksFilePath, "utf8");
    const books = JSON.parse(data);

    // 📌 Filter books by title
    const filteredBooks = Object.values(books.books).filter(
      (book) => book.title.toLowerCase() === title.toLowerCase()
    );

    if (filteredBooks.length > 0) {
      res.json(filteredBooks);
    } else {
      res.status(404).json({ error: "No books found with this title" });
    }
  } catch (error) {
    console.error("Error fetching books by title:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// ✅ Route to get book reviews by ISBN (returns only the reviews array)
router.get("/reviews/isbn/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params; // ✅ Get ISBN from route params

    const data = await fs.promises.readFile(booksFilePath, "utf8");
    const books = JSON.parse(data);

    // 📌 Find the book by ISBN
    const book = books.books[isbn];

    if (book) {
      res.json({ reviews: book.reviews });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error fetching reviews by ISBN:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
router.get("/title/:title", (req, res) => {
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



router.get("/books", (req, res) => {
  fs.readFile(booksFilePath, "utf8", async (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading books data" });
    }
    
    try {
      const books = JSON.parse(data);
      res.json(books.books); // Return all books
    } catch (error) {
      console.error("Error parsing books data:", error);
      res.status(500).json({ error: "Error parsing books data" });
    }
  });
});


// 📌 Get book by ISBN using Promises
router.get("/books/isbn/:isbn", (req, res) => {
  const { isbn } = req.params; // Get ISBN from route parameters

  fs.promises.readFile(booksFilePath, "utf8")
    .then((data) => {
      const books = JSON.parse(data); // Parse the JSON data

      // 📌 Find the book by ISBN
      const book = books.books[isbn];

      if (book) {
        res.json(book); // Return the book with given ISBN
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    })
    .catch((error) => {
      console.error("Error reading books data:", error);
      res.status(500).json({ error: "Error reading books data" });
    });
});




router.get("/author/:author", (req, res) => {
  const { author } = req.params; // Get author name from route parameters

  fs.promises.readFile(booksFilePath, "utf8")
    .then((data) => {
      const books = JSON.parse(data); // Parse the JSON data

      // 📌 Filter books by author
      const filteredBooks = Object.values(books.books).filter(
        (book) => book.author.toLowerCase() === author.toLowerCase()
      );

      if (filteredBooks.length > 0) {
        res.json(filteredBooks); // Return the list of books by the given author
      } else {
        res.status(404).json({ error: "No books found for this author" });
      }
    })
    .catch((error) => {
      console.error("Error reading books data:", error);
      res.status(500).json({ error: "Error reading books data" });
    });
});




// 📌 Get books by Title using Promises
router.get("/books/title/:title", (req, res) => {
  const { title } = req.params; // Get title from route parameters

  fs.promises.readFile(booksFilePath, "utf8")
    .then((data) => {
      const books = JSON.parse(data); // Parse the JSON data

      // 📌 Filter books by title
      const filteredBooks = Object.values(books.books).filter(
        (book) => book.title.toLowerCase().includes(title.toLowerCase())
      );

      if (filteredBooks.length > 0) {
        res.json(filteredBooks); // Return books matching the given title
      } else {
        res.status(404).json({ error: "No books found with this title" });
      }
    })
    .catch((error) => {
      console.error("Error reading books data:", error);
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

