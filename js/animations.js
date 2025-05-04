/**
 * Portfolio Website Animation JavaScript
 * Author: John Doe
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    // ===== FUNCTIONS =====

    /**
     * Animate skill bars based on their data-percentage attribute
     */
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            
            // Trigger animation
            setTimeout(() => {
                bar.style.width = percentage + '%';
            }, 300);
        });
    }

    /**
     * Create animated background particles
     */
    function createParticles() {
        const backgroundAnimation = document.querySelector('.background-animation');
        
        // Remove existing particles
        const existingParticles = document.querySelectorAll('.particle');
        existingParticles.forEach(particle => particle.remove());
        
        // Create new particles
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
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
            
            backgroundAnimation.appendChild(particle);
        }
    }

    /**
     * Initialize typing animation for home section
     */
    function initTypingAnimation() {
        const textElement = document.querySelector('.animate-typing');
        
        if (!textElement) return;
        
        const text = textElement.textContent;
        textElement.textContent = '';
        textElement.style.display = 'block';
        
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                
                // Start cursor blinking after typing is complete
                const cursor = document.createElement('span');
                cursor.classList.add('typing-cursor');
                cursor.textContent = '|';
                textElement.appendChild(cursor);
            }
        }, 100);
    }

    /**
     * Handle loading animation and transition to main content
     */
    function handleLoadingAnimation() {
        const loadingContainer = document.querySelector('.loading-container');
        const logoPath = document.getElementById('logo-path');
        
        // Animate the SVG path drawing
        if (logoPath) {
            logoPath.style.strokeDasharray = '100';
            logoPath.style.strokeDashoffset = '100';
            
            setTimeout(() => {
                logoPath.style.transition = 'stroke-dashoffset 2s ease-in-out';
                logoPath.style.strokeDashoffset = '0';
            }, 500);
        }
        
        // Hide loading screen after animation completes
        setTimeout(() => {
            document.body.classList.add('loaded');
            
            // After loading is complete, trigger animations on visible elements
            animateVisibleElements();
        }, 2500);
    }

    /**
     * Animate elements that are initially visible
     */
    function animateVisibleElements() {
        // Animate home section elements
        document.querySelectorAll('.animate-text').forEach((el, index) => {
            el.style.animationDelay = `${0.2 * index}s`;
            el.style.animationPlayState = 'running';
        });
        
        // Trigger skill bar animations if in viewport
        if (isElementInViewport(document.getElementById('skills'))) {
            animateSkillBars();
        }
        
        // Trigger timeline animations if in viewport
        const journeySection = document.getElementById('journey');
        if (journeySection && isElementInViewport(journeySection)) {
            const timelineItems = journeySection.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, 150 * index);
            });
        }
    }

    /**
     * Check if an element is in the viewport
     * @param {Element} element - The DOM element to check
     * @returns {boolean} - Whether the element is in viewport
     */
    function isElementInViewport(element) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    /**
     * Initialize and handle OTP input fields in resume section
     */
    function initOtpInputs() {
        const otpInputs = document.querySelectorAll('.otp-input');
        
        if (otpInputs.length === 0) return;
        
        otpInputs.forEach((input, index) => {
            // Focus on first input by default
            if (index === 0) {
                setTimeout(() => input.focus(), 100);
            }
            
            // Auto-move to next input
            input.addEventListener('input', function() {
                if (this.value.length === 1) {
                    if (index < otpInputs.length - 1) {
                        otpInputs[index + 1].focus();
                    } else {
                        this.blur();
                    }
                }
            });
            
            // Handle backspace key
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && this.value === '' && index > 0) {
                    otpInputs[index - 1].focus();
                }
            });
            
            // Handle paste event
            input.addEventListener('paste', function(e) {
                e.preventDefault();
                const pasteData = e.clipboardData.getData('text');
                
                // If pasted data has enough characters
                if (pasteData.length >= otpInputs.length) {
                    otpInputs.forEach((input, i) => {
                        input.value = pasteData.charAt(i);
                    });
                    
                    // Focus on the last input
                    otpInputs[otpInputs.length - 1].focus();
                }
            });
        });
    }

    // ===== EVENT LISTENERS =====
    
    // Initialize loading animation
    handleLoadingAnimation();
    
    // Initialize OTP inputs
    initOtpInputs();
    
    // Make animation functions globally available
    window.animateSkillBars = animateSkillBars;
    window.createParticles = createParticles;
    window.initTypingAnimation = initTypingAnimation;
});
