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
    pageTitle.textContent = 'My Profile';
    
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
    
    profileMenu.appendChild(profileBtn);
    topBar.appendChild(pageTitle);
    topBar.appendChild(profileMenu);
    
    return topBar;
}

export async function showProfile(container) {
    container.innerHTML = '';
    const user = getAuthUser();
    
    const dashboard = createElement('div', { className: 'dashboard' });
    const sidebar = createSidebar();
    const main = createElement('div', { className: 'dashboard-main' });
    const topBar = createTopBar();
    const dashboardContent = createElement('div', { className: 'dashboard-content' });
    
    // Profile content
    const profileContainer = createElement('div', { className: 'profile-container' });
    
    // Profile header with avatar
    const profileHeader = createElement('div', { className: 'profile-header' });
    const largeAvatar = createElement('div', { className: 'profile-avatar-large' });
    largeAvatar.textContent = user.name.charAt(0).toUpperCase();
    
    const profileHeaderInfo = createElement('div', { className: 'profile-header-info' });
    profileHeaderInfo.innerHTML = `
        <h2>${user.name}</h2>
        <p>${user.email}</p>
        <button class="btn btn-secondary" style="margin-top: 1rem;">Edit Profile</button>
    `;
    
    profileHeader.appendChild(largeAvatar);
    profileHeader.appendChild(profileHeaderInfo);
    
    // Profile details card
    const profileCard = createElement('div', { className: 'campaign-card' });
    profileCard.innerHTML = `
        <h3>Profile Information</h3>
        <div class="profile-details">
            <div class="profile-detail-item">
                <label>Full Name</label>
                <input type="text" class="form-control" value="${user.name}" readonly>
            </div>
            <div class="profile-detail-item">
                <label>Email Address</label>
                <input type="email" class="form-control" value="${user.email}" readonly>
            </div>
            <div class="profile-detail-item">
                <label>Member Since</label>
                <input type="text" class="form-control" value="${new Date().toLocaleDateString()}" readonly>
            </div>
            <div class="profile-detail-item">
                <label>Account Type</label>
                <input type="text" class="form-control" value="Standard" readonly>
            </div>
        </div>
    `;
    
    // Stats card
    const statsCard = createElement('div', { className: 'campaign-card' });
    statsCard.innerHTML = `
        <h3>Your Activity</h3>
        <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));">
            <div class="stat-card">
                <div class="stat-value">12</div>
                <div class="stat-label">Total Campaigns</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">8</div>
                <div class="stat-label">Active</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">4</div>
                <div class="stat-label">Completed</div>
            </div>
        </div>
    `;
    
    // Actions card
    const actionsCard = createElement('div', { className: 'campaign-card' });
    actionsCard.innerHTML = `
        <h3>Account Actions</h3>
        <div class="profile-actions">
            <button class="btn btn-secondary" style="width: 100%; margin-bottom: 0.5rem;">Change Password</button>
            <button class="btn btn-secondary" style="width: 100%; margin-bottom: 0.5rem;">Download Data</button>
            <button class="btn btn-danger logout-btn" style="width: 100%;">Logout</button>
        </div>
    `;
    
    // Add logout functionality
    const logoutButton = actionsCard.querySelector('.logout-btn');
    logoutButton.addEventListener('click', () => {
        logout();
        navigate('/login');
    });
    
    profileContainer.appendChild(profileHeader);
    profileContainer.appendChild(profileCard);
    profileContainer.appendChild(statsCard);
    profileContainer.appendChild(actionsCard);
    
    dashboardContent.appendChild(profileContainer);
    
    main.appendChild(topBar);
    main.appendChild(dashboardContent);
    dashboard.appendChild(sidebar);
    dashboard.appendChild(main);
    container.appendChild(dashboard);
}
