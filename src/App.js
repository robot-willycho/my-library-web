import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import './App.css';

// --- SHARED UTILITY ---
const getImageUrl = (driveLink) => {
  if (!driveLink) return "";
  // This regex is specifically designed to extract the ID from the format in your console
  const match = driveLink.match(/\/d\/([\w-]+)/);
  if (match && match[1]) {
    return `https://docs.google.com/uc?export=view&id=${match[1]}`;
  }
  return driveLink;
};

// --- COMPONENT 1: THE CATEGORY SHELF (Home) ---
function Home({ books }) {
  // This maps your numbers to specific icons
  const categoryIcons = {
    "100": "🧠", // Philosophy & Psychology
    "600": "⚙️", // Technology
    "700": "🎨", // Arts (Where Siumaipedia lives!)
    "000": "📋", // General Works
    "default": "📚"
  };

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
              {categoryIcons[cat.substring(0, 3)] || categoryIcons["default"]}
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

  const filtered = books.filter(b => 
    b.category === catName && 
    (b.title.toLowerCase().includes(searchTerm.toLowerCase()) || b.author.toLowerCase().includes(searchTerm.toLowerCase()))
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

// --- MAIN APP ---
function App() {
  const [books, setBooks] = useState([]);
  const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTqehdZn2NuyOCbL5W38DFc5sWk2ba0HnJnZ0nQZ1GJIjvleYapYHnpDvaHbadpFkOSDew6lBGkOU6F/pub?output=csv";

 useEffect(() => {
    fetch(csvUrl)
      .then(res => res.text())
      .then(text => {
        const rows = text.split('\n').filter(row => row.trim() !== "");
        const data = rows.slice(1).map((row, rowIndex) => {
            // 1. Split columns
            const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

            // 2. Find the Drive link
            let rawLink = cols.find(c => c && c.includes('drive.google.com')) || "";
            
            // 3. THE CLEANUP: Remove quotes, spaces, and those hidden \r characters
            const cleanLink = rawLink.replace(/[平" \r\n]/g, "").trim();

            return {
              title: (cols[0] || "").replace(/"/g, "").trim(),
              author: (cols[1] || "").replace(/"/g, "").trim(),
              // Use Index 12 for your Category Code
              category: (cols[12] || "Uncategorized").replace(/[平" \r\n]/g, "").trim(),
              cover: cleanLink
            };
          });
        setBooks(data);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home books={books} />} />
        <Route path="/category/:catName" element={<CategoryPage books={books} />} />
      </Routes>
    </Router>
  );
}

export default App;