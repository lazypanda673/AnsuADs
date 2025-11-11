import { showLogin } from './components/login.js';
import { showDashboard } from './components/dashboard.js';
import { getAuthUser } from './utils/auth.js';

// Router configuration
const routes = {
    '/': 'dashboard',
    '/login': 'login',
    '/dashboard': 'dashboard'
};

// Initialize app
function init() {
    const user = getAuthUser();
    
    // Check if user is authenticated
    if (!user && window.location.pathname !== '/login') {
        navigate('/login');
        return;
    }
    
    if (user && window.location.pathname === '/login') {
        navigate('/dashboard');
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
        case 'login':
            showLogin(app);
            break;
        case 'dashboard':
            showDashboard(app);
            break;
        default:
            showDashboard(app);
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
