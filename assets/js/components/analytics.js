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
        { icon: '📈', text: 'Analytics', route: '/analytics', active: true },
        { icon: '🎯', text: 'A/B Tests', route: '/ab-tests' },
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
    pageTitle.textContent = 'Analytics';
    
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

export async function showAnalytics(container) {
    container.innerHTML = '';
    
    const dashboard = createElement('div', { className: 'dashboard' });
    const sidebar = createSidebar();
    const main = createElement('div', { className: 'dashboard-main' });
    const topBar = createTopBar();
    const dashboardContent = createElement('div', { className: 'dashboard-content' });
    
    // Analytics content
    const analyticsHeader = createElement('div', { className: 'analytics-header' });
    analyticsHeader.innerHTML = '<p>Track your campaign performance and insights</p>';
    
    // Stats overview
    const statsGrid = createElement('div', { className: 'stats-grid' });
    const stats = [
        { label: 'Total Impressions', value: '125,430', change: '+12.5%', icon: '👁️' },
        { label: 'Total Clicks', value: '8,234', change: '+8.2%', icon: '🖱️' },
        { label: 'Avg CTR', value: '6.56%', change: '+2.1%', icon: '📊' },
        { label: 'Conversion Rate', value: '3.42%', change: '+1.8%', icon: '🎯' }
    ];
    
    stats.forEach(stat => {
        const statCard = createElement('div', { className: 'stat-card' });
        statCard.innerHTML = `
            <div class="stat-icon">${stat.icon}</div>
            <div class="stat-content">
                <div class="stat-value">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
                <div class="stat-change positive">${stat.change}</div>
            </div>
        `;
        statsGrid.appendChild(statCard);
    });
    
    // Charts section
    const chartsSection = createElement('div', { className: 'charts-section' });
    const chartCard = createElement('div', { className: 'campaign-card' });
    chartCard.innerHTML = `
        <h3>Performance Over Time</h3>
        <div class="chart-placeholder">
            <p>📈 Chart visualization will be implemented here</p>
            <p style="color: #64748b; font-size: 0.9rem; margin-top: 1rem;">
                Integration with charting library coming soon
            </p>
        </div>
    `;
    chartsSection.appendChild(chartCard);
    
    dashboardContent.appendChild(analyticsHeader);
    dashboardContent.appendChild(statsGrid);
    dashboardContent.appendChild(chartsSection);
    
    main.appendChild(topBar);
    main.appendChild(dashboardContent);
    dashboard.appendChild(sidebar);
    dashboard.appendChild(main);
    container.appendChild(dashboard);
}
