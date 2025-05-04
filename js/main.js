/**
 * Portfolio Website Main JavaScript
 * Author: John Doe
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    // ===== VARIABLES =====
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('nav a, .footer-links a');
    const sections = document.querySelectorAll('.section');
    const loadingContainer = document.querySelector('.loading-container');
    let isScrolling = false;

    // ===== FUNCTIONS =====

    /**
     * Initialize the portfolio website
     */
    function init() {
        // Start with loading animation
        setTimeout(function() {
            document.body.classList.add('loaded');
            
            // Animate skill bars after loading
            animateSkillBars();
            
            // Initialize scroll animations
            initScrollAnimations();
            
            // Add menu toggle for mobile
            addMobileMenuToggle();

            // Add code brackets to timeline items
            addCodeDecoration();
        }, 2000);

        // Initialize background particles
        initParticles();
        
        // Add event listeners
        setupEventListeners();
    }

    /**
     * Add code-style decorations to elements
     */
    function addCodeDecoration() {
        // Add code brackets to timeline content
        const timelineContents = document.querySelectorAll('.timeline-content');
        timelineContents.forEach(content => {
            const startBracket = document.createElement('span');
            startBracket.classList.add('code-bracket-start');
            startBracket.textContent = '{';
            
            const endBracket = document.createElement('span');
            endBracket.classList.add('code-bracket-end');
            endBracket.textContent = '}';
            
            content.appendChild(startBracket);
            content.appendChild(endBracket);
        });

        // Wrap navigation link text in spans for hover effects
        const navItems = document.querySelectorAll('header nav a');
        navItems.forEach(item => {
            const text = item.textContent;
            item.innerHTML = `<span>${text}</span>`;
        });
    }

    /**
     * Setup all event listeners
     */
    function setupEventListeners() {
        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', smoothScroll);
        });

        // Scroll events
        window.addEventListener('scroll', handleScroll);

        // Back to top button
        backToTopBtn.addEventListener('click', scrollToTop);

        // Form submission for contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactFormSubmit);
        }
    }

    /**
     * Handle scroll events
     */
    function handleScroll() {
        if (!isScrolling) {
            isScrolling = true;
            
            // Execute at 15fps instead of 60fps
            setTimeout(function() {
                // Change header background on scroll
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Show/hide back to top button
                if (window.scrollY > 500) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
                
                // Animate timeline items on scroll
                animateTimelineOnScroll();
                
                // Check and animate elements with data-scroll attribute
                animateOnScroll();
                
                isScrolling = false;
            }, 66); // ~15fps
        }
    }

    /**
     * Smooth scroll to section when clicking navigation links
     * @param {Event} e - The click event
     */
    function smoothScroll(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            const navMenu = document.querySelector('nav ul');
            const menuToggle = document.querySelector('.menu-toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Scroll to top when back to top button is clicked
     */
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Initialize background particles
     */
    function initParticles() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach(particle => {
            // Random size
            const size = Math.floor(Math.random() * 80) + 20; // 20-100px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            const xPos = Math.floor(Math.random() * 100);
            const yPos = Math.floor(Math.random() * 100);
            particle.style.top = `${yPos}%`;
            particle.style.left = `${xPos}%`;
            
            // Random opacity
            const opacity = (Math.random() * 0.15) + 0.05; // 0.05-0.2
            particle.style.opacity = opacity;
            
            // Random animation duration
            const duration = Math.floor(Math.random() * 5) + 5; // 5-10s
            particle.style.animationDuration = `${duration}s`;
            
            // Random animation delay
            const delay = Math.random() * 5; // 0-5s
            particle.style.animationDelay = `${delay}s`;
        });
    }

    /**
     * Add mobile menu toggle functionality
     */
    function addMobileMenuToggle() {
        const navigation = document.querySelector('nav');
        const navUl = navigation.querySelector('ul');
        
        // Create toggle button if it doesn't exist
        if (!document.querySelector('.menu-toggle')) {
            const toggleBtn = document.createElement('div');
            toggleBtn.classList.add('menu-toggle');
            
            for (let i = 0; i < 3; i++) {
                const span = document.createElement('span');
                toggleBtn.appendChild(span);
            }
            
            navigation.insertBefore(toggleBtn, navUl);
            
            // Add event listener to toggle button
            toggleBtn.addEventListener('click', function() {
                this.classList.toggle('active');
                navUl.classList.toggle('active');
            });
        }
    }

    /**
     * Initialize scroll animations for elements with data-scroll attribute
     */
    function initScrollAnimations() {
        // Add data-scroll attributes to elements that should animate on scroll
        document.querySelectorAll('.section-title').forEach(title => {
            title.setAttribute('data-scroll', 'fade-in');
        });
        
        document.querySelectorAll('.about-text p').forEach(p => {
            p.setAttribute('data-scroll', 'fade-in');
        });
        
        document.querySelectorAll('.skill-category').forEach(category => {
            category.setAttribute('data-scroll', 'fade-in');
        });
        
        document.querySelectorAll('.contact-info, .contact-form').forEach(el => {
            el.setAttribute('data-scroll', 'fade-in');
        });
        
        document.querySelectorAll('.profile-card').forEach((card, index) => {
            if (index % 2 === 0) {
                card.setAttribute('data-scroll', 'fade-left');
            } else {
                card.setAttribute('data-scroll', 'fade-right');
            }
        });
        
        // Initial check for visible elements
        animateOnScroll();
    }

    /**
     * Animate elements when they come into view on scroll
     */
    function animateOnScroll() {
        const scrollElements = document.querySelectorAll('[data-scroll]');
        
        scrollElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('scrolled');
            }
        });
    }

    /**
     * Animate timeline items when they come into view
     */
    function animateTimelineOnScroll() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            if (isElementInViewport(item)) {
                // Add staggered animation delay
                setTimeout(() => {
                    item.classList.add('animate');
                }, 150 * index);
            }
        });
    }

    /**
     * Check if an element is in the viewport
     * @param {Element} element - The DOM element to check
     * @returns {boolean} - Whether the element is in viewport
     */
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Element is partially visible
        return (
            rect.top <= windowHeight * 0.8 && 
            rect.bottom >= 0
        );
    }

    /**
     * Handle contact form submission
     * @param {Event} e - The submit event
     */
    function handleContactFormSubmit(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('contact-email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Simple validation
        if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // In a real application, you would send the form data to a server
        // For demo purposes, we'll just show a success message
        const form = e.target;
        form.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for your message. I'll get back to you as soon as possible.</p>
            </div>
        `;
    }

    // Initialize the application
    init();
});
