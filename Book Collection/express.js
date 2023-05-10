const express = require('express');
const app = express();
const port = 3000;

let books = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  const book = {
    id: Date.now().toString(),
    title,
    author,
    publishedDate
  };

  books.push(book);

  res.json(book);
});

app.delete('/books/:id', (req, res) => {
  const id = req.params.id;

  const bookIndex = books.findIndex(book => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books.splice(bookIndex, 1);

  res.json({ message: 'Book deleted successfully' });
});

app.listen(port, () => {
  console.log(`Book Collection app listening at http://localhost:${port}`);
});
