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
        { icon: '🎯', text: 'A/B Tests', route: '/ab-tests' },
        { icon: '⚙️', text: 'Settings', route: '/settings', active: true }
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
    pageTitle.textContent = 'Settings';
    
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

export async function showSettings(container) {
    container.innerHTML = '';
    
    const dashboard = createElement('div', { className: 'dashboard' });
    const sidebar = createSidebar();
    const main = createElement('div', { className: 'dashboard-main' });
    const topBar = createTopBar();
    const dashboardContent = createElement('div', { className: 'dashboard-content' });
    
    // Settings content
    const settingsHeader = createElement('div', { className: 'settings-header' });
    settingsHeader.innerHTML = '<p>Manage your account and application preferences</p>';
    
    // Settings sections
    const settingsGrid = createElement('div', { className: 'settings-grid' });
    
    // Account Settings
    const accountCard = createElement('div', { className: 'campaign-card' });
    accountCard.innerHTML = `
        <h3>Account Settings</h3>
        <div class="settings-section">
            <div class="setting-item">
                <label>Email Notifications</label>
                <input type="checkbox" checked>
            </div>
            <div class="setting-item">
                <label>Campaign Updates</label>
                <input type="checkbox" checked>
            </div>
            <div class="setting-item">
                <label>Weekly Reports</label>
                <input type="checkbox">
            </div>
        </div>
    `;
    
    // Display Preferences
    const displayCard = createElement('div', { className: 'campaign-card' });
    displayCard.innerHTML = `
        <h3>Display Preferences</h3>
        <div class="settings-section">
            <div class="setting-item">
                <label>Theme</label>
                <select class="form-control">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>Auto</option>
                </select>
            </div>
            <div class="setting-item">
                <label>Language</label>
                <select class="form-control">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                </select>
            </div>
        </div>
    `;
    
    // Privacy Settings
    const privacyCard = createElement('div', { className: 'campaign-card' });
    privacyCard.innerHTML = `
        <h3>Privacy & Security</h3>
        <div class="settings-section">
            <div class="setting-item">
                <label>Two-Factor Authentication</label>
                <button class="btn btn-secondary">Enable</button>
            </div>
            <div class="setting-item">
                <label>Data Export</label>
                <button class="btn btn-secondary">Download Data</button>
            </div>
            <div class="setting-item">
                <label>Delete Account</label>
                <button class="btn btn-danger">Delete</button>
            </div>
        </div>
    `;
    
    settingsGrid.appendChild(accountCard);
    settingsGrid.appendChild(displayCard);
    settingsGrid.appendChild(privacyCard);
    
    // Save button
    const saveSection = createElement('div', { className: 'settings-actions' });
    saveSection.innerHTML = `
        <button class="btn btn-primary">Save Changes</button>
        <button class="btn btn-secondary">Cancel</button>
    `;
    
    dashboardContent.appendChild(settingsHeader);
    dashboardContent.appendChild(settingsGrid);
    dashboardContent.appendChild(saveSection);
    
    main.appendChild(topBar);
    main.appendChild(dashboardContent);
    dashboard.appendChild(sidebar);
    dashboard.appendChild(main);
    container.appendChild(dashboard);
}
