/**
 * Portfolio Website Resume Section JavaScript
 * Author: John Doe
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    // ===== VARIABLES =====
    const requestOtpBtn = document.getElementById('request-otp');
    const verifyOtpBtn = document.getElementById('verify-otp');
    const resendOtpBtn = document.getElementById('resend-otp');
    const downloadBtn = document.getElementById('download-btn');
    const otpForm = document.getElementById('otp-form');
    const otpVerification = document.getElementById('otp-verification');
    const resumeDownload = document.getElementById('resume-download');
    const emailInput = document.getElementById('email');
    const otpInputs = document.querySelectorAll('.otp-input');

    // ===== FUNCTIONS =====

    /**
     * Initialize the resume section functionality
     */
    function initResume() {
        // Add event listeners to buttons
        if (requestOtpBtn) {
            requestOtpBtn.addEventListener('click', requestOtp);
        }
        
        if (verifyOtpBtn) {
            verifyOtpBtn.addEventListener('click', verifyOtp);
        }
        
        if (resendOtpBtn) {
            resendOtpBtn.addEventListener('click', resendOtp);
        }
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', downloadResume);
        }
        
        // Initialize OTP inputs
        initOtpInputs();
    }

    /**
     * Handle OTP request
     */
    function requestOtp() {
        // Validate email
        if (!emailInput.value || !validateEmail(emailInput.value)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        requestOtpBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        requestOtpBtn.disabled = true;
        
        // Simulate API call to send OTP
        setTimeout(() => {
            // Switch to OTP verification view
            otpForm.classList.remove('active');
            otpForm.classList.add('hidden');
            otpVerification.classList.remove('hidden');
            otpVerification.classList.add('active');
            
            // Reset button state
            requestOtpBtn.innerHTML = 'Request OTP';
            requestOtpBtn.disabled = false;
            
            // Show success message
            showToast('OTP sent to your email', 'success');
            
            // Focus on first OTP input
            if (otpInputs.length > 0) {
                otpInputs[0].focus();
            }
        }, 2000);
    }

    /**
     * Handle OTP verification
     */
    function verifyOtp() {
        // Get OTP value
        let otpValue = '';
        otpInputs.forEach(input => {
            otpValue += input.value;
        });
        
        // Validate OTP
        if (otpValue.length !== 4) {
            showToast('Please enter a valid OTP', 'error');
            return;
        }
        
        // Show loading state
        verifyOtpBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
        verifyOtpBtn.disabled = true;
        
        // Simulate API call to verify OTP
        setTimeout(() => {
            // For demo purposes, any 4-digit OTP works
            
            // Switch to resume download view
            otpVerification.classList.remove('active');
            otpVerification.classList.add('hidden');
            resumeDownload.classList.remove('hidden');
            resumeDownload.classList.add('active');
            
            // Reset button state
            verifyOtpBtn.innerHTML = 'Verify';
            verifyOtpBtn.disabled = false;
            
            // Show success message
            showToast('OTP verified successfully', 'success');
        }, 2000);
    }

    /**
     * Handle OTP resend
     */
    function resendOtp() {
        // Show loading state
        resendOtpBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        resendOtpBtn.disabled = true;
        
        // Simulate API call to resend OTP
        setTimeout(() => {
            // Reset button state
            resendOtpBtn.innerHTML = 'Resend OTP';
            resendOtpBtn.disabled = false;
            
            // Reset OTP inputs
            otpInputs.forEach(input => {
                input.value = '';
            });
            
            // Focus on first OTP input
            if (otpInputs.length > 0) {
                otpInputs[0].focus();
            }
            
            // Show success message
            showToast('New OTP sent to your email', 'success');
        }, 2000);
    }

    /**
     * Handle resume download
     * @param {Event} e - The click event
     */
    function downloadResume(e) {
        e.preventDefault();
        
        // Show loading state
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
        downloadBtn.disabled = true;
        
        // Simulate download preparation
        setTimeout(() => {
            // Reset button state
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Resume';
            downloadBtn.disabled = false;
            
            // Create a fake download by creating a temporary link
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'john_doe_resume.pdf';
            link.click();
            
            // Show success message
            showToast('Resume download started', 'success');
        }, 2000);
    }

    /**
     * Initialize and handle OTP input fields
     */
    function initOtpInputs() {
        if (otpInputs.length === 0) return;
        
        otpInputs.forEach((input, index) => {
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
            toastContainer.classList.add('toast-container');
            document.body.appendChild(toastContainer);
            
            // Add CSS styles
            const style = document.createElement('style');
            style.textContent = `
                .toast-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 9999;
                }
                .toast {
                    padding: 12px 20px;
                    margin-bottom: 10px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    color: white;
                    animation: toast-in 0.3s ease, toast-out 0.3s ease 2.7s forwards;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                .toast i {
                    margin-right: 10px;
                }
                .toast-success {
                    background-color: #56d364;
                }
                .toast-error {
                    background-color: #f85149;
                }
                .toast-info {
                    background-color: #58a6ff;
                }
                @keyframes toast-in {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes toast-out {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.classList.add('toast', `toast-${type}`);
        
        // Add icon based on type
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';
        
        toast.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
        
        // Add toast to container
        toastContainer.appendChild(toast);
        
        // Remove toast after animation completes
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    /**
     * Validate email format
     * @param {string} email - The email to validate
     * @returns {boolean} - Whether the email is valid
     */
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Initialize resume section
    initResume();
});
