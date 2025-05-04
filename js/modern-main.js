/**
 * Main JavaScript for Modern Developer Portfolio
 * Handles navigation, animations, and common functionality
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initBackToTop();
    initPreloader();
    initThemeToggle();
    
    // For homepage only
    if (document.querySelector('.typed-text')) {
        initTypingEffect();
    }
});

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.getElementById('navbar');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Change icon based on state
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // Set active nav link based on current page
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentLocation.endsWith(href)) {
            item.classList.add('active');
        } else if (currentLocation === '/' && href === 'index.html') {
            item.classList.add('active');
        }
    });
}

/**
 * Initialize scroll animations for elements with data-scroll attribute
 */
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    const elementInView = (el, scrollOffset = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) - scrollOffset);
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('in-view');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Initialize animation on load
    setTimeout(handleScrollAnimation, 100);
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize preloader
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500);
        });
    }
}

/**
 * Initialize theme toggle (dark/light mode)
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.nav-theme-toggle');
    const body = document.body;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        if (themeToggle) {
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    } else if (!currentTheme && !prefersDarkScheme.matches) {
        body.classList.add('light-mode');
        if (themeToggle) {
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            
            let theme = 'dark';
            if (body.classList.contains('light-mode')) {
                theme = 'light';
                themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
            } else {
                themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
            }
            
            localStorage.setItem('theme', theme);
        });
    }
}

/**
 * Initialize typing effect for hero section
 */
function initTypingEffect() {
    const typedTextElement = document.querySelector('.typed-text');
    
    if (typedTextElement) {
        const roles = [
            'Software Engineer',
            'Frontend Developer',
            'Backend Developer',
            'UI/UX Enthusiast',
            'Problem Solver'
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                // Deleting text
                typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // Typing text
                typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            // If completed typing the current role
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause before deleting
            }
            
            // If finished deleting the current role
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start the typing effect
        setTimeout(type, 1000);
    }
}