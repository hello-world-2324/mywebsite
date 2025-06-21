const watches = [
  { id: 1, name: "Omega Seamaster", price: "₹2,45,000", image: "watch1.jpg" },
  { id: 2, name: "Rolex Submariner", price: "₹8,75,000", image: "watch2.jpg" },
  { id: 3, name: "Tag Heuer Carrera", price: "₹3,20,000", image: "watch3.jpg" },
  { id: 4, name: "Breitling Navitimer", price: "₹4,50,000", image: "watch4.jpg" },
  { id: 5, name: "Hublot Big Bang", price: "₹7,10,000", image: "watch5.jpg" },
  { id: 6, name: "Audemars Piguet Royal Oak", price: "₹25,00,000", image: "watch6.jpg" }
];

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("searchInput");
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

let cart = [];

function renderProducts(filteredWatches = watches) {
  productGrid.innerHTML = "";

  if (filteredWatches.length === 0) {
    productGrid.innerHTML = `<p style="text-align: center; grid-column: 1/-1; font-weight: bold;">No watches found.</p>`;
    return;
  }

  filteredWatches.forEach((watch) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${watch.image}" alt="${watch.name}" onerror="this.src='images/default.jpg'" />
      <h3>${watch.name}</h3>
      <p>${watch.price}</p>
      <button onclick="addToCart(${watch.id})">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}

function addToCart(id) {
  const watch = watches.find((w) => w.id === id);
  if (watch) {
    cart.push(watch);
    updateCart();
  }
}

function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = cart
    .map((item) => `<li>${item.name} - ${item.price}</li>`)
    .join('');
}

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = watches.filter((watch) =>
    watch.name.toLowerCase().includes(searchTerm)
  );
  renderProducts(filtered);
});

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
});

renderProducts();
