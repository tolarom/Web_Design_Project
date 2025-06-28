const params = new URLSearchParams(window.location.search);
const category = params.get("category");

document.querySelectorAll('.item').forEach(item => {
  if (item.classList.contains(category)) {
    item.classList.remove('hidden');
  } else {
    item.classList.add('hidden');
  }
});


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// Add scroll effects
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('shadow-md');
    } else {
        header.classList.remove('shadow-md');
    }
});

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');

    // Initialize cart from local storage, or as an empty array if not found
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // --- Helper Functions ---

    // Function to save the cart to local storage
    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Function to calculate and update totals (subtotal, shipping, total)
    const calculateTotals = () => {
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        // Simple shipping logic: free shipping if subtotal is over $50, otherwise $5.00
        const shippingCost = subtotal >= 50 ? 0 : 5.00;
        const total = subtotal + shippingCost;

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = `$${shippingCost.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    };

    // Function to render all cart items in the UI
    const renderCart = () => {
        cartItemsContainer.innerHTML = ''; // Clear existing items

        if (cart.length === 0) {
            emptyCartMessage.classList.remove('hidden'); // Show empty cart message
        } else {
            emptyCartMessage.classList.add('hidden'); // Hide empty cart message
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('flex', 'items-center', 'justify-between', 'py-4', 'border-b', 'border-gray-200');
                cartItemElement.innerHTML = `
                    <div class="flex items-center space-x-4">
                        <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-md shadow-sm">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">${item.name}</h3>
                            <p class="text-gray-600">Price: $${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center">
                            <button class="quantity-minus px-3 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300 transition-colors" data-id="${item.id}">-</button>
                            <span class="px-4 py-1 bg-gray-100 border-t border-b border-gray-200 text-lg">${item.quantity}</span>
                            <button class="quantity-plus px-3 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300 transition-colors" data-id="${item.id}">+</button>
                        </div>
                        <p class="text-lg font-bold text-gray-900">$${(item.price * item.quantity).toFixed(2)}</p>
                        <button class="remove-item text-red-500 hover:text-red-700 transition-colors" data-id="${item.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        <button class="remove-item text-red-500 hover:text-red-700 transition-colors" data-id="${item.id}">
                        remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
        }
        calculateTotals(); // Always recalculate totals after rendering the cart
    };

    // --- Global Functions (Accessible from other HTML pages) ---

    // Function to add an item to the cart (called from product pages)
    window.addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++; // Increment quantity if item already exists
        } else {
            cart.push({ ...product, quantity: 1 }); // Add new item with quantity 1
        }
        saveCart(); // Save updated cart to local storage

        // Optional: Provide visual feedback or update a cart count here
        console.log("Cart updated:", cart);
    };

    // Function specifically for handling "Add to Cart" button clicks from product pages
    window.addToCartFromProductPage = (buttonElement) => {
        const product = {
            id: buttonElement.dataset.itemId,
            name: buttonElement.dataset.itemName,
            price: parseFloat(buttonElement.dataset.itemPrice),
            image: buttonElement.dataset.itemImage
        };
        window.addToCart(product);
        // You could add a more sophisticated notification here instead of an alert
        const alert = document.createElement('div');
        alert.textContent = 'Added to cart!';
        alert.style.position = 'fixed';
        alert.style.top = '1.5rem';
        alert.style.right = '1.5rem';
        alert.style.background = '#38a169';
        alert.style.color = '#fff';
        alert.style.padding = '0.75rem 1.5rem';
        alert.style.borderRadius = '0.5rem';
        alert.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
        alert.style.fontSize = '1rem';
        alert.style.zIndex = '9999';
        alert.style.opacity = '0';
        alert.style.transition = 'opacity 0.3s';

        document.body.appendChild(alert);
        setTimeout(() => { alert.style.opacity = '1'; }, 10);
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 300);
        }, 1800);
    };

    // --- Event Listeners ---

    // Event listener for quantity changes and item removal on the cart page
    // Using event delegation on the container for efficiency
    if (cartItemsContainer) { // Ensure this only runs on the cart.html page
        cartItemsContainer.addEventListener('click', (event) => {
            const target = event.target;
            const itemId = target.dataset.id; // Get the item ID from the data-id attribute

            if (!itemId) return; // Exit if no data-id is found

            const item = cart.find(i => i.id === itemId);

            if (target.classList.contains('quantity-plus')) {
                if (item) {
                    item.quantity++;
                    saveCart();
                    renderCart(); // Re-render to update UI and totals
                }
            } else if (target.classList.contains('quantity-minus')) {
                if (item && item.quantity > 1) { // Prevent quantity from going below 1
                    item.quantity--;
                    saveCart();
                    renderCart(); // Re-render to update UI and totals
                }
            } else if (target.closest('.remove-item')) { // Use closest to check parent for the class
                cart = cart.filter(cartItem => cartItem.id !== itemId); // Remove item from array
                saveCart();
                renderCart(); // Re-render to update UI and totals
            }else if (target.closest('.remove-item')) { // Checks if the clicked element or its parent is the remove button
                cart = cart.filter(cartItem => cartItem.id !== itemId); // Removes the item from the array
                saveCart(); // Saves the updated cart to local storage
                renderCart(); // Re-renders the cart to update the UI and totals
            }
        });
    }


    // Initial render when the page loads
    // This ensures the cart displays correctly when cart.html is opened
    // and calculates totals if any items are already in local storage.
    if (document.getElementById('cart-items-container')) { // Only render if on cart page
        renderCart();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');

    // Helper to update cart count badge
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
    }

    // Update cart count on page load
    updateCartCount();

    // Patch addToCart to update count after adding
    const originalAddToCart = window.addToCart;
    window.addToCart = function(product) {
        originalAddToCart(product);
        updateCartCount();
    };

    // Also update count after cart changes on cart page
    if (document.getElementById('cart-items-container')) {
        const observer = new MutationObserver(updateCartCount);
        observer.observe(document.getElementById('cart-items-container'), { childList: true, subtree: true });
    }
});