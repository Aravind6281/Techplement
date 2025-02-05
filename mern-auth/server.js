const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const readQuotes = () => {
  try {
    const data = fs.readFileSync('./quotes.json', 'utf-8');
    console.log('Raw Data from JSON file:', data);  // Log data to check if it's being read
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading the JSON file:', err);
    return [];
  }
};

app.get('/api/random-quote', (req, res) => {
  const quotes = readQuotes();
  if (quotes.length === 0) return res.status(404).json({ message: 'No quotes available' });
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(randomQuote);
});


// Route to search quotes by author name
// app.get('/api/quotes', (req, res) => {
//   const quotes = readQuotes();
//   const author = req.query.author?.toLowerCase();

//   if (author) {
//     const filteredQuotes = quotes.filter(quote => 
//       quote.author.toLowerCase().includes(author)
//     );
//     return res.json(filteredQuotes);
//   }

//   res.json(quotes);
// });
app.get('/api/quotes', (req, res) => {
  const { author } = req.query; // Get author from query params
  if (!author) {
    return res.status(400).json({ message: 'Author query parameter is required' });
  }

  const quotes = readQuotes();
  const filteredQuotes = quotes.filter((quote) =>
    quote.author.toLowerCase().includes(author.toLowerCase())
  );

  if (filteredQuotes.length === 0) {
    return res.status(404).json({ message: `No quotes found by ${author}` });
  }

  res.json(filteredQuotes);
});


// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
