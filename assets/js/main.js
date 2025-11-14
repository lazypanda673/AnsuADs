import { showLogin } from './components/login.js';
import { showDashboard } from './components/dashboard-new.js';
import { showLanding } from './components/landing.js';
import { showRegister } from './components/register.js';
import { showCampaigns } from './components/campaigns.js';
import { showAnalytics } from './components/analytics.js';
import { showABTests } from './components/abTests.js';
import { showSettings } from './components/settings.js';
import { showProfile } from './components/profile.js';
import { getAuthUser } from './utils/auth.js';
import { navigate } from './router.js';

// Router configuration
const routes = {
    '/': 'landing',
    '/login': 'login',
    '/register': 'register',
    '/dashboard': 'dashboard',
    '/campaigns': 'campaigns',
    '/analytics': 'analytics',
    '/ab-tests': 'ab-tests',
    '/settings': 'settings',
    '/profile': 'profile'
};

// Initialize app
function init() {
    // Check if we were redirected from 404.html (for GitHub Pages)
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
        sessionStorage.removeItem('redirectPath');
        // Remove /AnsuADs prefix if present (GitHub Pages)
        const cleanPath = redirectPath.replace('/AnsuADs', '') || '/';
        window.history.replaceState({}, '', cleanPath);
    }
    
    const user = getAuthUser();
    let path = window.location.pathname;
    
    // Normalize path for both local and GitHub Pages
    if (path.startsWith('/AnsuADs')) {
        path = path.replace('/AnsuADs', '') || '/';
    }
    
    // If user is logged in and on landing/login/register, redirect to dashboard
    if (user && (path === '/' || path === '/login' || path === '/register')) {
        navigate('/dashboard');
        return;
    }
    
    // If user is not logged in and trying to access protected pages, redirect to landing
    const protectedRoutes = ['/dashboard', '/campaigns', '/analytics', '/ab-tests', '/settings', '/profile'];
    if (!user && protectedRoutes.includes(path)) {
        navigate('/');
        return;
    }
    
    // Route to appropriate page
    router();
}

// Simple router
function router() {
    let path = window.location.pathname;
    
    // Normalize path for both local and GitHub Pages
    if (path.startsWith('/AnsuADs')) {
        path = path.replace('/AnsuADs', '') || '/';
    }
    
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
        case 'campaigns':
            showCampaigns(app);
            break;
        case 'analytics':
            showAnalytics(app);
            break;
        case 'ab-tests':
            showABTests(app);
            break;
        case 'settings':
            showSettings(app);
            break;
        case 'profile':
            showProfile(app);
            break;
        default:
            showLanding();
    }
}

// Navigate function
export { navigate } from './router.js';

// Handle browser back/forward buttons
window.addEventListener('popstate', router);

// Start the app
init();
