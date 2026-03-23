# FlavorVerse - Vanilla HTML/CSS/JavaScript Version

This is the vanilla HTML, CSS, and JavaScript conversion of the FlavorVerse recipe website. All React dependencies have been removed and replaced with pure web technologies.

## Files Structure

```
/public/
├── index.html       # Main HTML file with header, footer, and app container
├── styles.css       # Complete stylesheet with all components and pages
├── data.js          # Recipe data, categories, blog posts, and hero slides
├── app.js           # Main application logic with routing and page rendering
└── README.md        # This file
```

## Features

✅ **Client-Side Routing** - Hash-based routing (e.g., #/, #/about, #/recipe/1)
✅ **Hero Slider** - Auto-advancing image carousel with dots navigation
✅ **Responsive Design** - Mobile-first design that works on all devices
✅ **Smooth Animations** - CSS animations for fade-in and scale effects
✅ **All Pages Included**:
  - Home (with hero slider, categories, popular recipes, features, blog)
  - About Us
  - Contact
  - Privacy Policy
  - Terms & Conditions
  - Category Pages (dynamic based on URL)
  - Recipe Detail Pages (dynamic based on URL)

## How to Use

### Option 1: Open Directly in Browser

1. Simply open `index.html` in your web browser
2. Navigate using the header links or by changing the URL hash

### Option 2: Use a Local Web Server (Recommended)

Using a local web server prevents potential CORS issues and provides a better development experience.

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open your browser to `http://localhost:8000`

## Navigation

The site uses hash-based routing. You can navigate to different pages using these URLs:

- **Home:** `#/` or `index.html`
- **About:** `#/about`
- **Contact:** `#/contact`
- **Privacy Policy:** `#/privacy`
- **Terms & Conditions:** `#/terms`
- **Category:** `#/category/{slug}` (e.g., `#/category/breakfast`)
- **Recipe:** `#/recipe/{id}` (e.g., `#/recipe/1`)

## Customization

### Adding New Recipes

Edit `data.js` and add new recipe objects to the `recipes` array:

```javascript
{
  id: '10',
  title: 'Your Recipe Name',
  description: 'A brief description',
  image: 'https://your-image-url.com/image.jpg',
  category: 'breakfast', // Must match a category slug
  prepTime: '15 mins',
  cookTime: '30 mins',
  servings: 4,
  difficulty: 'Easy', // Easy, Medium, or Hard
  ingredients: [
    'Ingredient 1',
    'Ingredient 2',
  ],
  instructions: [
    'Step 1 instruction',
    'Step 2 instruction',
  ],
  tips: [
    'Helpful tip 1',
    'Helpful tip 2',
  ],
}
```

### Adding New Categories

Edit `data.js` and add new category objects to the `categories` array:

```javascript
{
  id: '8',
  name: 'Category Name',
  description: 'Category description',
  image: 'https://your-image-url.com/image.jpg',
  slug: 'category-slug', // Used in URLs
}
```

### Modifying Styles

Edit `styles.css` to customize:
- Colors (defined in `:root` CSS variables)
- Layout and spacing
- Typography
- Component styles
- Animations

### Changing Contact Information

Contact info is hardcoded in two places:
1. **Footer** - in `index.html`
2. **Contact Page** - in `app.js` (pages.contact function)

Update both locations with your information.

## Browser Support

This vanilla version works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technical Details

### Routing System

The app uses a simple hash-based router implemented in `app.js`:

```javascript
// Route format: #/page
// Examples:
#/                    → Home page
#/about               → About page
#/category/breakfast  → Breakfast category
#/recipe/1            → Recipe with ID 1
```

### Hero Slider

The hero slider is implemented with:
- Pure CSS for smooth transitions
- JavaScript for auto-advancement (5 seconds)
- Dot navigation for manual control
- Responsive images

### Mobile Menu

Mobile menu functionality:
- Hamburger icon toggles mobile navigation
- Smooth slide-down animation
- Auto-closes when navigating to a new page
- Responsive breakpoint at 768px

## Performance

- **No external dependencies** - All code is self-contained
- **Lazy loading ready** - Images can be lazy-loaded with the `loading="lazy"` attribute
- **Minimal JavaScript** - Only ~500 lines of vanilla JS
- **CSS animations** - Hardware-accelerated transforms and opacity

## SEO Considerations

Since this is a client-side rendered single-page application:

1. Search engines may have difficulty indexing dynamic content
2. Each page doesn't have a unique URL (only hash fragments)
3. Meta tags are static

For production SEO:
- Consider server-side rendering
- Use proper URLs with server routing
- Add dynamic meta tags
- Implement a sitemap

## Deployment

To deploy this site:

1. Upload all files in `/public/` to your web server
2. Ensure `index.html` is served as the default page
3. No build process or compilation needed
4. Works on any static hosting service (GitHub Pages, Netlify, Vercel, etc.)

## License

This is a conversion of the FlavorVerse React application.
© 2026 FlavorVerse. All rights reserved.

## Support

For questions or issues with this vanilla version, please refer to the original React implementation or contact the development team.

---

**Enjoy your vanilla HTML/CSS/JavaScript FlavorVerse website!** 🍳✨
