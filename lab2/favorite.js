document.addEventListener("DOMContentLoaded", () => {
  const favGrid = document.getElementById("favorite-list");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
  const renderFavorites = () => {
    favGrid.innerHTML = "";
    
    if (favorites.length === 0) {
      favGrid.innerHTML = '<p class="text-center text-gray-500 sm:col-span-2 md:col-span-3 lg:col-span-4">No favorites yet!</p>';
      return;
    }
    
    favorites.forEach(book => {
      const div = document.createElement("div");
      div.className = "card max-w-xs bg-white rounded-xl shadow-lg overflow-hidden text-center p-4 transition-transform duration-500 hover:scale-105 hover:shadow-2xl";
      
      div.innerHTML = `
        <img src="${book.img || 'https://via.placeholder.com/150'}" alt="${book.title || 'Unknown Title'}" class="w-full h-72 object-cover mb-3">
        <h3 class="font-semibold text-lg">${book.title || 'Unknown Title'}</h3>
        <p class="text-gray-600 mb-2">${book.author || 'Unknown Author'}</p>
        <button class="remove-fav mx-auto m-5 p-2 border-2 border-purple-900 px-4 py-2 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-500 transition duration-300">
          Remove
        </button>
      `;
      
      div.querySelector(".remove-fav").addEventListener("click", () => {
        const confirmRemove = confirm(`Are you sure you want to remove "${book.title || 'Unknown Title'}" from favorites?`);
        if (confirmRemove) {
          favorites = favorites.filter(f => f.id !== book.id);
          localStorage.setItem("favorites", JSON.stringify(favorites));
          renderFavorites();
          alert(`"${book.title || 'Unknown Title'}" has been removed from favorites!`);
        } else {
          alert("Action canceled.");
        }
      });
      
      favGrid.appendChild(div);
    });
  };
  
  renderFavorites();
});
