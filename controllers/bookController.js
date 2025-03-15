const Book = require("../models/Book");

// Task 1
exports.getAllBooks = async (req, res) => {
    res.json(await Book.find());
};



// Task 2
exports.getBookByISBN = async (req, res) => {
    res.json(await Book.findOne({ isbn: req.params.isbn }));
};



// Task 3
exports.getBooksByAuthor = async (req, res) => {
    res.json(await Book.find({ author: req.params.author }));
};




// Task 4
exports.getBooksByTitle = async (req, res) => {
    res.json(await Book.find({ title: req.params.title }));
};



// Task 5
exports.getBookReviews = async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.json(book ? book.reviews : []);
};


// Task 8
exports.addReview = async (req, res) => {
    const book = await Book.findById(req.params.id);
    book.reviews.push({ user: req.user.id, review: req.body.review });
    await book.save();
    res.json({ message: "Review Added!" });
};

// Task 9

exports.deleteReview = async (req, res) => {
    const book = await Book.findById(req.params.id);
    book.reviews = book.reviews.filter(review => review.user.toString() !== req.user.id);
    await book.save();
    res.json({ message: "Review Deleted!" });
};
