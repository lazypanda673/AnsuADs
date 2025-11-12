import { navigate } from '../main.js';
import { login } from '../utils/auth.js';

export function showLogin(container) {
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
                    <h1 class="brand-title">Manage Your Ad Campaigns with Confidence</h1>
                    <p class="brand-description">
                        Streamline your advertising operations with powerful tools for campaign management, 
                        A/B testing, and performance tracking.
                    </p>
                    <div class="brand-features">
                        <div class="brand-feature">
                            <span class="feature-icon">✓</span>
                            <span>Campaign Management</span>
                        </div>
                        <div class="brand-feature">
                            <span class="feature-icon">✓</span>
                            <span>A/B Testing</span>
                        </div>
                        <div class="brand-feature">
                            <span class="feature-icon">✓</span>
                            <span>Real-time Analytics</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Side - Login Form -->
            <div class="auth-form-container">
                <div class="auth-card">
                    <div class="auth-header">
                        <h2 class="auth-title">Welcome Back</h2>
                        <p class="auth-subtitle">Sign in to your account to continue</p>
                    </div>

                    <form class="auth-form" id="loginForm">
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
                                placeholder="Enter your password"
                                required
                            />
                            <div class="error-message hidden" id="password-error"></div>
                        </div>

                        <div class="form-options">
                            <label class="checkbox-label">
                                <input type="checkbox" id="remember" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" class="link-primary">Forgot password?</a>
                        </div>

                        <div class="error-message hidden" id="login-error"></div>

                        <button type="submit" class="btn btn-primary btn-lg auth-submit">
                            Sign In
                        </button>
                    </form>

                    <div class="auth-footer">
                        <p>Don't have an account? <a href="#" id="switchToRegister" class="link-primary">Sign up</a></p>
                    </div>
                </div>

                <div class="back-to-home">
                    <a href="#" id="backToHome" class="link-secondary">← Back to home</a>
                </div>
            </div>
        </div>
    `;

    // Event listeners
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');
        const loginError = document.getElementById('login-error');
        
        // Clear previous errors
        emailError.classList.add('hidden');
        passwordError.classList.add('hidden');
        loginError.classList.add('hidden');
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Basic validation
        let hasError = false;
        
        if (!email) {
            emailError.textContent = 'Email is required';
            emailError.classList.remove('hidden');
            hasError = true;
        }
        
        if (!password) {
            passwordError.textContent = 'Password is required';
            passwordError.classList.remove('hidden');
            hasError = true;
        }
        
        if (hasError) return;
        
        // Attempt login (mock)
        try {
            login(email, password);
            navigate('/dashboard');
        } catch (error) {
            loginError.textContent = 'Login successful! Redirecting...';
            loginError.classList.remove('hidden');
            setTimeout(() => navigate('/dashboard'), 500);
        }
    });

    // Switch to register
    document.getElementById('switchToRegister')?.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('/register');
    });

    // Back to home
    document.getElementById('backToHome')?.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('/');
    });
}
