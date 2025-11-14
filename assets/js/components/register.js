import { navigate } from '../router.js';
import { register } from '../utils/auth.js';

export function showRegister() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="auth-page">
            <!-- Left Side - Branding -->
            <div class="auth-branding">
                <div class="branding-content">
                    <div class="brand-logo">
                        <span class="logo-icon">📊</span>
                        <span class="logo-text">AnsuADs</span>
                    </div>
                    <h1 class="brand-title">Start Managing Your Campaigns Today</h1>
                    <p class="brand-description">
                        Join thousands of marketers who trust AnsuADs for their advertising needs. 
                        Get started in minutes with our powerful platform.
                    </p>
                    <div class="brand-features">
                        <div class="brand-feature">
                            <span class="feature-icon">✓</span>
                            <span>Free to get started</span>
                        </div>
                        <div class="brand-feature">
                            <span class="feature-icon">✓</span>
                            <span>No credit card required</span>
                        </div>
                        <div class="brand-feature">
                            <span class="feature-icon">✓</span>
                            <span>Full feature access</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Side - Register Form -->
            <div class="auth-form-container">
                <div class="auth-card">
                    <div class="auth-header">
                        <h2 class="auth-title">Create Your Account</h2>
                        <p class="auth-subtitle">Get started with AnsuADs for free</p>
                    </div>

                    <form class="auth-form" id="registerForm">
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label" for="firstName">First Name</label>
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    class="form-input" 
                                    placeholder="John"
                                    required
                                />
                                <div class="error-message hidden" id="firstName-error"></div>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="lastName">Last Name</label>
                                <input 
                                    type="text" 
                                    id="lastName" 
                                    class="form-input" 
                                    placeholder="Doe"
                                    required
                                />
                                <div class="error-message hidden" id="lastName-error"></div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="email">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                class="form-input" 
                                placeholder="you@example.com"
                                required
                            />
                            <div class="error-message hidden" id="email-error"></div>
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                class="form-input" 
                                placeholder="At least 8 characters"
                                required
                            />
                            <div class="form-hint">Must be at least 8 characters long</div>
                            <div class="error-message hidden" id="password-error"></div>
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="confirmPassword">Confirm Password</label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                class="form-input" 
                                placeholder="Re-enter your password"
                                required
                            />
                            <div class="error-message hidden" id="confirmPassword-error"></div>
                        </div>

                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="terms" required />
                                <span>I agree to the <a href="#" class="link-primary">Terms of Service</a> and <a href="#" class="link-primary">Privacy Policy</a></span>
                            </label>
                            <div class="error-message hidden" id="terms-error"></div>
                        </div>

                        <div class="error-message hidden" id="register-error"></div>

                        <button type="submit" class="btn btn-primary btn-lg auth-submit">
                            Create Account
                        </button>
                    </form>

                    <div class="auth-footer">
                        <p>Already have an account? <a href="#" id="switchToLogin" class="link-primary">Sign in</a></p>
                    </div>
                </div>

                <div class="back-to-home">
                    <a href="#" id="backToHome" class="link-secondary">← Back to home</a>
                </div>
            </div>
        </div>
    `;

    // Event listeners
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const termsInput = document.getElementById('terms');
        
        const firstNameError = document.getElementById('firstName-error');
        const lastNameError = document.getElementById('lastName-error');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');
        const confirmPasswordError = document.getElementById('confirmPassword-error');
        const termsError = document.getElementById('terms-error');
        const registerError = document.getElementById('register-error');
        
        // Clear previous errors
        firstNameError.classList.add('hidden');
        lastNameError.classList.add('hidden');
        emailError.classList.add('hidden');
        passwordError.classList.add('hidden');
        confirmPasswordError.classList.add('hidden');
        termsError.classList.add('hidden');
        registerError.classList.add('hidden');
        
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const termsAccepted = termsInput.checked;
        
        // Validation
        let hasError = false;
        
        if (!firstName) {
            firstNameError.textContent = 'First name is required';
            firstNameError.classList.remove('hidden');
            hasError = true;
        }
        
        if (!lastName) {
            lastNameError.textContent = 'Last name is required';
            lastNameError.classList.remove('hidden');
            hasError = true;
        }
        
        if (!email) {
            emailError.textContent = 'Email is required';
            emailError.classList.remove('hidden');
            hasError = true;
        } else if (!email.includes('@')) {
            emailError.textContent = 'Please enter a valid email';
            emailError.classList.remove('hidden');
            hasError = true;
        }
        
        if (!password) {
            passwordError.textContent = 'Password is required';
            passwordError.classList.remove('hidden');
            hasError = true;
        } else if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordError.classList.remove('hidden');
            hasError = true;
        }
        
        if (!confirmPassword) {
            confirmPasswordError.textContent = 'Please confirm your password';
            confirmPasswordError.classList.remove('hidden');
            hasError = true;
        } else if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordError.classList.remove('hidden');
            hasError = true;
        }
        
        if (!termsAccepted) {
            termsError.textContent = 'You must accept the terms and conditions';
            termsError.classList.remove('hidden');
            hasError = true;
        }
        
        if (hasError) return;
        
        // Register user with password hashing
        try {
            await register(email, password, firstName, lastName);
            registerError.textContent = 'Account created successfully! Redirecting...';
            registerError.style.backgroundColor = '#d1fae5';
            registerError.style.color = '#065f46';
            registerError.classList.remove('hidden');
            setTimeout(() => navigate('/dashboard'), 1000);
        } catch (error) {
            registerError.textContent = error.message || 'Registration failed. Please try again.';
            registerError.classList.remove('hidden');
        }
    });

    // Switch to login
    document.getElementById('switchToLogin')?.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('/login');
    });

    // Back to home
    document.getElementById('backToHome')?.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('/');
    });
}
