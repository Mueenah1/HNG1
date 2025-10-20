document.addEventListener('DOMContentLoaded', function(){
    const timeElement = document.querySelector('[data-testid="test-user-time"]');
    if (timeElement) {
        timeElement.textContent = Date.now();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let contactForm = document.getElementById('contact-form');
    if (contactForm) {
        let fullName = document.getElementById('fullName');
        let email = document.getElementById('email');
        let subject = document.getElementById('subject');
        let message = document.getElementById('message');
        let successMessage = document.getElementById('success-message');
        contactForm.addEventListener('submit', function(event){
            event.preventDefault();
            let isFormValid = validateForm();
            if (isFormValid) {
                successMessage.style.display = 'block';
                contactForm.style.display = 'none';
                setTimeout(function() {
                    successMessage.style.display = 'none';
                    contactForm.style.display = 'block';
                    contactForm.reset();
                }, 5000);
            }
        });

        let validateForm = function() {
            let isValid = true;
            isValid &= validateField(fullName, 'Full name is required.');
            isValid &= validateEmail();
            isValid &= validateField(subject, 'Subject is required.');
            isValid &= validateMessage();
            return isValid;
        };

        let validateField = function(field, errorMessage) {
            let errorElement = document.getElementById(`error-${field.id}`);
            if (field.value.trim() === '') {
                showError(field, errorElement, errorMessage);
                return false;
            } else {
                clearError(field, errorElement);
                return true;
            }
        };

        let validateEmail = function() {
            let errorElement = document.getElementById('error-email');
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email.value.trim() === '') {
                showError(email, errorElement, 'Email is required.');
                return false;
            } else if (!emailRegex.test(email.value)) {
                showError(email, errorElement, 'Please enter a valid email address (e.g., name@example.com).');
                return false;
            } else {
                clearError(email, errorElement);
                return true;
            }
        };

        let validateMessage = function() {
            let errorElement = document.getElementById('error-message');
            if (message.value.trim() === '') {
                showError(message, errorElement, 'Message is required.');
                return false;
            } else if (message.value.trim().length < 10) {
                showError(message, errorElement, 'Message must be at least 10 characters long.');
                return false;
            } else {
                clearError(message, errorElement);
                return true;
            }
        };

        let showError = function(field, errorElement, errorMessage) {
            field.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            field.setAttribute('aria-describedby', errorElement.id);
        };
        let clearError = function(field, errorElement) {
            field.classList.remove('error');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            field.removeAttribute('aria-describedby');
        };
    }
});
