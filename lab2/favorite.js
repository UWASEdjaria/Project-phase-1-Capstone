document.addEventListener("DOMContentLoaded", () => {
  const favGrid = document.getElementById("favorite-list");
  let favorites = JSON.parse(localStorage.getItem("favorite")) || [];
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
        <img src="${book.img}" alt="${book.title}" class="w-full h-72 object-cover mb-3">
        <h3 class="font-semibold text-lg">${book.title}</h3>
        <p class="text-gray-600 mb-2">${book.author}</p>
        <button class="remove-fav bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mt-2">Remove</button>
      `;
      div.querySelector(".remove-fav").addEventListener("click", () => {
        favorites = favorites.filter(f => f.id !== book.id);
        localStorage.setItem("favorite", JSON.stringify(favorites));
        renderFavorites();
      });
      favGrid.appendChild(div);
    });
  };
  renderFavorites();
});