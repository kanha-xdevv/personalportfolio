/**
 * Contact form functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    initContact();
});

function initContact() {
    setupFormValidation();
    setupFormSubmission();
    addTypingEffects();
    
    // Initialize toast container
    if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
}

/**
 * Set up real-time form validation
 */
function setupFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    // Convert regular inputs to enhanced inputs with validation icons
    inputs.forEach(input => {
        // Skip submit button
        if (input.type === 'submit') return;
        
        const formGroup = input.parentElement;
        
        // If the formGroup is already set up with validation, skip
        if (formGroup.querySelector('.validation-icon')) return;
        
        // Create input wrapper if not exists
        let inputWrapper = formGroup.querySelector('.input-wrapper');
        if (!inputWrapper) {
            inputWrapper = document.createElement('div');
            inputWrapper.className = 'input-wrapper';
            
            // Move the input to the wrapper
            input.parentNode.insertBefore(inputWrapper, input);
            inputWrapper.appendChild(input);
            
            // Add focus background
            const focusBg = document.createElement('div');
            focusBg.className = 'input-focus-bg';
            if (input.tagName === 'TEXTAREA') {
                focusBg.classList.add('textarea-bg');
            }
            inputWrapper.appendChild(focusBg);
            
            // Add error message element
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            inputWrapper.appendChild(errorMessage);
            
            // Update input class
            input.classList.add('form-input');
        }
        
        // Add validation icon
        const validationIcon = document.createElement('div');
        validationIcon.className = 'validation-icon';
        validationIcon.innerHTML = `
            <i class="fas fa-check-circle success-icon"></i>
            <i class="fas fa-times-circle error-icon"></i>
        `;
        formGroup.appendChild(validationIcon);
        
        // Add event listeners
        input.addEventListener('focus', () => {
            formGroup.classList.add('focus');
        });
        
        input.addEventListener('blur', () => {
            formGroup.classList.remove('focus');
            validateInput(input, true);
        });
        
        input.addEventListener('input', () => {
            validateInput(input);
            updateSubmitButtonState();
        });
    });
}

/**
 * Validate individual input field
 * @param {Element} input - The input element to validate
 * @param {boolean} isFinal - Whether this is a final validation (e.g., on blur)
 */
function validateInput(input, isFinal = false) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    const value = input.value.trim();
    
    // Remove previous validation states
    formGroup.classList.remove('success', 'error');
    
    // Skip validation if the field is empty and not final validation
    if (!value && !isFinal) {
        return;
    }
    
    // Validate based on input type or name
    if (input.name === 'name' || input.id === 'name') {
        if (!value) {
            showError(input, errorElement, 'Name is required');
        } else if (value.length < 2) {
            showError(input, errorElement, 'Name must be at least 2 characters');
        } else {
            showSuccess(input);
        }
    } else if (input.name === 'email' || input.id === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            showError(input, errorElement, 'Email is required');
        } else if (!emailRegex.test(value)) {
            showError(input, errorElement, 'Please enter a valid email address');
        } else {
            showSuccess(input);
        }
    } else if (input.name === 'subject' || input.id === 'subject') {
        if (!value && isFinal) {
            showError(input, errorElement, 'Subject is required');
        } else if (value && value.length < 4) {
            showError(input, errorElement, 'Subject must be at least 4 characters');
        } else if (value) {
            showSuccess(input);
        }
    } else if (input.name === 'message' || input.id === 'message') {
        if (!value && isFinal) {
            showError(input, errorElement, 'Message is required');
        } else if (value && value.length < 10) {
            showError(input, errorElement, 'Message must be at least 10 characters');
        } else if (value) {
            showSuccess(input);
        }
    }
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
    
    if (formGroup.classList.contains('shake')) {
        formGroup.classList.remove('shake');
        setTimeout(() => {
            formGroup.classList.add('shake');
        }, 10);
    } else {
        formGroup.classList.add('shake');
    }
}

/**
 * Show success for an input field
 * @param {Element} input - The input element
 */
function showSuccess(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
    formGroup.classList.add('pulse');
    
    // Remove pulse animation after it completes
    setTimeout(() => {
        formGroup.classList.remove('pulse');
    }, 500);
}

/**
 * Update submit button state based on form validity
 */
function updateSubmitButtonState() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const inputs = form.querySelectorAll('input:not([type="submit"]), textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        // Check if required fields have value
        if (input.required && !input.value.trim()) {
            isValid = false;
        }
        
        // Check if any field has error
        if (input.closest('.form-group').classList.contains('error')) {
            isValid = false;
        }
    });
    
    if (isValid) {
        submitBtn.classList.remove('disabled');
        submitBtn.disabled = false;
    } else {
        submitBtn.classList.add('disabled');
        submitBtn.disabled = true;
    }
}

/**
 * Set up form submission with animation
 */
function setupFormSubmission() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Create a wrapper for the submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    // Skip if already wrapped
    if (submitBtn.parentElement.classList.contains('form-submit-wrapper')) return;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'form-submit-wrapper';
    submitBtn.parentNode.insertBefore(wrapper, submitBtn);
    wrapper.appendChild(submitBtn);
    
    // Create animation container
    const animContainer = document.createElement('div');
    animContainer.className = 'submit-animation-container hidden';
    animContainer.innerHTML = `
        <div class="submit-animation-circle"></div>
        <div class="submit-animation-ring"></div>
        <div class="submit-animation-message">Sending message...</div>
    `;
    wrapper.appendChild(animContainer);
    
    // Add form submission event
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show animation
        submitBtn.classList.add('hidden');
        animContainer.classList.remove('hidden');
        
        // Simulate form submission
        setTimeout(() => {
            // Show success
            animContainer.classList.add('success');
            animContainer.querySelector('.submit-animation-message').textContent = 'Message sent successfully!';
            
            // Show toast notification
            showToast('Your message has been sent successfully!', 'success');
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitBtn.classList.remove('hidden');
                animContainer.classList.add('hidden');
                animContainer.classList.remove('success');
                
                // Reset validation styles
                form.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('success', 'error');
                });
                
                // Disable submit button after reset
                submitBtn.classList.add('disabled');
                submitBtn.disabled = true;
            }, 2000);
        }, 2000);
    });
}

/**
 * Add typing effects to form inputs
 */
function addTypingEffects() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Skip submit button
        if (input.type === 'submit') return;
        
        input.addEventListener('input', function() {
            // Add typewriter sound effect (optional)
            // playTypewriterSound();
            
            // Add cursor animation effect
            if (!input.classList.contains('typing')) {
                input.classList.add('typing');
                setTimeout(() => {
                    input.classList.remove('typing');
                }, 100);
            }
        });
    });
}

/**
 * Show toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of toast (success, error, info)
 */
function showToast(message, type = 'info') {
    // Get or create toast container
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
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    
    // Create toast content
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${icon} toast-icon"></i>
            <div class="toast-message">${message}</div>
        </div>
        <div class="toast-progress"></div>
    `;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Setup progress bar animation
    const progress = toast.querySelector('.toast-progress');
    let width = 100;
    const duration = 5000; // 5 seconds
    const interval = 10;
    const step = (interval / duration) * 100;
    
    const timer = setInterval(() => {
        width -= step;
        progress.style.width = width + '%';
        
        if (width <= 0) {
            clearInterval(timer);
            removeToast(toast);
        }
    }, interval);
    
    // Add click to dismiss
    toast.addEventListener('click', () => {
        clearInterval(timer);
        removeToast(toast);
    });
    
    // Auto remove after duration
    setTimeout(() => {
        if (document.body.contains(toast)) {
            clearInterval(timer);
            removeToast(toast);
        }
    }, duration);
}

/**
 * Remove toast with animation
 * @param {Element} toast - The toast element to remove
 */
function removeToast(toast) {
    toast.classList.remove('show');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}