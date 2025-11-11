import { navigate } from '../main.js';
import { login } from '../utils/auth.js';
import { validateEmail, validateRequired } from '../utils/validation.js';
import { createElement } from '../utils/dom.js';

export function showLogin(container) {
    const loginPage = createElement('div', { className: 'login-page' });
    
    const loginContainer = createElement('div', { className: 'login-container' });
    const loginCard = createElement('div', { className: 'login-card' });
    
    // Title
    const title = createElement('h1', { className: 'login-title' }, ['AnsuADs']);
    const subtitle = createElement('p', { className: 'login-subtitle' }, 
        ['Sign in to manage your advertising campaigns']);
    
    // Form
    const form = createElement('form', { className: 'login-form' });
    
    // Email field
    const emailGroup = createElement('div', { className: 'form-group' });
    const emailLabel = createElement('label', { className: 'form-label', for: 'email' }, ['Email']);
    const emailInput = createElement('input', {
        type: 'email',
        id: 'email',
        className: 'form-input',
        placeholder: 'Enter your email',
        required: true
    });
    const emailError = createElement('div', { className: 'error-message hidden', id: 'email-error' });
    
    emailGroup.appendChild(emailLabel);
    emailGroup.appendChild(emailInput);
    emailGroup.appendChild(emailError);
    
    // Password field
    const passwordGroup = createElement('div', { className: 'form-group' });
    const passwordLabel = createElement('label', { className: 'form-label', for: 'password' }, ['Password']);
    const passwordInput = createElement('input', {
        type: 'password',
        id: 'password',
        className: 'form-input',
        placeholder: 'Enter your password',
        required: true
    });
    const passwordError = createElement('div', { className: 'error-message hidden', id: 'password-error' });
    
    passwordGroup.appendChild(passwordLabel);
    passwordGroup.appendChild(passwordInput);
    passwordGroup.appendChild(passwordError);
    
    // Submit button
    const submitBtn = createElement('button', {
        type: 'submit',
        className: 'btn btn-primary login-submit'
    }, ['Sign In']);
    
    // Error message container
    const errorContainer = createElement('div', { className: 'login-error hidden', id: 'login-error' });
    
    // Form submit handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Clear previous errors
        emailError.classList.add('hidden');
        passwordError.classList.add('hidden');
        errorContainer.classList.add('hidden');
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Validate
        let hasError = false;
        
        if (!validateRequired(email)) {
            emailError.textContent = 'Email is required';
            emailError.classList.remove('hidden');
            hasError = true;
        } else if (!validateEmail(email)) {
            emailError.textContent = 'Please enter a valid email';
            emailError.classList.remove('hidden');
            hasError = true;
        }
        
        if (!validateRequired(password)) {
            passwordError.textContent = 'Password is required';
            passwordError.classList.remove('hidden');
            hasError = true;
        }
        
        if (hasError) return;
        
        // Attempt login
        try {
            login(email, password);
            navigate('/dashboard');
        } catch (error) {
            errorContainer.textContent = error.message;
            errorContainer.classList.remove('hidden');
        }
    });
    
    form.appendChild(emailGroup);
    form.appendChild(passwordGroup);
    form.appendChild(submitBtn);
    form.appendChild(errorContainer);
    
    loginCard.appendChild(title);
    loginCard.appendChild(subtitle);
    loginCard.appendChild(form);
    
    loginContainer.appendChild(loginCard);
    loginPage.appendChild(loginContainer);
    
    container.appendChild(loginPage);
}
