import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. YOUR CSV LINK GOES HERE
  const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTqehdZn2NuyOCbL5W38DFc5sWk2ba0HnJnZ0nQZ1GJIjvleYapYHnpDvaHbadpFkOSDew6lBGkOU6F/pub?output=csv";

  // 2. THE IMAGE HELPER (Must be inside the App function)
  const getImageUrl = (driveLink) => {
  if (!driveLink) return "";
  const regex = /(?:id=|\/d\/|file\/d\/)([\w-]{25,})/;
  const match = driveLink.match(regex);
  if (match && match[1]) {
    // This bypasses the typical Drive security screen
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return driveLink;
};

  useEffect(() => {
    fetch(csvUrl)
      .then(res => res.text())
      .then(text => {
        // If the link still gives us a website instead of data, this stops the error
        if (text.trim().startsWith('<')) {
          console.error("The link provided is still returning a webpage, not a CSV.");
          return;
        }

        const rows = text.split('\n').filter(row => row.trim() !== ""); 
        const data = rows.slice(1).map(row => {
  const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  
  // This automatically finds the column that contains a Drive link
  const driveLink = cols.find(c => c && c.includes('drive.google.com')) || "";

  return { 
    title: (cols[0] || "").replace(/"/g, "").trim(), 
    author: (cols[1] || "").replace(/"/g, "").trim(), 
    cover: driveLink.trim() 
  };
});
        setBooks(data);
      })
      .catch(err => console.error("Error fetching data:", err));
  }, [csvUrl]);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="library-container">
      <header className="library-header">
        <h1>My Digital Bookshelf</h1>
        
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search by title or author..." 
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        
        <p>Showing {filteredBooks.length} of {books.length} books</p>

        {/* Change 'YOUR_VERCEL_URL' to your actual live link */}
    <div className="qr-section">
      <img 
        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://your-vercel-url.vercel.app`} 
        alt="Library QR Code" 
      />
      <p>Scan to view on mobile</p>
    </div>
      </header>

      <main className="book-grid">
        {filteredBooks.map((book, index) => (
          <div key={index} className="book-card">
            <div className="book-cover-wrapper">
              {/* This is the line that was crashing! */}
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