const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory book storage
let books = [];
let id = 1;

// Add a book
app.post('/books', (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ message: "All fields required" });
  }
  const newBook = { id: id++, title, author, year };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Get a single book
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Not found" });
  res.json(book);
});

// Update a book
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Not found" });

  const { title, author, year } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  if (year) book.year = year;

  res.json(book);
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  books = books.filter(b => b.id !== parseInt(req.params.id));
  res.json({ message: "Book deleted" });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Library App running at http://0.0.0.0:${PORT}`);
});
