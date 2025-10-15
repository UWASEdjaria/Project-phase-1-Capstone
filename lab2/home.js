import { fetchBooks } from "../lab3/fetchbook.js";

document.addEventListener("DOMContentLoaded", () => {
  const booksGrid = document.getElementById("booksGrid");
  const searchInput = document.getElementById("text");
  const searchBtn = document.getElementById("searchBtn");
  const explorerBtn = document.getElementById("explorerBtn");

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const saveFavorites = () => localStorage.setItem("favorites", JSON.stringify(favorites));

  const renderBooks = (books) => {
    if (!booksGrid) return;
    booksGrid.innerHTML = "";

    if (!books || books.length === 0) {
      booksGrid.innerHTML = '<p class="col-span-full text-center text-gray-500 text-xl">No books found. Try a different search!</p>';
      return;
    }

    books.forEach(book => {
      const card = document.createElement("div");
      card.className = "card max-w-xs bg-white rounded-xl shadow-lg overflow-hidden text-center p-4 transition-transform duration-500 hover:translate-y-2 hover:shadow-2xl hover:scale-105";

      const isFav = favorites.some(f => f.id === book.id);

      card.innerHTML = `
        <img src="${book.img}" alt="${book.title}" class="w-full h-96 object-cover mb-3">
        <h3 class="mt-2 font-semibold text-lg">${book.title}</h3>
        <p class="text-gray-600">${book.author}</p>
        <button class="add-fav border-2 border-purple-700 p-2 m-2 rounded-lg hover:bg-purple-400 hover:border-purple-600 shadow-lg">
          ${isFav ? "Remove Favorite" : "Add Favorite"}
        </button>
      `;
      card.querySelector(".add-fav").addEventListener("click", () => {
  const isFav = favorites.some(f => f.id === book.id);

  if (isFav) {
    const confirmRemove = confirm(`Are you sure you want to remove "${book.title}" from favorites?`);
    if (confirmRemove) {
      favorites = favorites.filter(f => f.id !== book.id);
      alert(`"${book.title}" has been removed from favorites.`);
    } else {
      alert("Action canceled.");
      return; // stop here
    }
  } else {
    const confirmAdd = confirm(`Do you want to add "${book.title}" to your favorites?`);
    if (confirmAdd) {
      favorites.push({ id: book.id, title: book.title, author: book.author, img: book.img });
      alert(`"${book.title}" has been added to favorites.`);
    } else {
      alert("Action canceled.");
      return; // stop here
    }
  }

  saveFavorites();
  renderBooks(books);
});


      booksGrid.appendChild(card);
    });
  };

  const doSearch = async () => {
    if (!searchInput) return;
    const query = (searchInput.value || "").trim() || "popular books";
    const books = await fetchBooks(query, 24);
    renderBooks(books);
  };

  if (searchBtn) {
    searchBtn.addEventListener("click", doSearch);
  }
  
  if (searchInput) {
    searchInput.addEventListener("keydown", e => { 
      if (e.key === "Enter") doSearch(); 
    });
  }

  if (explorerBtn) {
    explorerBtn.addEventListener("click", async () => {
      const originalText = explorerBtn.textContent;
      explorerBtn.textContent = "Loading...";
      explorerBtn.disabled = true;

      const books = await fetchBooks("bestseller", 24);
      renderBooks(books);

      if (booksGrid) {
        booksGrid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      explorerBtn.textContent = originalText;
      explorerBtn.disabled = false;
    });
  }

  // Initial load - Load many books on page load
  (async () => {
    booksGrid.innerHTML = '<p class="col-span-full text-center text-gray-500 text-xl">Loading books...</p>';
    const books = await fetchBooks("popular books", 24);
    renderBooks(books);
  })();
});
