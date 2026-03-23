# FlavorVerse - Traditional Multi-Page Website

This is the **traditional multi-page** HTML/CSS/JavaScript version of FlavorVerse. Each page is a separate HTML file.

## 📁 File Structure

```
/public/
├── home.html          # Homepage with hero slider, categories, recipes, blog
├── about.html         # About Us page
├── contact.html       # Contact page
├── privacy.html       # Privacy Policy page
├── terms.html         # Terms & Conditions page
├── category.html      # Category listing page (dynamic)
├── recipe.html        # Recipe detail page (dynamic)
├── styles.css         # Complete stylesheet for all pages
├── data.js            # All recipe data, categories, blog posts
├── home.js            # Home page specific JavaScript
├── category.js        # Category page JavaScript
├── recipe.js          # Recipe detail page JavaScript
├── mobile-menu.js     # Shared mobile menu functionality
└── index.html         # SPA version (original)
```

## 🎯 Two Versions Available

### 1. **Traditional Multi-Page (NEW)** ← You're here!
- Separate HTML files for each page
- Standard server navigation
- Better for SEO
- Simpler structure
- Start with: `home.html`

### 2. **Single-Page Application (SPA)**
- All pages in one file using hash routing
- Client-side navigation
- Modern web app approach
- Start with: `index.html`

## 🚀 Quick Start

### Open in Browser
Simply open `home.html` in your web browser to view the traditional multi-page version.

### Using a Local Server (Recommended)

**Python:**
```bash
cd public
python -m http.server 8000
```

**Node.js:**
```bash
cd public
npx http-server -p 8000
```

**PHP:**
```bash
cd public
php -S localhost:8000
```

Then navigate to: `http://localhost:8000/home.html`

## 📄 Pages Overview

| Page | File | Description |
|------|------|-------------|
| **Home** | `home.html` | Hero slider, categories, popular recipes, features, blog |
| **About Us** | `about.html` | Mission, passion, values, community |
| **Contact** | `contact.html` | Contact information, business hours |
| **Privacy** | `privacy.html` | Privacy policy and data handling |
| **Terms** | `terms.html` | Terms and conditions |
| **Category** | `category.html?slug=breakfast` | Recipes filtered by category |
| **Recipe** | `recipe.html?id=1` | Full recipe with ingredients, instructions, tips |

## 🔗 Navigation Examples

### Static Pages
- Homepage: `home.html`
- About: `about.html`
- Contact: `contact.html`
- Privacy: `privacy.html`
- Terms: `terms.html`

### Dynamic Pages (using URL parameters)
- Breakfast Category: `category.html?slug=breakfast`
- Lunch Category: `category.html?slug=lunch`
- Dinner Category: `category.html?slug=dinner`
- Desserts Category: `category.html?slug=desserts`
- Healthy Recipes: `category.html?slug=healthy`
- Vegetarian/Vegan: `category.html?slug=vegetarian-vegan`
- International: `category.html?slug=international`

- Recipe #1: `recipe.html?id=1`
- Recipe #2: `recipe.html?id=2`
- etc...

## ✨ Features

✅ **Hero Slider** - Auto-advancing with manual dot navigation
✅ **Responsive Design** - Works on mobile, tablet, desktop
✅ **Mobile Menu** - Hamburger menu for mobile devices
✅ **CSS Animations** - Smooth fade-in and scale-in effects
✅ **Dynamic Content** - Category and recipe pages load based on URL params
✅ **SEO Friendly** - Separate HTML files for better search indexing
✅ **No Dependencies** - Pure HTML, CSS, and vanilla JavaScript

## 🎨 Customization

### Adding New Recipes

Edit `data.js`:
```javascript
recipes.push({
  id: '10',
  title: 'Your Recipe Name',
  description: 'Description here',
  image: 'image-url',
  category: 'breakfast', // Must match category slug
  prepTime: '15 mins',
  cookTime: '30 mins',
  servings: 4,
  difficulty: 'Easy',
  ingredients: ['Item 1', 'Item 2'],
  instructions: ['Step 1', 'Step 2'],
  tips: ['Tip 1', 'Tip 2']
});
```

### Adding New Categories

Edit `data.js`:
```javascript
categories.push({
  id: '8',
  name: 'Category Name',
  description: 'Description',
  image: 'image-url',
  slug: 'category-slug'
});
```

### Modifying Styles

Edit `styles.css`. Key sections:
- `:root` - Color variables
- `.header` - Navigation bar
- `.hero-slider` - Homepage slider
- `.recipe-card` - Recipe cards
- `.footer` - Footer styling

### Contact Information

Update in TWO places:
1. **Footer** - Each HTML file (or create footer.html as a template)
2. **Contact Page** - `contact.html`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technical Details

### Hero Slider
- 3 slides with fade transitions
- Auto-advances every 5 seconds
- Manual control via dots
- Pause on hover (can be added)

### Mobile Menu
- Toggles with hamburger icon
- Smooth slide-down animation
- Auto-closes on link click
- Touch-friendly

### Dynamic Pages
- Category page reads `?slug=` parameter
- Recipe page reads `?id=` parameter
- Falls back to "not found" if invalid

## 📦 Deployment

### Static Hosting Services

**GitHub Pages:**
1. Upload `/public/` contents to your repo
2. Enable GitHub Pages in settings
3. Access via `https://username.github.io/repo-name/home.html`

**Netlify:**
1. Drag and drop `/public/` folder
2. Done! Auto-deployed

**Vercel:**
1. Import `/public/` folder
2. Deploy instantly

**Firebase Hosting:**
```bash
firebase init hosting
# Set public directory to 'public'
firebase deploy
```

### Traditional Web Hosting
Simply upload all files from `/public/` to your web server's public directory.

## 🔄 Differences from SPA Version

| Feature | Multi-Page | SPA (index.html) |
|---------|-----------|------------------|
| **Navigation** | Traditional links | Hash-based routing |
| **SEO** | ✅ Better | ❌ Harder |
| **Page Load** | Full reload | Instant transitions |
| **URLs** | Clean URLs | Hash fragments |
| **Bookmarking** | ✅ Each page | Only hash URLs |
| **Browser History** | ✅ Standard | Hash-based |
| **Server Setup** | Any server | Any server |

## 📝 To-Do / Enhancements

Future improvements you could add:
- [ ] Search functionality
- [ ] Recipe rating system
- [ ] Print recipe button
- [ ] Share to social media
- [ ] Recipe comments
- [ ] Save favorites (localStorage)
- [ ] Ingredient calculator
- [ ] Nutrition information
- [ ] Recipe video support
- [ ] Dark mode toggle

## 🐛 Common Issues

**Images not loading:**
- Check internet connection (images are from Unsplash)
- Verify URLs in `data.js`

**Category/Recipe pages show "not found":**
- Ensure `data.js` is loaded before page scripts
- Check URL parameters are correct

**Mobile menu not working:**
- Verify `mobile-menu.js` is included
- Check browser console for errors

**Slider not advancing:**
- Ensure all slides have the `hero-slide` class
- Check `home.js` is loaded

## 📧 Support

For questions:
- Email: recipe@recipeblog.in
- Phone: +1-838-923-7372

---

**Enjoy your traditional multi-page FlavorVerse website!** 🍳✨

Built with ❤️ using pure HTML, CSS, and JavaScript
