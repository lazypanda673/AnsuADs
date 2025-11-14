import { createElement } from '../utils/dom.js';
import { getAuthUser, logout } from '../utils/auth.js';
import { createSidebar, createTopBar } from '../utils/layout.js';
import { navigate } from '../router.js';

export async function showProfile(container) {
    container.innerHTML = '';
    const user = getAuthUser();
    
    // Get campaigns data from localStorage
    const campaigns = JSON.parse(localStorage.getItem('ansuads_campaigns') || '[]');
    const totalCampaigns = campaigns.length;
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    const completedCampaigns = campaigns.filter(c => c.status === 'completed').length;
    
    const dashboard = createElement('div', { className: 'dashboard' });
    const sidebar = createSidebar('/profile');
    const main = createElement('div', { className: 'dashboard-main' });
    const topBar = createTopBar('My Profile');
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
    
    // Stats card with emojis and real data
    const statsCard = createElement('div', { className: 'campaign-card' });
    statsCard.innerHTML = `
        <h3>Your Activity</h3>
        <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));">
            <div class="stat-card">
                <div class="stat-value">📊 ${totalCampaigns}</div>
                <div class="stat-label">Total Campaigns</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">✅ ${activeCampaigns}</div>
                <div class="stat-label">Active</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">✔️ ${completedCampaigns}</div>
                <div class="stat-label">Completed</div>
            </div>
        </div>
    `;
    
    // Actions card without logout button
    const actionsCard = createElement('div', { className: 'campaign-card' });
    actionsCard.innerHTML = `
        <h3>Account Actions</h3>
        <div class="profile-actions">
            <button class="btn btn-secondary change-password-btn" style="width: 100%; margin-bottom: 0.5rem;">
                <i class="fas fa-key"></i> Change Password
            </button>
            <button class="btn btn-secondary download-data-btn" style="width: 100%; margin-bottom: 0.5rem;">
                <i class="fas fa-download"></i> Download Data
            </button>
        </div>
    `;
    
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
