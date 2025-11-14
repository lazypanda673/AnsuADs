import { createElement } from '../utils/dom.js';
import { getAuthUser, logout } from '../utils/auth.js';
import { navigate } from '../router.js';

function createSidebar() {
    const sidebar = createElement('div', { className: 'dashboard-sidebar' });
    
    const logo = createElement('div', { className: 'sidebar-logo' });
    logo.innerHTML = '<h2>AnsuADs</h2>';
    
    const nav = createElement('nav', { className: 'sidebar-nav' });
    const navItems = [
        { icon: '📊', text: 'Dashboard', route: '/dashboard' },
        { icon: '📢', text: 'Campaigns', route: '/dashboard' },
        { icon: '📈', text: 'Analytics', route: '/analytics' },
        { icon: '🎯', text: 'A/B Tests', route: '/ab-tests', active: true },
        { icon: '⚙️', text: 'Settings', route: '/settings' }
    ];
    
    navItems.forEach(item => {
        const navItem = createElement('a', { 
            className: `sidebar-nav-item ${item.active ? 'active' : ''}`,
            href: '#'
        });
        navItem.innerHTML = `<span class="nav-icon">${item.icon}</span><span class="nav-text">${item.text}</span>`;
        navItem.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(item.route);
        });
        nav.appendChild(navItem);
    });
    
    const logoutBtn = createElement('button', { className: 'sidebar-logout-btn' });
    logoutBtn.innerHTML = '<span class="nav-icon">🚪</span><span class="nav-text">Logout</span>';
    logoutBtn.addEventListener('click', () => {
        logout();
        navigate('/login');
    });
    
    sidebar.appendChild(logo);
    sidebar.appendChild(nav);
    sidebar.appendChild(logoutBtn);
    
    return sidebar;
}

function createTopBar() {
    const user = getAuthUser();
    const topBar = createElement('div', { className: 'dashboard-topbar' });
    
    const pageTitle = createElement('h1', { className: 'page-title' });
    pageTitle.textContent = 'A/B Tests';
    
    const profileMenu = createElement('div', { className: 'profile-menu' });
    const profileBtn = createElement('div', { className: 'profile-btn' });
    
    const avatar = createElement('div', { className: 'profile-avatar' });
    avatar.textContent = user.name.charAt(0).toUpperCase();
    
    const userInfo = createElement('div', { className: 'profile-info' });
    userInfo.innerHTML = `
        <div class="profile-name">${user.name}</div>
        <div class="profile-email">${user.email}</div>
    `;
    
    profileBtn.appendChild(avatar);
    profileBtn.appendChild(userInfo);
    profileBtn.addEventListener('click', () => {
        navigate('/profile');
    });
    
    profileMenu.appendChild(profileBtn);
    topBar.appendChild(pageTitle);
    topBar.appendChild(profileMenu);
    
    return topBar;
}

export async function showABTests(container) {
    container.innerHTML = '';
    
    const dashboard = createElement('div', { className: 'dashboard' });
    const sidebar = createSidebar();
    const main = createElement('div', { className: 'dashboard-main' });
    const topBar = createTopBar();
    const dashboardContent = createElement('div', { className: 'dashboard-content' });
    
    // A/B Tests content
    const testsHeader = createElement('div', { className: 'tests-header' });
    testsHeader.innerHTML = `
        <p>Create and manage A/B tests for your campaigns</p>
        <button class="btn btn-primary" style="margin-top: 1rem;">+ Create New Test</button>
    `;
    
    // Active tests
    const testsSection = createElement('div', { className: 'campaigns-grid' });
    
    // Sample A/B tests
    const sampleTests = [
        {
            name: 'Headline Test - Summer Sale',
            variants: 2,
            status: 'Running',
            winner: null,
            impressions: 5420,
            conversions: 234
        },
        {
            name: 'CTA Button Color Test',
            variants: 3,
            status: 'Completed',
            winner: 'Variant B',
            impressions: 8900,
            conversions: 445
        }
    ];
    
    sampleTests.forEach(test => {
        const testCard = createElement('div', { className: 'campaign-card' });
        testCard.innerHTML = `
            <div class="campaign-header">
                <h3>${test.name}</h3>
                <span class="campaign-status status-${test.status.toLowerCase()}">${test.status}</span>
            </div>
            <div class="campaign-details">
                <p><strong>Variants:</strong> ${test.variants}</p>
                <p><strong>Impressions:</strong> ${test.impressions.toLocaleString()}</p>
                <p><strong>Conversions:</strong> ${test.conversions}</p>
                ${test.winner ? `<p><strong>Winner:</strong> ${test.winner}</p>` : '<p><em>No winner yet</em></p>'}
            </div>
            <div class="campaign-actions">
                <button class="btn btn-secondary">View Details</button>
                <button class="btn btn-secondary">Edit</button>
            </div>
        `;
        testsSection.appendChild(testCard);
    });
    
    // Empty state
    if (sampleTests.length === 0) {
        const emptyState = createElement('div', { className: 'empty-state' });
        emptyState.innerHTML = `
            <p>No A/B tests yet. Create your first test to start optimizing your campaigns!</p>
        `;
        testsSection.appendChild(emptyState);
    }
    
    dashboardContent.appendChild(testsHeader);
    dashboardContent.appendChild(testsSection);
    
    main.appendChild(topBar);
    main.appendChild(dashboardContent);
    dashboard.appendChild(sidebar);
    dashboard.appendChild(main);
    container.appendChild(dashboard);
}
