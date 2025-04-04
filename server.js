const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
const booksRoutes = require("./routes/books");

// dotenv.config();
// connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());



app.use("/api", booksRoutes);

// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/books", require("./routes/bookRoutes"));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
