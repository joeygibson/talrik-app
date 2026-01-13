/**
 * Talrik Marketing Website - JavaScript
 *
 * Handles:
 * - Smooth scroll animations (Intersection Observer)
 * - Navigation scroll effects
 * - Mobile menu toggle
 * - Smooth scrolling for anchor links
 */

// ================================
// DOM READY
// ================================
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavbarScroll();
    initMobileMenu();
    initSmoothScroll();
    initDarkModeBadges();
});

// ================================
// SCROLL ANIMATIONS
// Uses Intersection Observer for performant scroll-triggered animations
// ================================
function initScrollAnimations() {
    // Select all elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Create intersection observer with threshold
    const observerOptions = {
        root: null, // Use viewport as root
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animation
                entry.target.classList.add('visible');

                // Optionally unobserve after animation (improves performance)
                // Uncomment if you don't want animations to replay on scroll
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each animated element
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ================================
// NAVBAR SCROLL EFFECTS
// Adds background blur and shadow when scrolling down
// ================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    // Throttle scroll events for better performance
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ================================
// MOBILE MENU TOGGLE
// Hamburger menu for mobile navigation
// ================================
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// Provides smooth scrolling experience for internal links
// ================================
function initSmoothScroll() {
    // Get all anchor links that point to page sections
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const targetElement = document.querySelector(href);

            if (targetElement) {
                e.preventDefault();

                // Get navbar height for offset
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;

                // Calculate target position with offset
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping (optional)
                history.pushState(null, null, href);
            }
        });
    });
}

// ================================
// PARALLAX EFFECT FOR HERO (Optional enhancement)
// Subtle parallax movement for hero background orbs
// ================================
function initParallax() {
    const orbs = document.querySelectorAll('.gradient-orb');

    if (orbs.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        orbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ================================
// COUNTER ANIMATION (For stats section)
// Animates numbers counting up when visible
// ================================
function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');

    if (stats.length === 0) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);

                if (isNaN(finalValue)) return;

                animateCounter(target, finalValue);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    const duration = 1000; // 1 second
    const start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);

        const current = Math.round(start + (target - start) * easeOut);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

// ================================
// UTILITY: Debounce function
// Prevents excessive function calls during events like scroll/resize
// ================================
function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ================================
// UTILITY: Throttle function
// Limits function execution to once per specified time period
// ================================
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ================================
// DARK MODE BADGE HANDLING
// Swaps App Store badges between black/white variants based on color scheme
// ================================
function initDarkModeBadges() {
    const badges = document.querySelectorAll('.app-store-badge img');

    if (badges.length === 0) return;

    // Check if dark mode is preferred
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to update badge URLs based on color scheme
    function updateBadges(isDark) {
        badges.forEach(badge => {
            const currentSrc = badge.src;
            if (isDark) {
                // Switch to white badges for dark mode
                badge.src = currentSrc.replace('/black/', '/white/');
            } else {
                // Switch to black badges for light mode
                badge.src = currentSrc.replace('/white/', '/black/');
            }
        });
    }

    // Initial check
    updateBadges(darkModeMediaQuery.matches);

    // Listen for changes in color scheme preference
    darkModeMediaQuery.addEventListener('change', (e) => {
        updateBadges(e.matches);
    });
}
