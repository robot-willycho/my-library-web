import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import './App.css';

// --- SHARED UTILITIES ---
const getImageUrl = (driveLink) => {
  if (!driveLink) return "";
  
  // Extract the unique file ID from the Google Drive link
  const match = driveLink.match(/(?:id=|\/d\/)([\w-]+)/);
  if (match && match[1]) {
    const fileId = match[1];
    // FIXED: The real, working Google image delivery endpoint
    return `https://lh3.googleusercontent.com/d/${fileId}=s400`;
  }
  return driveLink;
};

const getCategoryIcon = (catCode) => {
  // If catCode is null, undefined, or empty, return the default book emoji safely
  if (!catCode) return "📖";
  
  // Safely convert to a string and slice the first digit
  const prefix = String(catCode).trim().substring(0, 1);
  
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

// --- COMPONENT 1: THE MAIN DASHBOARD (Home) ---
function Home({ books }) {
  // Extract unique categories dynamically and sort them
  const categories = [...new Set(books.map(b => b.category).filter(c => c))].sort();

  return (
    <div className="category-grid">
        {categories.map((cat) => (
          <Link to={`/category/${cat}`} key={cat} className="category-card">
            <div className="category-icon">
              {/* FIXED: Uses the function engine to render the correct section emoji */}
              {getCategoryIcon(cat)}
            </div>
            <h3>{cat}</h3>
            <p className="book-count">
              {books.filter(b => b.category === cat).length} Books
            </p>
          </Link>
        ))}
      </div>
  );
}

// --- COMPONENT 2: THE SECTION VIEW WITH POP-UP MODAL (CategoryPage) ---
function CategoryPage({ books }) {
  const { catName } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

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

      {/* --- DETAIL POP-UP MODAL WITH COLUMN F DESCRIPTION --- */}
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

// --- MAIN APPLICATION ARCHITECTURE ---
function App() {
  const [books, setBooks] = useState([]);
  const csvUrl = "https://docs.google.com/spreadsheets/d/1CuMVzOcRa1KEvAWyxIBh4Ud1I4IX_ylqxzo8GSPR_Jo/gviz/tq?tqx=out:csv";

  useEffect(() => {
    fetch(csvUrl)
      .then(res => res.text())
      .then(text => {
        // Break rows and clean up any Windows line endings instantly
        const rows = text.split('\n')
          .map(row => row.replace(/\r/g, ""))
          .filter(row => row.trim() !== "");

        const data = rows.slice(1).map((row) => {
          const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          if (!cols || cols.length === 0) return null;

          let rawLink = cols.find(c => c && c.includes('drive.google.com')) || "";
          
          // Enhanced string sanitizer to clear out surrounding quotes and invisible breaks
          const clean = (str) => str ? str.replace(/["\r\n]/g, "").trim() : "";

          return {
            title: clean(cols[0]) || "Untitled Book",
            author: clean(cols[1]) || "Unknown Author",
            description: clean(cols[5]) || "No description available.", // Column F
            category: clean(cols[12]) || "Uncategorized",                 // Column M
            cover: clean(rawLink)
          };
        }).filter(book => book !== null);

        console.log("Sanitized Library Books Array:", data); // Check your console to see them!
        setBooks(data);
      })
      .catch(err => console.error("Error loading library sheet data:", err));
  }, []);

  return (
    <Router>
      <div className="app-container">
        <div className="global-header">
          <div className="qr-section">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://my-library-web.vercel.app" 
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