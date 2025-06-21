  // Load layout (nav + footer) once
  fetch('layout.html')
    .then(res => res.text())
    .then(layout => {
      document.getElementById('layout').innerHTML = layout;
      loadPage('home'); // default to home
    });

  // Function to load only body content
  function loadPage(page) {
    fetch(`${page}.html`)
      .then(res => res.text())
      .then(html => {
        document.getElementById('main-body').innerHTML = html;
      });
  }

// Search functionality
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
        // In a real application, this would perform an actual search
        alert(`Searching for: ${searchTerm}`);
        // You could redirect to a search results page or filter products
        // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
}

// Handle Enter key in search input
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// User menu toggle
function toggleUserMenu() {
    // In a real application, this would show a user menu dropdown
    alert('User menu clicked - would show login/account options');
}

// Shopping cart toggle
function toggleCart() {
    // In a real application, this would show the shopping cart
    alert('Shopping cart clicked - would show cart contents');
}

// Product view functionality
function viewProduct(productId) {
    // In a real application, this would navigate to the product page
    alert(`Viewing product: ${productId}`);
    // window.location.href = `/product/${productId}`;
}

// Learn more button functionality
function learnMore() {
    // In a real application, this would navigate to a product details page
    alert('Learn More clicked - would show Xbox controller details');
    // window.location.href = '/products/xbox-wireless-controller';
}

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

// Initialize functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();

    // Add loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });

        img.addEventListener('error', function() {
            this.classList.add('error');
            // You could set a fallback image here
            // this.src = '/images/placeholder.jpg';
        });
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

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe all product articles for animation
document.querySelectorAll('article').forEach(article => {
    observer.observe(article);
});

function querySelector(selector) {
    return document.querySelector(selector);
}

