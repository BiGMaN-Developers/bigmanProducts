// Product data - Easy to modify without technical knowledge
// Simply add, remove, or edit products in this array
// Note: Removed price and ratings to comply with Amazon Associates policies
const products = [
    {
        "id": 1,
        "name": "Penguin Select Classics: Crime And Punishment: (Original, Unabridged Classic)",
        "image": "https://res.cloudinary.com/dasvhhtmm/image/upload/v1758433761/IMG_20250921_111751_swfq2j.jpg",
        "description": "Crime and Punishment stands as a testament to Dostoevsky’s unparalleled ability to explore the depths of the human psyche, the complexities of truth, guilt, and the search for redemption.",
        "amazonUrl": "https://amzn.to/46dLv43",
        "category": "Books",
        "features": ["Paperback", "Original, Unabridged Classic", "Dostoevsky"]
    },
    {
        "id": 2,
        "name": "TP-Link RE200 AC750 Wifi Range Extender | Up to 750Mbps",
        "image": "https://res.cloudinary.com/dasvhhtmm/image/upload/v1758433991/RE200_IN_01_normal_1608599870133l_noanz0.jpg",
        "description": "Boosts wireless signal to previously unreachable or hard-to-wire areas flawlessly.",
        "amazonUrl": "https://amzn.to/47U8YbU",
        "category": "Computers",
        "features": ["Dual Band", "750 Megabits Per Second", "Miniature size and wall-mounted design"]
    },
    {
        "id": 3,
        "name": "Madmix Assorted Raisins Combo: Paan and Mango",
        "image": "https://res.cloudinary.com/dasvhhtmm/image/upload/v1758433871/Raisins-box-1_ipk78o.webp",
        "description": "Assorted combo of paan and mango flavored raisins, offering a vegan, low-calorie, and sugar-free snacking option.",
        "amazonUrl": "https://amzn.to/3Vs0G3n",
        "category": "Grocery",
        "features": ["This is a Vegetarian product.", "Natural", "Premiun Raisins"]
    }
];

// Amazon Associate ID - Replace with your actual Associate ID
const AMAZON_ASSOCIATE_ID = "bigmandevelop-21";

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

