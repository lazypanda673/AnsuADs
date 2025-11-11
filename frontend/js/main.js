import { showLogin } from './components/login.js';
import { showDashboard } from './components/dashboard.js';
import { showLanding } from './components/landing.js';
import { showRegister } from './components/register.js';
import { getAuthUser } from './utils/auth.js';

// Router configuration
const routes = {
    '/': 'landing',
    '/login': 'login',
    '/register': 'register',
    '/dashboard': 'dashboard'
};

// Initialize app
function init() {
    const user = getAuthUser();
    const path = window.location.pathname;
    
    // If user is logged in and on landing/login/register, redirect to dashboard
    if (user && (path === '/' || path === '/login' || path === '/register')) {
        navigate('/dashboard');
        return;
    }
    
    // If user is not logged in and trying to access dashboard, redirect to landing
    if (!user && path === '/dashboard') {
        navigate('/');
        return;
    }
    
    // Route to appropriate page
    router();
}

// Simple router
function router() {
    const path = window.location.pathname;
    const route = routes[path] || routes['/'];
    
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    switch (route) {
        case 'landing':
            showLanding();
            break;
        case 'login':
            showLogin(app);
            break;
        case 'register':
            showRegister();
            break;
        case 'dashboard':
            showDashboard(app);
            break;
        default:
            showLanding();
    }
}

// Navigate function
export function navigate(path) {
    window.history.pushState({}, '', path);
    router();
}

// Handle browser back/forward buttons
window.addEventListener('popstate', router);

// Start the app
init();
