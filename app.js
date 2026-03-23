// FlavorVerse - Main Application JavaScript

// Router Class
class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  register(path, handler) {
    this.routes[path] = handler;
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, ...params] = hash.split('/').filter(Boolean);
    const route = '/' + (path || '');
    
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Handle specific routes
    if (route === '/category' && params.length > 0) {
      this.routes['/category'](params[0]);
    } else if (route === '/recipe' && params.length > 0) {
      this.routes['/recipe'](params[0]);
    } else if (this.routes[route]) {
      this.routes[route]();
    } else {
      this.routes['/']();
    }
    
    this.currentRoute = route;
    this.updateActiveNavLinks();
    closeMobileMenu();
  }

  updateActiveNavLinks() {
    const hash = window.location.hash || '#/';
    const links = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === hash || (hash === '#/' && href === '#/')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

// Initialize Router
const router = new Router();

// Mobile Menu Functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
  mobileNav.classList.toggle('hidden');
  mobileNav.classList.toggle('open');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
}

function closeMobileMenu() {
  mobileNav.classList.add('hidden');
  mobileNav.classList.remove('open');
  menuIcon.classList.remove('hidden');
  closeIcon.classList.add('hidden');
}

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Utility Functions
function fadeIn(element, delay = 0) {
  setTimeout(() => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 50);
  }, delay);
}

function createHeroSlider() {
  let currentSlide = 0;
  const slides = heroSlides;
  
  const sliderHTML = `
    <div class="hero-slider">
      <div class="hero-slider-container" id="heroSliderContainer">
        ${slides.map((slide, index) => `
          <div class="hero-slide ${index === 0 ? 'active' : ''}" style="background-image: url('${slide.image}')">
            <div class="hero-overlay"></div>
            <div class="hero-content">
              <h1 class="hero-title">${slide.title}</h1>
              <p class="hero-description">${slide.description}</p>
              <div class="hero-buttons">
                <a href="#/category/breakfast" class="btn btn-primary">Explore Recipes</a>
                <a href="#/category/breakfast" class="btn btn-secondary">View Categories</a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="slider-dots">
        ${slides.map((_, index) => `
          <button class="slider-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>
        `).join('')}
      </div>
    </div>
  `;
  
  setTimeout(() => {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlide();
      });
    });
    
    // Auto-advance slides
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlide();
    }, 5000);
  }, 100);
  
  function updateSlide() {
    const slideElements = document.querySelectorAll('.hero-slide');
    const dotElements = document.querySelectorAll('.slider-dot');
    
    slideElements.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    
    dotElements.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  return sliderHTML;
}

// Page Components
const pages = {
  home: () => {
    const popularRecipes = recipes.slice(0, 9);
    
    return `
      ${createHeroSlider()}
      
      <!-- Recipe Categories Section -->
      <section id="categories" class="section bg-gray">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Explore Recipe Categories</h2>
            <p class="section-subtitle">Discover delicious recipes organized by category</p>
          </div>
          
          <div class="categories-grid">
            ${categories.map((category, index) => `
              <div class="category-card animate-fade-in" style="animation-delay: ${index * 0.1}s">
                <a href="#/category/${category.slug}">
                  <div class="category-card-image">
                    <img src="${category.image}" alt="${category.name}">
                    <div class="category-card-overlay">
                      <div class="category-card-content">
                        <h3 class="category-card-title">${category.name}</h3>
                        <p class="category-card-description">${category.description}</p>
                      </div>
                      <div class="category-card-badge">Explore →</div>
                    </div>
                  </div>
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
      
      <!-- Popular Recipes Section -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Popular Recipes</h2>
            <p class="section-subtitle">Our most loved and tested recipes</p>
          </div>
          
          <div class="recipes-grid">
            ${popularRecipes.map((recipe, index) => `
              <div class="recipe-card animate-scale-in" style="animation-delay: ${index * 0.1}s">
                <a href="#/recipe/${recipe.id}">
                  <div class="recipe-card-image">
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <div class="recipe-badge">${recipe.difficulty}</div>
                  </div>
                  <div class="recipe-card-content">
                    <h3 class="recipe-card-title">${recipe.title}</h3>
                    <p class="recipe-card-description">${recipe.description}</p>
                    <div class="recipe-card-footer">
                      <div class="recipe-time">
                        <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span>${recipe.cookTime}</span>
                      </div>
                      <span class="recipe-link-text">View Recipe →</span>
                    </div>
                  </div>
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
      
      <!-- Why Choose FlavorVerse Section -->
      <section class="section bg-gradient">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Why Choose FlavorVerse?</h2>
            <p class="section-subtitle">Your trusted partner in the kitchen</p>
          </div>
          
          <div class="features-grid">
            ${[
              { title: 'Easy Step-by-Step Recipes', description: 'Clear instructions that anyone can follow' },
              { title: 'Beginner Friendly', description: 'Perfect for those just starting their cooking journey' },
              { title: 'Tested & Trusted', description: 'Every recipe is tested multiple times for perfection' },
              { title: 'New Recipes Regularly', description: 'Fresh content added every week' },
            ].map((feature, index) => `
              <div class="feature-card animate-fade-in" style="animation-delay: ${index * 0.1}s">
                <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3 class="feature-title">${feature.title}</h3>
                <p class="feature-description">${feature.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
      
      <!-- Blog Section -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Latest from Our Blog</h2>
            <p class="section-subtitle">Tips, tricks, and culinary inspiration</p>
          </div>
          
          <div class="blog-grid">
            ${blogPosts.map((post, index) => `
              <div class="blog-card animate-fade-in" style="animation-delay: ${index * 0.1}s">
                <div class="blog-card-image">
                  <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="blog-card-content">
                  <h3 class="blog-card-title">${post.title}</h3>
                  <p class="blog-card-excerpt">${post.excerpt}</p>
                  <div class="blog-card-meta">
                    <div class="blog-meta-item">
                      <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span>${post.date}</span>
                    </div>
                    <div class="blog-meta-item">
                      <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      <span>${post.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  },

  about: () => {
    return `
      <div class="page-container">
        <div class="page-content-narrow">
          <div class="page-header">
            <h1 class="page-title">About FlavorVerse</h1>
            <p class="page-subtitle">Your culinary journey starts here</p>
          </div>
          
          <div class="content-section bg-gradient rounded-xl mb-8">
            <h2 class="content-title">Our Mission</h2>
            <p class="content-text">
              At FlavorVerse, we believe that cooking should be accessible, enjoyable, and rewarding for everyone. 
              Our mission is to inspire home cooks of all skill levels by providing tested, reliable recipes with 
              clear instructions that guarantee delicious results every time.
            </p>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg mb-8">
            <h2 class="content-title">Our Passion</h2>
            <p class="content-text mb-4">
              We are passionate about helping you create memorable meals that bring joy to your table. Whether 
              you're cooking for yourself, your family, or entertaining friends, we're here to make sure every 
              dish turns out perfectly.
            </p>
            <p class="content-text">
              Every recipe on FlavorVerse has been carefully tested and perfected by our team of culinary 
              enthusiasts. We understand that your time is valuable, which is why we focus on recipes that are 
              not only delicious but also practical and achievable in a home kitchen.
            </p>
          </div>
          
          <div class="values-grid">
            ${[
              { icon: 'heart', title: 'Made with Love', description: 'Every recipe is crafted with care and passion' },
              { icon: 'users', title: 'Community Driven', description: 'Inspired by home cooks like you' },
              { icon: 'award', title: 'Quality Assured', description: 'Tested multiple times for perfection' },
              { icon: 'sparkles', title: 'Always Fresh', description: 'New recipes added regularly' },
            ].map((value, index) => `
              <div class="value-card animate-fade-in" style="animation-delay: ${index * 0.1}s">
                <svg class="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  ${value.icon === 'heart' ? '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>' : ''}
                  ${value.icon === 'users' ? '<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>' : ''}
                  ${value.icon === 'award' ? '<><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>' : ''}
                  ${value.icon === 'sparkles' ? '<><path d="M12 3L14 10L21 12L14 14L12 21L10 14L3 12L10 10L12 3Z"/></>' : ''}
                </svg>
                <h3 class="value-title">${value.title}</h3>
                <p class="value-description">${value.description}</p>
              </div>
            `).join('')}
          </div>
          
          <div class="cta-section">
            <h2 class="cta-title">Join Our Community</h2>
            <p class="cta-text">
              Discover thousands of tested recipes and start cooking delicious meals at home today!
            </p>
          </div>
        </div>
      </div>
    `;
  },

  contact: () => {
    return `
      <div class="page-container">
        <div class="page-content-narrow">
          <div class="page-header">
            <h1 class="page-title">Get in Touch</h1>
            <p class="page-subtitle">We'd love to hear from you! Reach out with questions, feedback, or recipe suggestions.</p>
          </div>
          
          <div class="contact-grid">
            <div class="contact-card">
              <div class="contact-icon-wrapper bg-orange">
                <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <h3 class="contact-card-title">Phone</h3>
              <p class="contact-card-text">Call us during business hours</p>
              <a href="tel:+18389237372" class="contact-link">+1-838-923-7372</a>
            </div>
            
            <div class="contact-card">
              <div class="contact-icon-wrapper bg-pink">
                <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h3 class="contact-card-title">Email</h3>
              <p class="contact-card-text">Send us an email anytime</p>
              <a href="mailto:recipe@recipeblog.in" class="contact-link">recipe@recipeblog.in</a>
            </div>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg">
            <div class="content-header">
              <svg class="content-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <h2 class="content-title">Let's Connect!</h2>
            </div>
            <div class="content-body">
              <p class="content-text mb-4">
                Whether you have a question about a recipe, want to share your cooking success, or have 
                suggestions for new recipes you'd like to see, we're here to help!
              </p>
              <p class="content-text mb-6">
                Our team typically responds within 24-48 hours during business days. We value your feedback 
                and look forward to being part of your cooking journey.
              </p>
              <div class="business-hours">
                <p class="business-hours-title">Business Hours:</p>
                <p class="business-hours-item">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                <p class="business-hours-item">Saturday: 10:00 AM - 4:00 PM EST</p>
                <p class="business-hours-item">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  category: (slug) => {
    const category = categories.find(c => c.slug === slug);
    const categoryRecipes = recipes.filter(r => r.category === slug);
    
    if (!category) {
      return `
        <div class="page-container text-center">
          <h1 class="page-title">Category Not Found</h1>
          <p class="page-subtitle">The category you're looking for doesn't exist.</p>
          <a href="#/" class="btn btn-primary mt-8">Back to Home</a>
        </div>
      `;
    }
    
    return `
      <!-- Category Hero -->
      <div class="category-hero" style="background-image: url('${category.image}')">
        <div class="category-hero-overlay"></div>
        <div class="category-hero-content">
          <h1 class="category-hero-title">${category.name}</h1>
          <p class="category-hero-description">${category.description}</p>
          <p class="category-hero-count">
            ${categoryRecipes.length} ${categoryRecipes.length === 1 ? 'Recipe' : 'Recipes'} Available
          </p>
        </div>
      </div>
      
      <!-- Recipes Grid -->
      <section class="section">
        <div class="container">
          ${categoryRecipes.length > 0 ? `
            <div class="recipes-grid">
              ${categoryRecipes.map((recipe, index) => `
                <div class="recipe-card animate-scale-in" style="animation-delay: ${index * 0.1}s">
                  <a href="#/recipe/${recipe.id}">
                    <div class="recipe-card-image">
                      <img src="${recipe.image}" alt="${recipe.title}">
                      <div class="recipe-badge">${recipe.difficulty}</div>
                    </div>
                    <div class="recipe-card-content">
                      <h3 class="recipe-card-title">${recipe.title}</h3>
                      <p class="recipe-card-description">${recipe.description}</p>
                      <div class="recipe-card-footer">
                        <div class="recipe-time">
                          <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span>${recipe.cookTime}</span>
                        </div>
                        <span class="recipe-link-text">View Recipe →</span>
                      </div>
                    </div>
                  </a>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="text-center py-12">
              <p class="text-xl text-gray-600">
                No recipes available in this category yet. Check back soon!
              </p>
            </div>
          `}
        </div>
      </section>
    `;
  },

  recipe: (id) => {
    const recipe = recipes.find(r => r.id === id);
    
    if (!recipe) {
      return `
        <div class="page-container text-center">
          <h1 class="page-title">Recipe Not Found</h1>
          <p class="page-subtitle mb-8">The recipe you're looking for doesn't exist.</p>
          <a href="#/" class="btn btn-primary">Back to Home</a>
        </div>
      `;
    }
    
    const relatedRecipes = recipes
      .filter(r => r.category === recipe.category && r.id !== recipe.id)
      .slice(0, 3);
    
    return `
      <!-- Recipe Hero -->
      <div class="recipe-hero" style="background-image: url('${recipe.image}')">
        <div class="recipe-hero-overlay"></div>
        <div class="recipe-hero-content-wrapper">
          <div class="recipe-hero-content">
            <h1 class="recipe-hero-title">${recipe.title}</h1>
            <p class="recipe-hero-description">${recipe.description}</p>
          </div>
        </div>
      </div>
      
      <!-- Recipe Details -->
      <section class="section">
        <div class="container">
          <!-- Quick Info Cards -->
          <div class="recipe-info-grid">
            <div class="recipe-info-card">
              <svg class="recipe-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <p class="recipe-info-label">Prep Time</p>
              <p class="recipe-info-value">${recipe.prepTime}</p>
            </div>
            <div class="recipe-info-card">
              <svg class="recipe-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <p class="recipe-info-label">Cook Time</p>
              <p class="recipe-info-value">${recipe.cookTime}</p>
            </div>
            <div class="recipe-info-card">
              <svg class="recipe-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <p class="recipe-info-label">Servings</p>
              <p class="recipe-info-value">${recipe.servings}</p>
            </div>
            <div class="recipe-info-card">
              <svg class="recipe-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
                <line x1="6" y1="17" x2="18" y2="17"/>
              </svg>
              <p class="recipe-info-label">Difficulty</p>
              <p class="recipe-info-value">${recipe.difficulty}</p>
            </div>
          </div>
          
          <div class="recipe-detail-grid">
            <!-- Ingredients -->
            <div class="recipe-ingredients">
              <div class="recipe-section-card sticky">
                <h2 class="recipe-section-title">Ingredients</h2>
                <ul class="ingredient-list">
                  ${recipe.ingredients.map((ingredient, index) => `
                    <li class="ingredient-item">
                      <span class="ingredient-number">${index + 1}</span>
                      <span class="ingredient-text">${ingredient}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
            
            <!-- Instructions & Tips -->
            <div class="recipe-main">
              <!-- Instructions -->
              <div class="recipe-section-card mb-8">
                <h2 class="recipe-section-title">Instructions</h2>
                <ol class="instruction-list">
                  ${recipe.instructions.map((instruction, index) => `
                    <li class="instruction-item">
                      <span class="instruction-number">${index + 1}</span>
                      <p class="instruction-text">${instruction}</p>
                    </li>
                  `).join('')}
                </ol>
              </div>
              
              <!-- Tips -->
              <div class="tips-section">
                <div class="tips-header">
                  <svg class="tips-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                    <path d="M9 18h6"/>
                    <path d="M10 22h4"/>
                  </svg>
                  <h2 class="recipe-section-title">Tips & Variations</h2>
                </div>
                <ul class="tips-list">
                  ${recipe.tips.map(tip => `
                    <li class="tip-item">
                      <span class="tip-bullet">•</span>
                      <span class="tip-text">${tip}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          </div>
          
          <!-- Related Recipes -->
          ${relatedRecipes.length > 0 ? `
            <div class="related-recipes">
              <h2 class="related-recipes-title">You Might Also Like</h2>
              <div class="recipes-grid">
                ${relatedRecipes.map((relatedRecipe, index) => `
                  <div class="recipe-card animate-scale-in" style="animation-delay: ${index * 0.1}s">
                    <a href="#/recipe/${relatedRecipe.id}">
                      <div class="recipe-card-image">
                        <img src="${relatedRecipe.image}" alt="${relatedRecipe.title}">
                        <div class="recipe-badge">${relatedRecipe.difficulty}</div>
                      </div>
                      <div class="recipe-card-content">
                        <h3 class="recipe-card-title">${relatedRecipe.title}</h3>
                        <p class="recipe-card-description">${relatedRecipe.description}</p>
                        <div class="recipe-card-footer">
                          <div class="recipe-time">
                            <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <circle cx="12" cy="12" r="10"/>
                              <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            <span>${relatedRecipe.cookTime}</span>
                          </div>
                          <span class="recipe-link-text">View Recipe →</span>
                        </div>
                      </div>
                    </a>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </section>
    `;
  },

  privacy: () => {
    return `
      <div class="page-container">
        <div class="page-content-narrow">
          <div class="page-header mb-12">
            <h1 class="page-title">Privacy Policy</h1>
            <p class="text-gray-600">Last updated: January 23, 2026</p>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg mb-6">
            <h2 class="content-title">Introduction</h2>
            <p class="content-text">
              At FlavorVerse, we are committed to protecting your privacy and ensuring the security of your 
              personal information. This Privacy Policy explains how we collect, use, and safeguard your data 
              when you visit our website.
            </p>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg mb-6">
            <h2 class="content-title">Information We Collect</h2>
            <p class="content-text mb-4">
              We may collect the following types of information:
            </p>
            <ul class="content-list">
              <li>Usage data and browsing patterns</li>
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Contact information you voluntarily provide</li>
            </ul>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg mb-6">
            <h2 class="content-title">How We Use Your Information</h2>
            <p class="content-text mb-4">
              We use the collected information to:
            </p>
            <ul class="content-list">
              <li>Improve our website and user experience</li>
              <li>Provide customer support</li>
              <li>Send updates and newsletters (with your consent)</li>
              <li>Analyze website traffic and usage patterns</li>
            </ul>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg mb-6">
            <h2 class="content-title">Cookies</h2>
            <p class="content-text">
              We use cookies to enhance your browsing experience and analyze site traffic. Cookies are small 
              text files stored on your device that help us remember your preferences and understand how you 
              use our site. You can control cookie settings through your browser preferences.
            </p>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg mb-6">
            <h2 class="content-title">Data Security</h2>
            <p class="content-text">
              We implement appropriate security measures to protect your personal information from unauthorized 
              access, alteration, disclosure, or destruction. However, no method of transmission over the internet 
              is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg mb-6">
            <h2 class="content-title">Third-Party Links</h2>
            <p class="content-text">
              Our website may contain links to third-party sites. We are not responsible for the privacy 
              practices or content of these external sites. We encourage you to review their privacy policies.
            </p>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg mb-6">
            <h2 class="content-title">Your Rights</h2>
            <p class="content-text mb-4">
              You have the right to:
            </p>
            <ul class="content-list">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </div>
          
          <div class="content-section bg-gradient rounded-xl">
            <h2 class="content-title">Contact Us</h2>
            <p class="content-text">
              If you have any questions about this Privacy Policy or how we handle your data, please 
              contact us at <a href="mailto:recipe@recipeblog.in" class="text-link">recipe@recipeblog.in</a> or 
              call us at <a href="tel:+18389237372" class="text-link">+1-838-923-7372</a>.
            </p>
          </div>
        </div>
      </div>
    `;
  },

  terms: () => {
    return `
      <div class="page-container">
        <div class="page-content-narrow">
          <div class="page-header mb-12">
            <h1 class="page-title">Terms & Conditions</h1>
            <p class="text-gray-600">Last updated: January 23, 2026</p>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg mb-6">
            <h2 class="content-title">Acceptance of Terms</h2>
            <p class="content-text">
              By accessing and using FlavorVerse, you accept and agree to be bound by these Terms and Conditions. 
              If you do not agree to these terms, please do not use our website.
            </p>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg mb-6">
            <h2 class="content-title">Website Usage</h2>
            <p class="content-text mb-4">
              You agree to use this website only for lawful purposes and in a way that does not infringe the 
              rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
            </p>
            <p class="content-text">
              Prohibited behavior includes harassing or causing distress or inconvenience to any person, 
              transmitting obscene or offensive content, or disrupting the normal flow of dialogue within 
              our website.
            </p>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg mb-6">
            <h2 class="content-title">Content Ownership</h2>
            <p class="content-text">
              All content on FlavorVerse, including recipes, images, text, graphics, and logos, is the property 
              of FlavorVerse or its content suppliers and is protected by copyright laws. You may not reproduce, 
              distribute, or create derivative works from our content without explicit written permission.
            </p>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg mb-6">
            <h2 class="content-title">Recipe Disclaimer</h2>
            <p class="content-text mb-4">
              While we strive to provide accurate and tested recipes, individual results may vary. We are not 
              responsible for:
            </p>
            <ul class="content-list mb-4">
              <li>Allergic reactions to ingredients</li>
              <li>Food safety issues arising from improper food handling</li>
              <li>Variations in cooking equipment or ingredient quality</li>
              <li>Personal dietary restrictions or health conditions</li>
            </ul>
            <p class="content-text">
              Always consult with a healthcare professional regarding dietary concerns and follow proper food 
              safety guidelines when preparing recipes.
            </p>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg mb-6">
            <h2 class="content-title">User Contributions</h2>
            <p class="content-text">
              If you submit comments, suggestions, or other content to our website, you grant FlavorVerse 
              a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and 
              display such content.
            </p>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg mb-6">
            <h2 class="content-title">Limitation of Liability</h2>
            <p class="content-text">
              FlavorVerse, its owners, employees, and affiliates shall not be liable for any direct, indirect, 
              incidental, special, or consequential damages arising out of or in connection with your use of 
              the website or recipes.
            </p>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg mb-6">
            <h2 class="content-title">External Links</h2>
            <p class="content-text">
              Our website may contain links to third-party websites. These links are provided for your 
              convenience only. We do not endorse or accept responsibility for the content or practices of 
              these external sites.
            </p>
          </div>
          
          <div class="content-section bg-white rounded-xl shadow-lg mb-6">
            <h2 class="content-title">Changes to Terms</h2>
            <p class="content-text">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective 
              immediately upon posting to the website. Your continued use of the website after changes are posted 
              constitutes your acceptance of the modified terms.
            </p>
          </div>
          
          <div class="content-section bg-gradient rounded-xl">
            <h2 class="content-title">Contact Information</h2>
            <p class="content-text">
              For questions about these Terms and Conditions, please contact us 
              at <a href="mailto:recipe@recipeblog.in" class="text-link">recipe@recipeblog.in</a> or 
              call <a href="tel:+18389237372" class="text-link">+1-838-923-7372</a>.
            </p>
          </div>
        </div>
      </div>
    `;
  },
};

// Register routes
router.register('/', pages.home);
router.register('/about', pages.about);
router.register('/contact', pages.contact);
router.register('/privacy', pages.privacy);
router.register('/terms', pages.terms);
router.register('/category', pages.category);
router.register('/recipe', pages.recipe);

// Render function
function render(html) {
  const app = document.getElementById('app');
  app.innerHTML = html;
}

// Override router handleRoute to include render
const originalHandleRoute = router.handleRoute.bind(router);
router.handleRoute = function() {
  const hash = window.location.hash.slice(1) || '/';
  const [path, ...params] = hash.split('/').filter(Boolean);
  const route = '/' + (path || '');
  
  window.scrollTo(0, 0);
  
  let html = '';
  
  if (route === '/category' && params.length > 0) {
    html = pages.category(params[0]);
  } else if (route === '/recipe' && params.length > 0) {
    html = pages.recipe(params[0]);
  } else if (pages[route.slice(1)]) {
    html = pages[route.slice(1)]();
  } else {
    html = pages.home();
  }
  
  render(html);
  this.updateActiveNavLinks();
  closeMobileMenu();
};
