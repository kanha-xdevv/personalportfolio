/**
 * Contact form functionality
 */

function initContact() {
    setupFormValidation();
    setupFormSubmission();
    addTypingEffects();
}

/**
 * Set up real-time form validation
 */
function setupFormValidation() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    const inputs = [nameInput, emailInput, subjectInput, messageInput];
    
    // Add validation on input
    inputs.forEach(input => {
        input.addEventListener('input', () => validateInput(input));
        input.addEventListener('blur', () => validateInput(input, true));
    });
}

/**
 * Validate individual input field
 * @param {Element} input - The input element to validate
 * @param {boolean} isFinal - Whether this is a final validation (e.g., on blur)
 */
function validateInput(input, isFinal = false) {
    const inputId = input.id;
    const inputValue = input.value.trim();
    const errorElement = document.getElementById(`${inputId}-error`);
    const formGroup = input.closest('.form-group');
    
    // Clear previous error state
    formGroup.classList.remove('error', 'success');
    errorElement.textContent = '';
    
    // Skip validation if empty and not final
    if (inputValue === '' && !isFinal) {
        return;
    }
    
    // Validate based on input type
    if (inputValue === '') {
        showError(input, errorElement, 'This field is required');
    } else {
        switch (inputId) {
            case 'name':
                if (inputValue.length < 2) {
                    showError(input, errorElement, 'Name must be at least 2 characters');
                } else {
                    showSuccess(input);
                }
                break;
                
            case 'contact-email':
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(inputValue)) {
                    showError(input, errorElement, 'Please enter a valid email address');
                } else {
                    showSuccess(input);
                }
                break;
                
            case 'subject':
                if (inputValue.length < 4) {
                    showError(input, errorElement, 'Subject must be at least 4 characters');
                } else {
                    showSuccess(input);
                }
                break;
                
            case 'message':
                if (inputValue.length < 10) {
                    showError(input, errorElement, 'Message must be at least 10 characters');
                } else {
                    showSuccess(input);
                }
                break;
        }
    }
    
    // Update submit button state based on all inputs
    updateSubmitButtonState();
}

/**
 * Show error for an input field
 * @param {Element} input - The input element
 * @param {Element} errorElement - The error message element
 * @param {string} message - The error message
 */
function showError(input, errorElement, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    errorElement.textContent = message;
    
    // Add error animation
    formGroup.classList.add('shake');
    setTimeout(() => {
        formGroup.classList.remove('shake');
    }, 500);
}

/**
 * Show success for an input field
 * @param {Element} input - The input element
 */
function showSuccess(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
    
    // Add success animation
    formGroup.classList.add('pulse');
    setTimeout(() => {
        formGroup.classList.remove('pulse');
    }, 500);
}

/**
 * Update submit button state based on form validity
 */
function updateSubmitButtonState() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const inputs = Array.from(form.querySelectorAll('.form-input'));
    
    const allFilled = inputs.every(input => input.value.trim() !== '');
    const noErrors = document.querySelectorAll('.form-group.error').length === 0;
    
    if (allFilled && noErrors) {
        submitBtn.removeAttribute('disabled');
        submitBtn.classList.remove('disabled');
    } else {
        submitBtn.setAttribute('disabled', 'disabled');
        submitBtn.classList.add('disabled');
    }
}

/**
 * Set up form submission with animation
 */
function setupFormSubmission() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const submitAnimation = document.getElementById('submit-animation');
    const submitMessage = document.getElementById('submit-message');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all inputs first
        const inputs = Array.from(form.querySelectorAll('.form-input'));
        inputs.forEach(input => validateInput(input, true));
        
        // Check if form has any errors
        if (document.querySelectorAll('.form-group.error').length > 0) {
            return; // Don't submit if there are errors
        }
        
        // Hide submit button and show animation
        submitBtn.classList.add('hidden');
        submitAnimation.classList.remove('hidden');
        
        // Simulate form submission (would be replaced with actual API call)
        setTimeout(() => {
            submitMessage.textContent = 'Sending...';
        }, 500);
        
        setTimeout(() => {
            // Show success message
            submitAnimation.classList.add('success');
            submitMessage.textContent = 'Message Sent!';
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitAnimation.classList.remove('success', 'hidden');
                submitBtn.classList.remove('hidden');
                submitAnimation.classList.add('hidden');
                
                // Reset form group classes
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('success');
                });
                
                // Show thank you message
                showToast('Thank you for your message! I will get back to you soon.', 'success');
            }, 2000);
        }, 2000);
    });
}

/**
 * Add typing effects to form inputs
 */
function addTypingEffects() {
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            formGroup.classList.add('focus');
        });
        
        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            formGroup.classList.remove('focus');
        });
    });
}

/**
 * Show toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of toast (success, error, info)
 */
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Set icon based on type
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    // Set toast content
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">${icon}</div>
            <div class="toast-message">${message}</div>
        </div>
        <div class="toast-progress"></div>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Auto remove after delay
    const progressBar = toast.querySelector('.toast-progress');
    let width = 100;
    const interval = setInterval(() => {
        width--;
        if (progressBar) progressBar.style.width = width + '%';
        
        if (width <= 0) {
            clearInterval(interval);
            toast.classList.remove('show');
            setTimeout(() => {
                toastContainer.removeChild(toast);
                
                // Remove container if empty
                if (toastContainer.children.length === 0) {
                    document.body.removeChild(toastContainer);
                }
            }, 300);
        }
    }, 30);
    
    // Close on click
    toast.addEventListener('click', () => {
        clearInterval(interval);
        toast.classList.remove('show');
        setTimeout(() => {
            toastContainer.removeChild(toast);
            
            // Remove container if empty
            if (toastContainer.children.length === 0) {
                document.body.removeChild(toastContainer);
            }
        }, 300);
    });
}

// Initialize contact functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', initContact);
