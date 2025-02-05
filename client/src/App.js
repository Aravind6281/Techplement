// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [quote, setQuote] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     getRandomQuote();
//   }, []);

//   const getRandomQuote = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/random-quote');
//       setQuote(response.data);
//     } catch (error) {
//       alert('Hello');
//       console.error('Error fetching random quote:', error);
//     }
//   };
  
//   const handleSearch = async (e) => {
//     e.preventDefault();
//     // try {
//     //   const response = await axios.get(`http://localhost:5000/api/quotes?author=${searchTerm}`);
//     //   setSearchResults(response.data);
//     // } catch (error) {
//     //   alert('Hello');
//     //   console.error('Error searching quotes:', error);
//     // }
//     try {
//       const response = await axios.get(`http://localhost:5000/api/quotes?author=${author}`);
//       console.log('Quotes by author:', response.data);
//     } catch (error) {
//       console.error('Error fetching quotes:', error);
//     }
//   };

//   return (
//     <div className="app">
//       <h1>Quote of the Day</h1>

//       {quote && (
//         <div className="quote-box">
//           <p>"{quote.text}"</p>
//           <p>- {quote.author}</p>
//         </div>
//       )}

//       <button onClick={getRandomQuote}>Get Another Quote</button>

//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           placeholder="Search by author"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button type="submit">Search</button>
//       </form>

//       <div className="search-results">
//         {searchResults.map((q) => (
//           <div key={q.id} className="quote-box">
//             <p>"{q.text}"</p>
//             <p>- {q.author}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [quote, setQuote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getRandomQuote();
  }, []);

  const getRandomQuote = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/random-quote');
      setQuote(response.data);
    } catch (error) {
      alert('Error fetching random quote');
      console.error('Error fetching random quote:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Use searchTerm as the query parameter for the author search
      const response = await axios.get(`http://localhost:5000/api/quotes?author=${searchTerm}`);
      setSearchResults(response.data); // Update search results state
    } catch (error) {
      alert('Error searching quotes');
      console.error('Error searching quotes:', error);
    }
  };

  return (
    <div className="app">
      <h1>Quote of the Day</h1>

      {quote && (
        <div className="quote-box">
          <p>"{quote.text}"</p>
          <p>- {quote.author}</p>
        </div>
      )}

      <button onClick={getRandomQuote}>Get Another Quote</button>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((q) => (
            <div key={q.id} className="quote-box">
              <p>"{q.text}"</p>
              <p>- {q.author}</p>
            </div>
          ))
        ) : (
          <p>No quotes found</p>
        )}
      </div>
    </div>
  );
}

export default App;

