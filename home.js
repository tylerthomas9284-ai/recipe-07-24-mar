// Home Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load Categories
    loadCategories();
    
    // Load Recipes
    loadRecipes();
    
    // Load Blog Posts
    loadBlogPosts();
    
    // Initialize Hero Slider
    initHeroSlider();
});

function loadCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    
    grid.innerHTML = categories.map((category, index) => `
        <div class="category-card animate-fade-in" style="animation-delay: ${index * 0.1}s">
            <a href="category.html?slug=${category.slug}">
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
    `).join('');
}

function loadRecipes() {
    const grid = document.getElementById('recipesGrid');
    if (!grid) return;
    
    const popularRecipes = recipes.slice(0, 9);
    
    grid.innerHTML = popularRecipes.map((recipe, index) => `
        <div class="recipe-card animate-scale-in" style="animation-delay: ${index * 0.1}s">
            <a href="recipe.html?id=${recipe.id}">
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
    `).join('');
}

function loadBlogPosts() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;
    
    grid.innerHTML = blogPosts.map((post, index) => `
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
    `).join('');
}

function initHeroSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const totalSlides = slides.length;
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide();
        });
    });
    
    // Auto-advance slides
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide();
    }, 5000);
    
    function updateSlide() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}
