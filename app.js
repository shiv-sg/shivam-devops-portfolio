// DevOps Portfolio JavaScript - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initNavigation();
    initMobileMenu();
    initBackToTop();
    initContactForm();
    initAnimations();
    initScrollEffects();
    initProfilePhoto();
});

// Theme Toggle Functionality - Fixed
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');
    
    // Set default theme to light
    let currentTheme = 'light';
    html.setAttribute('data-color-scheme', currentTheme);
    
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-color-scheme', currentTheme);
        
        if (icon) {
            icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
        
        // Add smooth transition for theme change
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

// Navigation Functionality - Fixed
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const heroGetInTouchBtn = document.querySelector('.hero-actions .btn--primary');
    const footerNavLinks = document.querySelectorAll('.footer-nav a');
    const sections = document.querySelectorAll('section[id]');
    
    // Function to scroll to section
    function scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const targetPosition = targetSection.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            closeMobileMenu();
        }
    }
    
    // Handle navigation links
    function handleNavClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            scrollToSection(targetId);
        }
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Handle footer nav links
    footerNavLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Handle "Get In Touch" button
    if (heroGetInTouchBtn) {
        heroGetInTouchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            scrollToSection('contact');
        });
    }
    
    // Highlight active navigation link based on scroll position
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', throttle(updateActiveLink, 100));
    
    // Set initial active link
    setTimeout(updateActiveLink, 100);
}

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Back to Top Functionality - Fixed
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        function toggleBackToTopBtn() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
        
        window.addEventListener('scroll', throttle(toggleBackToTopBtn, 100));
        
        // Handle click event
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Profile Photo Functionality - Fixed
function initProfilePhoto() {
    const profilePhoto = document.getElementById('profilePhoto');
    
    if (profilePhoto) {
        // Add click interaction with proper styling
        profilePhoto.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Add temporary scale animation without debugging artifacts
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add keyboard accessibility
        profilePhoto.setAttribute('tabindex', '0');
        profilePhoto.setAttribute('role', 'button');
        profilePhoto.setAttribute('aria-label', 'Profile photo of Shivam Gupta - Senior DevOps Engineer');
        
        profilePhoto.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add smooth hover transitions
        profilePhoto.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        profilePhoto.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formInputs = contactForm.querySelectorAll('.form-control');
    
    // Add real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm(this);
        }
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error styling
        clearFieldError(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
            isValid = false;
        }
        
        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address.';
                isValid = false;
            }
        }
        
        // Name validation
        if (fieldName === 'name' && value && value.length < 2) {
            errorMessage = 'Name must be at least 2 characters long.';
            isValid = false;
        }
        
        // Message validation
        if (fieldName === 'message' && value && value.length < 10) {
            errorMessage = 'Message must be at least 10 characters long.';
            isValid = false;
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        field.style.borderColor = 'var(--color-error)';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            color: var(--color-error);
            font-size: var(--font-size-sm);
            margin-top: var(--space-4);
        `;
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearFieldError(field) {
        field.classList.remove('error');
        field.style.borderColor = '';
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function submitForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('i');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        btnIcon.className = 'fas fa-spinner fa-spin';
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showFormMessage('success', 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnIcon.className = 'fas fa-paper-plane';
        }, 2000);
    }
    
    function showFormMessage(type, message) {
        // Remove existing message
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message status status--${type}`;
        messageDiv.style.cssText = `
            margin-top: var(--space-16);
            padding: var(--space-12) var(--space-16);
            border-radius: var(--radius-base);
            font-weight: var(--font-weight-medium);
        `;
        messageDiv.textContent = message;
        
        contactForm.appendChild(messageDiv);
        
        // Auto-remove success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageDiv && messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }
}

// Animation and Intersection Observer
function initAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: just add animate-in class to all elements
        const animateElements = document.querySelectorAll(`
            .skill-category,
            .experience-card,
            .project-card,
            .certification-card,
            .education-card,
            .profile-photo
        `);
        animateElements.forEach(el => el.classList.add('animate-in'));
        return;
    }
    
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .skill-category,
        .experience-card,
        .project-card,
        .certification-card,
        .education-card
    `);
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Special animation for profile photo
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.classList.add('animate-in');
    }
    
    // Animate skill progress bars when they come into view
    const skillProgressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.transform = 'scaleX(1)';
                        bar.style.transformOrigin = 'left';
                        bar.style.transition = 'transform 1s ease-out';
                    }, index * 100);
                });
                skillProgressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.skill-category').forEach(category => {
        // Initially hide progress bars
        const progressBars = category.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
            bar.style.transform = 'scaleX(0)';
        });
        
        skillProgressObserver.observe(category);
    });
}

// Scroll Effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class for navbar styling
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Optional: Hide/show navbar on scroll (disabled to prevent issues)
        // Keep navbar always visible for better UX
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', throttle(handleScroll, 100));
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Enhanced Interaction Features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add clean button click effects (no debugging artifacts)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Skip ripple for certain buttons
            if (this.classList.contains('theme-toggle') || 
                this.classList.contains('back-to-top') ||
                this.getAttribute('type') === 'submit') {
                return;
            }
            
            // Simple scale effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .navbar.scrolled {
            background: rgba(var(--color-surface), 0.98);
            backdrop-filter: blur(20px);
            box-shadow: var(--shadow-md);
        }
        
        .navbar {
            transition: all var(--duration-normal) var(--ease-standard);
        }
        
        .animate-in {
            animation: fadeInUp 0.6s var(--ease-standard) forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .profile-photo {
            animation: profileEntrance 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes profileEntrance {
            0% {
                transform: scale(0.8);
                opacity: 0;
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Tab navigation improvements
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

console.log('DevOps Portfolio with Profile Photo loaded successfully! 🚀');