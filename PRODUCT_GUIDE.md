# How to Add/Remove Products (Non-Technical Guide)

This guide will help you easily add or remove products from your BiGMaN affiliate website without any technical knowledge.

## 📝 Adding a New Product

### Step 1: Open the Products File
1. Go to your website files
2. Find the file named `products.json`
3. Open it in any text editor (Notepad works fine)

### Step 2: Copy an Existing Product
1. Find any existing product in the file
2. Copy everything from one `{` to its matching `}`
3. Paste it at the end, before the final `]`

### Step 3: Update the Information
Replace the example information with your new product:

```json
{
    "id": 7,
    "name": "Your New Product Name",
    "image": "https://your-image-url.com/image.jpg",
    "description": "Write a helpful description of your product here",
    "amazonUrl": "https://amazon.com/dp/YOUR-AMAZON-LINK",
    "category": "Electronics",
    "features": ["Feature 1", "Feature 2", "Feature 3"]
}
```

**Important**: Do NOT include prices, ratings, or reviews - these violate Amazon's policies!

### Step 4: Get Your Amazon Link
1. Go to Amazon Associates website
2. Search for your product
3. Click "Get Link"
4. Copy the affiliate link and paste it in `amazonUrl`

### Step 5: Save the File
1. Save the `products.json` file
2. Your new product will appear on your website automatically!

## 🗑️ Removing a Product

### Step 1: Find the Product
1. Open `products.json`
2. Find the product you want to remove
3. Look for the product name

### Step 2: Delete the Product
1. Delete everything from `{` to `}` for that product
2. Make sure to remove any extra commas
3. Save the file

## 🔧 Important Tips

### ID Numbers
- Each product needs a unique ID number
- When adding a new product, use the next available number
- When removing a product, you don't need to change other IDs

### Commas
- Put a comma after each `}` except the last one
- If you remove the last product, remove the comma from the new last product

### Images
- Use high-quality product images
- Make sure the image URL works (test it in your browser)
- Free placeholder images: https://via.placeholder.com/300x200

### Prices
- **DO NOT include prices** - Amazon doesn't allow affiliate sites to display prices
- Users will see current prices when they click to Amazon

### Ratings and Reviews
- **DO NOT include ratings or reviews** - Only Amazon can display these
- Focus on describing product features instead

### Features
- Use the `features` array to highlight key product benefits
- Example: `["Waterproof", "Long Battery", "Wireless"]`

## 📋 Example: Adding a New Product

Let's say you want to add a coffee maker:

1. **Find the last product** in your `products.json`
2. **Add a comma** after its closing `}`
3. **Add your new product**:

```json
    {
        "id": 7,
        "name": "Premium Coffee Maker",
        "image": "https://via.placeholder.com/300x200/8B4513/ffffff?text=Coffee+Maker",
        "description": "Programmable coffee maker with thermal carafe. Brews perfect coffee every time with advanced temperature control.",
        "amazonUrl": "https://amazon.com/dp/YOUR-COFFEE-MAKER-LINK",
        "category": "Kitchen",
        "features": ["Programmable", "Thermal Carafe", "Auto Shut-off"]
    }
```

## ❌ Common Mistakes to Avoid

1. **Missing Commas**: Every product except the last needs a comma after `}`
2. **Wrong Quotes**: Use straight quotes `"` not curly quotes `"`
3. **Missing Brackets**: Make sure every `{` has a matching `}`
4. **Broken Links**: Test your Amazon links before adding them

## ✅ Quick Checklist

Before saving your changes:
- [ ] Each product has a unique ID
- [ ] All quotes are straight quotes `"`
- [ ] Commas are in the right places
- [ ] Amazon links work
- [ ] Image URLs work
- [ ] No extra or missing brackets

## 🆘 If Something Goes Wrong

If your website stops working after making changes:

1. **Check for syntax errors** in your `products.json`
2. **Look for missing commas or quotes**
3. **Use an online JSON validator** to check your file
4. **Restore from backup** if you saved a copy

## 💡 Pro Tips

- **Test on mobile**: Always check how your products look on phones
- **Use good descriptions**: Help customers understand why they need the product
- **Update regularly**: Keep prices and information current
- **Quality over quantity**: Better to have fewer great products than many poor ones

---

**Need Help?** If you get stuck, the `README.md` file has more detailed technical information, or you can contact support at contact@bigman.com.
