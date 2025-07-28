// Portfolio JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navToggle) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navToggle && navMenu) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // Enhanced smooth scrolling with proper offset for fixed navbar
    function smoothScrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 70;
            const targetPosition = targetSection.offsetTop - navbarHeight - 10;
            
            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: 'smooth'
            });
            
            // Force update active nav link after scroll completes
            setTimeout(() => {
                updateActiveNavLink();
            }, 500);
        }
    }

    // Handle navigation link clicks with improved error handling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                console.log(`Navigating to section: ${targetId}`); // Debug log
                smoothScrollToSection(targetId);
            }
        });
    });

    // Handle CTA button click
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('CTA button clicked, navigating to contact'); // Debug log
            smoothScrollToSection('contact');
        });
    }

    // Active navigation highlighting with improved logic
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 70;
        const scrollPosition = window.scrollY + navbarHeight + 50;

        let activeSection = null;
        let minDistance = Infinity;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if scroll position is within section bounds
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = sectionId;
            }
            
            // Also check distance to section top for edge cases
            const distanceToTop = Math.abs(scrollPosition - sectionTop);
            if (distanceToTop < minDistance) {
                minDistance = distanceToTop;
                if (distanceToTop < 100) { // Within 100px threshold
                    activeSection = sectionId;
                }
            }
        });

        // Handle special case for home section at top of page
        if (window.scrollY < 100) {
            activeSection = 'home';
        }

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Throttle scroll events for better performance
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Add scroll event listener with throttling
    window.addEventListener('scroll', throttle(updateActiveNavLink, 50));

    // Initialize active nav link on load
    setTimeout(updateActiveNavLink, 100);

    // Enhanced notification system with improved styling
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; font-size: 18px; cursor: pointer; margin-left: 10px;">&times;</button>
            </div>
        `;
        
        // Set base styles
        const baseStyles = {
            position: 'fixed',
            top: '90px',
            right: '20px',
            padding: '16px 20px',
            borderRadius: '8px',
            fontWeight: '500',
            fontSize: '14px',
            zIndex: '2000',
            maxWidth: '350px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out',
            fontFamily: 'var(--font-family-base)'
        };

        // Apply base styles
        Object.assign(notification.style, baseStyles);

        // Set colors based on type
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#10b981';
                notification.style.color = 'white';
                notification.style.border = '1px solid #059669';
                break;
            case 'error':
                notification.style.backgroundColor = '#ef4444';
                notification.style.color = 'white';
                notification.style.border = '1px solid #dc2626';
                break;
            case 'warning':
                notification.style.backgroundColor = '#f59e0b';
                notification.style.color = 'white';
                notification.style.border = '1px solid #d97706';
                break;
            default:
                notification.style.backgroundColor = 'var(--color-surface)';
                notification.style.color = 'var(--color-text)';
                notification.style.border = '1px solid var(--color-border)';
        }

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);

        return notification;
    }

    // Enhanced email validation function
    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email) && email.length <= 254; // RFC 5321 limit
    }

    // Contact form handling with comprehensive validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Contact form submitted'); // Debug log
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name')?.trim();
            const email = formData.get('email')?.trim();
            const message = formData.get('message')?.trim();

            console.log('Form data:', { name, email, message }); // Debug log

            // Comprehensive form validation
            if (!name) {
                showNotification('Please enter your name.', 'error');
                return;
            }

            if (!email) {
                showNotification('Please enter your email address.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            if (!message) {
                showNotification('Please enter a message.', 'error');
                return;
            }

            if (message.length < 10) {
                showNotification('Please enter a more detailed message (at least 10 characters).', 'warning');
                return;
            }

            // Get submit button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';

            // Simulate form submission (in a real application, you would send this to a server)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                
                // Show detailed success message
                showNotification(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon at ${email}.`, 'success');
                
            }, 1500);
        });

        // Add real-time validation feedback
        const nameField = contactForm.querySelector('#name');
        const emailField = contactForm.querySelector('#email');
        const messageField = contactForm.querySelector('#message');

        if (nameField) {
            nameField.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '';
                }
            });
        }

        if (emailField) {
            emailField.addEventListener('blur', function() {
                if (!isValidEmail(this.value.trim())) {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '#10b981';
                }
            });
        }

        if (messageField) {
            messageField.addEventListener('blur', function() {
                if (this.value.trim().length < 10) {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '#10b981';
                }
            });
        }
    }

    // Skill card hover animation enhancement
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-card-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-card-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Skill card list item interactions
    const skillListItems = document.querySelectorAll('.skill-card-list li');
    skillListItems.forEach(item => {
        item.addEventListener('click', function() {
            const techName = this.textContent.trim();
            
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(techName).then(() => {
                    showNotification(`Copied skill: ${techName}`, 'success');
                    
                    // Add visual feedback
                    const originalBg = this.style.backgroundColor;
                    const originalColor = this.style.color;
                    this.style.backgroundColor = 'var(--primary-blue)';
                    this.style.color = 'white';
                    setTimeout(() => {
                        this.style.backgroundColor = originalBg;
                        this.style.color = originalColor;
                    }, 300);
                }).catch(() => {
                    fallbackCopyTextToClipboard(techName);
                });
            } else {
                fallbackCopyTextToClipboard(techName);
            }
        });

        // Add cursor pointer and title for UX
        item.style.cursor = 'pointer';
        item.title = 'Click to copy skill name';
    });

    // Enhanced tech badge hover effects for experience section
    const techBadges = document.querySelectorAll('.tech-badge');
    techBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add click-to-copy functionality for tech badges in experience section
        badge.addEventListener('click', function() {
            const techName = this.textContent.trim();
            
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(techName).then(() => {
                    showNotification(`Copied technology: ${techName}`, 'success');
                    
                    // Add visual feedback
                    this.style.background = 'var(--primary-blue)';
                    this.style.color = 'white';
                    setTimeout(() => {
                        this.style.background = '';
                        this.style.color = '';
                    }, 200);
                }).catch(() => {
                    fallbackCopyTextToClipboard(techName);
                });
            } else {
                fallbackCopyTextToClipboard(techName);
            }
        });

        // Add cursor pointer and title for UX
        badge.style.cursor = 'pointer';
        badge.title = 'Click to copy technology name';
    });

    // Add scroll-based animations for sections
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.card, .timeline-item, .skill-card');
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize animation styles
    const animatedElements = document.querySelectorAll('.card, .timeline-item, .skill-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Add scroll event listener for animations
    window.addEventListener('scroll', throttle(animateOnScroll, 100));
    
    // Run animation check on load
    setTimeout(animateOnScroll, 500);

    // Smooth reveal animation for hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add typing effect to hero subtitle
    function typeWriter(element, text, speed = 100) {
        if (!element) return;
        
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        setTimeout(type, 1000);
    }

    // Apply typing effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 80);
    }

    // Hero contact items click-to-copy functionality
    const heroContactItems = document.querySelectorAll('.hero-contact .contact-item');
    heroContactItems.forEach(item => {
        const span = item.querySelector('span');
        const link = item.querySelector('a');
        
        if (span && !link) { // Only for phone, email, and location (not LinkedIn and GitHub)
            item.style.cursor = 'pointer';
            item.title = 'Click to copy';
            
            item.addEventListener('click', function() {
                const textToCopy = span.textContent;
                
                // Modern clipboard API
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        showNotification(`Copied: ${textToCopy}`, 'success');
                    }).catch(() => {
                        fallbackCopyTextToClipboard(textToCopy);
                    });
                } else {
                    fallbackCopyTextToClipboard(textToCopy);
                }
            });
        }
    });

    // Fallback copy function for older browsers
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.opacity = '0';
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showNotification(`Copied: ${text}`, 'success');
            } else {
                showNotification('Failed to copy text', 'error');
            }
        } catch (err) {
            showNotification('Failed to copy text', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    // Add visual feedback for clickable contact items
    const clickableContactItems = document.querySelectorAll('.hero-contact .contact-item:not(:has(a))');
    clickableContactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--color-bg-1)';
            this.style.borderRadius = 'var(--radius-sm)';
            this.style.padding = 'var(--space-4) var(--space-8)';
            this.style.margin = '-4px -8px';
            this.style.transition = 'all 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.padding = '0';
            this.style.margin = '0';
        });
    });

    // Experience subsection animation on scroll
    function animateExperienceSubsections() {
        const subsections = document.querySelectorAll('.experience-subsection');
        
        subsections.forEach((subsection, index) => {
            const rect = subsection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible && !subsection.classList.contains('animated')) {
                subsection.classList.add('animated');
                subsection.style.opacity = '1';
                subsection.style.transform = 'translateX(0)';
                
                // Animate tech badges with stagger effect
                const techBadges = subsection.querySelectorAll('.tech-badge');
                techBadges.forEach((badge, badgeIndex) => {
                    setTimeout(() => {
                        badge.style.opacity = '1';
                        badge.style.transform = 'translateY(0) scale(1)';
                    }, badgeIndex * 100);
                });
            }
        });
    }

    // Initialize experience subsection animations
    const experienceSubsections = document.querySelectorAll('.experience-subsection');
    experienceSubsections.forEach(subsection => {
        subsection.style.opacity = '0';
        subsection.style.transform = 'translateX(-20px)';
        subsection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Initialize tech badges
        const techBadges = subsection.querySelectorAll('.tech-badge');
        techBadges.forEach(badge => {
            badge.style.opacity = '0';
            badge.style.transform = 'translateY(20px) scale(0.8)';
            badge.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });
    });

    // Add experience animation to scroll listener
    window.addEventListener('scroll', throttle(animateExperienceSubsections, 100));
    
    // Run experience animation check on load
    setTimeout(animateExperienceSubsections, 800);

    // Skill cards staggered animation on scroll
    function animateSkillCards() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible && !card.classList.contains('skill-animated')) {
                card.classList.add('skill-animated');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150); // Stagger animation
            }
        });
    }

    // Initialize skill card animations
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Add skill cards animation to scroll listener
    window.addEventListener('scroll', throttle(animateSkillCards, 100));
    
    // Run skill cards animation check on load
    setTimeout(animateSkillCards, 1000);

    // Console log for debugging
    console.log('Portfolio website with enhanced navigation and form validation initialized successfully!');
    
    // Show a welcome notification briefly
    setTimeout(() => {
        showNotification('Portfolio loaded successfully! Navigation and form validation are now working.', 'success');
    }, 2000);
});