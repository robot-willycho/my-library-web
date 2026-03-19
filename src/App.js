import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  
  // 1. PASTE YOUR CSV LINK HERE
  const csvUrl = "YOUR_GOOGLE_SHEETS_CSV_LINK_HERE";

  // 2. The helper function to fix Google Drive Image Links
  const getImageUrl = (driveLink) => {
    if (!driveLink || !driveLink.includes('id=')) {
      // If it's a direct link or empty, return as is
      return driveLink;
    }
    const fileId = driveLink.split('id=')[1];
    return `https://lh3.googleusercontent.com/d/${fileId}=s400`;
  };

  useEffect(() => {
    fetch(csvUrl)
      .then(res => res.text())
      .then(text => {
        const rows = text.split('\n').slice(1); 
        const data = rows.map(row => {
          const cols = row.split(',');
          return {
            title: cols[0],
            author: cols[1],
            cover: cols[2] 
          };
        });
        setBooks(data);
      });
  }, [csvUrl]);

  return (
    <div className="library-container">
      <header className="library-header">
        <h1>My Digital Bookshelf</h1>
        <p>Total Books: {books.length}</p>
      </header>

      <main className="book-grid">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <div className="book-cover-wrapper">
              <img src={getImageUrl(book.cover)} alt={book.title} />
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;