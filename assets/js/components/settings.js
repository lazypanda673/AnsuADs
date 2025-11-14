import { createElement } from '../utils/dom.js';
import { createSidebar, createTopBar } from '../utils/layout.js';

export async function showSettings(container) {
    container.innerHTML = '';
    
    const dashboard = createElement('div', { className: 'dashboard' });
    const sidebar = createSidebar('/settings');
    const main = createElement('div', { className: 'dashboard-main' });
    const topBar = createTopBar('Settings');
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
