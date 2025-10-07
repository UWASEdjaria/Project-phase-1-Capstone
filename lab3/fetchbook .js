// fetchBooks.js
export async function fetchBooks(query = "fiction") {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=12`);
    const data = await response.json();
    
    // Map OpenLibrary data to expected format
    return data.docs.map(doc => ({
      id: doc.key || doc.cover_edition_key || `book-${Math.random().toString(36).substr(2, 9)}`,
      title: doc.title || "Unknown Title",
      author: doc.author_name?.[0] || "Unknown Author",
      img: doc.cover_i 
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
        : "https://via.placeholder.com/300x400?text=No+Cover"
    }));
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}
