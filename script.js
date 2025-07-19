// Product data - Easy to modify without technical knowledge
// Simply add, remove, or edit products in this array
// Note: Removed price and ratings to comply with Amazon Associates policies
const products = [
    {
        id: 1,
        name: "Wireless Noise Cancelling Headphones",
        image: "https://via.placeholder.com/300x200/667eea/ffffff?text=Headphones",
        description: "Premium wireless headphones with active noise cancellation. Perfect for travel, work, or relaxation. Great for commuting and focus work.",
        amazonUrl: "https://amazon.com/dp/YOUR-AFFILIATE-LINK-1",
        category: "Electronics",
        features: ["Active Noise Cancellation", "Wireless Connectivity", "Long Battery Life"]
    },
    {
        id: 2,
        name: "Smart Fitness Tracker",
        image: "https://via.placeholder.com/300x200/764ba2/ffffff?text=Fitness+Tracker",
        description: "Track your health and fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS. Perfect companion for your fitness journey.",
        amazonUrl: "https://amazon.com/dp/YOUR-AFFILIATE-LINK-2",
        category: "Health & Fitness",
        features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant"]
    },
    {
        id: 3,
        name: "Portable Bluetooth Speaker",
        image: "https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Speaker",
        description: "Waterproof portable speaker with amazing sound quality. Perfect for outdoor adventures and parties. Compact design with powerful audio.",
        amazonUrl: "https://amazon.com/dp/YOUR-AFFILIATE-LINK-3",
        category: "Electronics",
        features: ["Waterproof Design", "Bluetooth 5.0", "Portable"]
    },
    {
        id: 4,
        name: "Ergonomic Office Chair",
        image: "https://via.placeholder.com/300x200/4ecdc4/ffffff?text=Office+Chair",
        description: "Comfortable ergonomic chair designed for long work sessions. Adjustable height and lumbar support for better posture and comfort.",
        amazonUrl: "https://amazon.com/dp/YOUR-AFFILIATE-LINK-4",
        category: "Office",
        features: ["Ergonomic Design", "Lumbar Support", "Adjustable Height"]
    },
    {
        id: 5,
        name: "Stainless Steel Water Bottle",
        image: "https://via.placeholder.com/300x200/45b7d1/ffffff?text=Water+Bottle",
        description: "Double-wall insulated water bottle that keeps drinks at the perfect temperature. Durable stainless steel construction for everyday use.",
        amazonUrl: "https://amazon.com/dp/YOUR-AFFILIATE-LINK-5",
        category: "Lifestyle",
        features: ["Double-Wall Insulation", "Stainless Steel", "Leak-Proof"]
    },
    {
        id: 6,
        name: "LED Desk Lamp",
        image: "https://via.placeholder.com/300x200/96ceb4/ffffff?text=Desk+Lamp",
        description: "Adjustable LED desk lamp with multiple brightness levels and color temperatures. USB charging port included for convenience.",
        amazonUrl: "https://amazon.com/dp/YOUR-AFFILIATE-LINK-6",
        category: "Office",
        features: ["LED Technology", "Adjustable Brightness", "USB Charging Port"]
    }
];

// Amazon Associate ID - Replace with your actual Associate ID
const AMAZON_ASSOCIATE_ID = "your-associate-id-20";

// Function to add Amazon Associate ID to URL
function addAssociateId(url) {
    if (url.includes('amazon.com') && AMAZON_ASSOCIATE_ID !== "your-associate-id-20") {
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}tag=${AMAZON_ASSOCIATE_ID}`;
    }
    return url;
}

// Function to create product card HTML
function createProductCard(product) {
    const affiliateUrl = addAssociateId(product.amazonUrl);
    
    // Create features list if available
    const featuresHTML = product.features ? 
        `<ul class="product-features">
            ${product.features.map(feature => `<li>✓ ${feature}</li>`).join('')}
        </ul>` : '';
    
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            ${featuresHTML}
            <div class="product-actions">
                <a href="${affiliateUrl}" target="_blank" rel="noopener noreferrer" class="amazon-button">
                    Check Price on Amazon
                </a>
                <p class="affiliate-notice">As an Amazon Associate, we earn from qualifying purchases.</p>
            </div>
        </div>
    `;
}

// Function to load products from JSON file or fallback to inline data
async function loadProductsFromJSON() {
    try {
        const response = await fetch('./products.json');
        if (response.ok) {
            const jsonProducts = await response.json();
            return jsonProducts;
        } else {
            console.log('JSON file not found, using inline products');
            return products;
        }
    } catch (error) {
        console.log('Error loading JSON, using inline products:', error);
        return products;
    }
}

// Function to load and display products
async function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    
    if (!productGrid) {
        console.error('Product grid element not found');
        return;
    }
    
    // Show loading spinner
    productGrid.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    
    try {
        // Load products from JSON file or use inline data
        const productsData = await loadProductsFromJSON();
        
        // Create product cards
        const productsHTML = productsData.map(product => createProductCard(product)).join('');
        productGrid.innerHTML = productsHTML;
        
        // Add click tracking for analytics (optional)
        trackProductViews();
        
        console.log(`Loaded ${productsData.length} products successfully`);
    } catch (error) {
        console.error('Error loading products:', error);
        productGrid.innerHTML = '<div class="error">Failed to load products. Please refresh the page.</div>';
    }
}

// Function to track product views (for analytics)
function trackProductViews() {
    const amazonButtons = document.querySelectorAll('.amazon-button');
    amazonButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // You can add Google Analytics or other tracking here
            console.log(`Product ${products[index].name} clicked`);
            
            // Optional: Send analytics event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'affiliate_link',
                    event_label: products[index].name,
                    value: 1
                });
            }
        });
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupSmoothScrolling();
    
    // Add any additional initialization code here
    console.log('BiGMaN website loaded successfully!');
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        products,
        generateStars,
        addAssociateId,
        createProductCard
    };
}
