const axios = require("axios");
//task 10

exports.getBooks = async (callback) => {
    axios.get("https://api.example.com/books").then(response => callback(null, response.data)).catch(err => callback(err, null));
};

//task 11

exports.getBookByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.example.com/books/${isbn}`).then(response => resolve(response.data)).catch(err => reject(err));
    });
};


//task 12

exports.getBooksByAuthor = async (author) => {
    return await axios.get(`https://api.example.com/books?author=${author}`);
};


//task 13

exports.getBooksByTitle = async (title) => {
    return await axios.get(`https://api.example.com/books?title=${title}`);
};