import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import './App.css';

// --- SHARED UTILITY ---
const getImageUrl = (driveLink) => {
  if (!driveLink) return "";

  // Extract the ID from any Google Drive link format
  const match = driveLink.match(/(?:id=|\/d\/)([\w-]+)/);
  
  if (match && match[1]) {
    const fileId = match[1];
    // This 'lh3' link is the 'Web-Friendly' version that avoids CORB blocks
    return `https://lh3.googleusercontent.com/d/${fileId}=s400`;
  }
  
  return driveLink;
};

// This maps your numbers to specific icons
  const getCategoryIcon = (catCode) => {
  // Take the first character (e.g., "5" from "500")
  const prefix = catCode.substring(0, 1);
  const icons = {
    "1": "🧠", // 100s
    "2": "⛪", // 200s
    "3": "👥", // 300s
    "4": "🗣️", // 400s
    "5": "🔬", // 500s
    "6": "⚙️", // 600s
    "7": "🎨", // 700s
    "8": "📚", // 800s
    "9": "🗺️", // 900s
    "0": "📋", // 000s
  };
  return icons[prefix] || "📖";
};

// --- COMPONENT 1: THE CATEGORY SHELF (Home) ---
function Home({ books }) {
  // Get unique categories and sort them numerically
  const categories = [...new Set(books.map(b => b.category).filter(c => c))].sort();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>My Digital Library</h1>
        <p>Select a section to browse</p>
      </header>
      
      <div className="category-grid">
        {categories.map(cat => (
          <Link to={`/category/${cat}`} key={cat} className="category-card">
            <div className="category-icon">
              {/* This looks up the icon based on the first 3 digits of your category */}
              {getCategoryIcon(cat)}
            </div>
            <h3>{cat}</h3>
            <p className="book-count">{books.filter(b => b.category === cat).length} Books</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// --- COMPONENT 2: THE BOOK LIST PAGE ---
function CategoryPage({ books }) {
  const { catName } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null); // Tracks the clicked book

  const filtered = books.filter(b => 
    b.category === catName && 
    (b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     b.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="library-container">
      <header className="library-header">
        <Link to="/" className="back-button">← Back to Sections</Link>
        <h1>{catName}</h1>
        <input
          type="text"
          placeholder="Search in this section..."
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <main className="book-grid">
        {filtered.map((book, index) => (
          // Notice the onClick here!
          <div key={index} className="book-card" onClick={() => setSelectedBook(book)}>
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

      {/* --- THE POP-UP MODAL --- */}
      {selectedBook && (
        <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedBook(null)}>×</button>
            
            <div className="modal-body">
              <div className="modal-image">
                <img src={getImageUrl(selectedBook.cover)} alt={selectedBook.title} />
              </div>
              
              <div className="modal-details">
                <h2>{selectedBook.title}</h2>
                <p className="modal-author">by {selectedBook.author}</p>
                
                {/* --- NEW DESCRIPTION SECTION --- */}
                <div className="modal-description">
                  <p>{selectedBook.description}</p>
                </div>
                
                <div className="modal-meta">
                  <span><strong>Category:</strong> {selectedBook.category}</span>
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="google-btn"
                    onClick={() => window.open(`https://www.google.com/search?q=${selectedBook.title}+${selectedBook.author}`, '_blank')}
                  >
                    🔍 Search on Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- MAIN APP ---
function App() {
  const [books, setBooks] = useState([]);
  const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTqehdZn2NuyOCbL5W38DFc5sWk2ba0HnJnZ0nQZ1GJIjvleYapYHnpDvaHbadpFkOSDew6lBGkOU6F/pub?output=csv";

 useEffect(() => {
    fetch(csvUrl)
      .then(res => res.text())
      .then(text => {
        const rows = text.split('\n').filter(row => row.trim() !== "");
        const data = rows.slice(1).map((row) => {
          const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          
          // Find the column that contains the drive link
          let rawLink = cols.find(c => c && c.includes('drive.google.com')) || "";

          // Helper to remove quotes, hidden returns, and extra spaces
          const clean = (str) => str ? str.replace(/["\r\n]/g, "").trim() : "";

          return {
            title: clean(cols[0]),
            author: clean(cols[1]),
            description: clean(cols[5] || "No description available."), 
            category: clean(cols[12] || "Uncategorized"), 
            cover: clean(rawLink)
          };
        });
        setBooks(data);
      });
  }, []);

  return (
    <Router>
      <div className="app-container">
        {/* This QR section stays at the top of the entire app */}
        <div className="global-header">
          <div className="qr-section">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://my-library-web.vercel.app`} 
              alt="Library QR Code" 
            />
            <p>Scan to browse on mobile</p>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home books={books} />} />
          <Route path="/category/:catName" element={<CategoryPage books={books} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;