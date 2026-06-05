import React, { useState, useEffect } from 'react';
import '../App.css';

// 1. Master Hundreds-Level Category Icon Mappings
const getCategoryIcon = (category) => {
  const mapping = {
    '100': '🧠', // Philosophy & Psychology
    '200': '⛪', // Religion
    '300': '🤝', // Social Sciences
    '400': '🗣️', // Language
    '500': '🔬', // Science
    '600': '⚙️', // Technology / Applied Science
    '700': '🎨', // Arts & Recreation
    '800': '📚', // Literature
    '900': '🗺️', // History & Geography
    '0': '💻'     // Generalities / Computer Science
  };
  return mapping[category] || '📖';
};

// 2. Streamlined Google Drive Image URL Extractor
const getImageUrl = (url) => {
  if (!url) return '';
  if (url.includes('drive.google.com')) {
    // Extracts the file ID regardless of the link formatting style
    const match = url.match(/id=([^&]+)/) || url.match(/d\/([^/]+)/);
    if (match && match[1]) {
      // Uses the open thumbnail endpoint which completely avoids 403 blocks
      return `https://drive.google.com/thumbnail?sz=w500&id=${match[1]}`;
    }
  }
  return url;
};

function Library() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const csvUrl = "https://docs.google.com/spreadsheets/d/1CuMVzOcRa1KEvAWyxIBh4Ud1I4IX_ylqxzo8GSPR_Jo/export?format=csv";

  // 4. Remote CSV Database Pull Engine
  useEffect(() => {
    fetch(csvUrl)
      .then((res) => res.text())
      .then((text) => {
        const rows = text.split(/\r?\n/).filter(row => row.trim() !== "");
        
        const parsedData = rows.slice(1).map((row) => {
          const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          
          const clean = (str) => {
            if (!str) return "";
            return str.replace(/^["\r\n\t]+|["\r\n\t]+$/g, "").trim();
          };

          // Target Column K (Index 10) directly for the image link
          let rawLink = cols[10] || "";

          // Process the Dewey Decimal classification code from Column M (Index 12)
          const rawCategory = clean(cols[12]); 
          const numericValue = parseInt(rawCategory, 10);
          const masterCategory = !isNaN(numericValue) 
            ? String(Math.floor(numericValue / 100) * 100) 
            : "Uncategorized";

          return {
            title: clean(cols[0]),                                        // Column A (Index 0)
            author: clean(cols[1]),                                       // Column B (Index 1)
            description: clean(cols[5]) || "No description available.",   // Column F (Index 5)
            category: masterCategory,                                     // Overarching Group (100, 500)
            subCategory: rawCategory,                                     // Exact code (150)
            cover: clean(rawLink)                                         // Clean Column K link
          };
        });

        // Filter out completely blank lines
        const cleanBooks = parsedData.filter(b => b.title || b.author);
        setBooks(cleanBooks);
      })
      .catch((err) => console.error("Database sync failed:", err));
  }, []);

  // 5. Dynamic Search Query Filter
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group books into their 100s master boxes
  const categories = books.reduce((acc, book) => {
    if (book.category) {
      acc[book.category] = (acc[book.category] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="library-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Search Header Interface */}
      <div className="library-header" style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '16px' }}>My Digital Bookshelf</h1>
        <input 
          type="text" 
          placeholder="Search by title or author..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '12px 20px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '1rem'
          }}
        />
      </div>

      {/* Main Categories Grid */}
      <div className="category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {Object.keys(categories).sort((a, b) => parseInt(a) - parseInt(b)).map((catCode) => {
          const catBooks = filteredBooks.filter(b => b.category === catCode);
          return (
            <div 
              key={catCode} 
              className="category-card"
              onClick={() => setSelectedCategory(selectedCategory === catCode ? null : catCode)}
              style={{
                cursor: 'pointer',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                textAlign: 'center',
                background: selectedCategory === catCode ? '#f1f5f9' : '#ffffff',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
                transition: 'all 0.2s'
              }}
            >
              <div className="category-icon" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{getCategoryIcon(catCode)}</div>
              <h3 style={{ color: '#1e293b', marginBottom: '4px' }}>{catCode}s Division</h3>
              <p className="book-count" style={{ color: '#64748b', fontSize: '0.9rem' }}>{catBooks.length} Books</p>
            </div>
          );
        })}
      </div>

      {/* Expanded Grid View */}
      {selectedCategory && (
        <div style={{ marginTop: '48px', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ color: '#0f172a' }}>Books in the {selectedCategory}s Master Class</h2>
            <button onClick={() => setSelectedCategory(null)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontWeight: '500' }}>
              ← Clear Selection
            </button>
          </div>
          
          <div className="book-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '24px' }}>
            {filteredBooks
              .filter(book => book.category === selectedCategory)
              .map((book, idx) => (
                <div 
                  key={idx} 
                  className="book-card" 
                  onClick={() => setSelectedBook(book)}
                  style={{ cursor: 'pointer', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', background: '#fff', textAlign: 'center' }}
                >
                  <div className="book-cover-wrapper" style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', borderRadius: '6px', overflow: 'hidden', marginBottom: '12px' }}>
                    {getImageUrl(book.cover) ? (
                      <img src={getImageUrl(book.cover)} alt={book.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ fontSize: '2.5rem' }}>📚</div>
                    )}
                  </div>
                  <div className="book-info">
                    <h4 style={{ fontSize: '0.95rem', color: '#1e293b', margin: '0 0 4px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>{book.author}</p>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginTop: '4px' }}>Dewey: {book.subCategory}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Detail Popup View Modal */}
      {selectedBook && (
        <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedBook(null)}>×</button>
            
            {/* Added modal-body wrapper class here */}
            <div className="modal-body">
              
              {/* Added modal-image wrapper class here */}
              <div className="modal-image">
                {getImageUrl(selectedBook.cover) ? (
                  <img src={getImageUrl(selectedBook.cover)} alt={selectedBook.title} />
                ) : (
                  <div style={{ fontSize: '3rem' }}>📚</div>
                )}
              </div>

              {/* Added modal-details class here */}
              <div className="modal-details">
                <h2>{selectedBook.title}</h2>
                <p className="modal-author">by {selectedBook.author}</p>
                
                <div className="modal-meta">
                  <span>Dewey Classification: {selectedBook.subCategory}</span>
                </div>
                
                <p className="modal-description">{selectedBook.description}</p>
                
                <button 
                  className="google-btn"
                  onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(selectedBook.title + ' ' + selectedBook.author)}`, '_blank')}
                >
                  Search on Google
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Library;