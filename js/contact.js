/**
 * Contact Page JavaScript
 * Handles form submission and FAQ interactions
 */
document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initFaqToggle();
    initScrollToForm();
});

/**
 * Initialize contact form submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Normally, you would send this data to a backend server
            // Here we're just showing an alert for demonstration purposes
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
}

/**
 * Initialize FAQ toggle functionality
 */
function initFaqToggle() {
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    if (faqToggles.length) {
        faqToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                // Toggle active class on parent FAQ item
                const faqItem = toggle.closest('.faq-item');
                faqItem.classList.toggle('active');
                
                // Change icon based on state
                const icon = toggle.querySelector('i');
                if (icon.classList.contains('fa-chevron-down')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
                
                // Toggle visibility of answer
                const answer = faqItem.querySelector('.faq-answer');
                if (faqItem.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0';
                }
            });
        });
    }
}

/**
 * Initialize scroll to form functionality
 */
function initScrollToForm() {
    const scrollToFormBtn = document.querySelector('.scroll-to-form');
    
    if (scrollToFormBtn) {
        scrollToFormBtn.addEventListener('click', () => {
            const contactForm = document.querySelector('.contact-form-container');
            if (contactForm) {
                window.scrollTo({
                    top: contactForm.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Focus first form input after scrolling
                setTimeout(() => {
                    document.getElementById('name').focus();
                }, 800);
            }
        });
    }
}
