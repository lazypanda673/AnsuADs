import { createElement } from '../utils/dom.js';
import { getAuthUser } from '../utils/auth.js';
import { createSidebar, createTopBar } from '../utils/layout.js';

export async function showSettings(container) {
    container.innerHTML = '';
    const user = getAuthUser();
    
    const dashboard = createElement('div', { className: 'dashboard' });
    const sidebar = createSidebar('/settings');
    const main = createElement('div', { className: 'dashboard-main' });
    const topBar = createTopBar('Settings');
    const dashboardContent = createElement('div', { className: 'dashboard-content' });
    
    // Settings content
    const settingsHeader = createElement('div', { className: 'settings-header' });
    settingsHeader.innerHTML = '<h2>Settings</h2><p>Manage your account and application preferences</p>';
    
    // Settings sections
    const settingsContainer = createElement('div', { className: 'settings-sections' });
    
    // Account Settings
    const accountSection = createElement('div', { className: 'settings-section' });
    accountSection.innerHTML = `
        <h3><i class="fas fa-user-circle"></i> Account Settings</h3>
        <div class="campaign-card">
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" value="${user?.name || ''}" placeholder="Username">
            </div>
            <div class="form-group">
                <label>Email Address</label>
                <input type="email" class="form-control" value="${user?.email || ''}" placeholder="Email">
            </div>
            <div class="form-group">
                <label>Password</label>
                <button class="btn btn-primary" onclick="alert('Change password functionality coming soon')">
                    <i class="fas fa-key"></i> Change Password
                </button>
            </div>
        </div>
    `;
    
    // Security Settings
    const securitySection = createElement('div', { className: 'settings-section' });
    securitySection.innerHTML = `
        <h3><i class="fas fa-shield-alt"></i> Security</h3>
        <div class="campaign-card">
            <div class="setting-row">
                <div class="setting-info">
                    <label>Two-Factor Authentication</label>
                    <p class="setting-description">Add an extra layer of security to your account</p>
                </div>
                <button class="btn btn-primary">Enable 2FA</button>
            </div>
            <div class="setting-row">
                <div class="setting-info">
                    <label>Active Sessions</label>
                    <p class="setting-description">Manage devices where you're currently logged in</p>
                </div>
                <button class="btn btn-secondary">View Sessions</button>
            </div>
        </div>
    `;
    
    // Appearance Settings
    const appearanceSection = createElement('div', { className: 'settings-section' });
    appearanceSection.innerHTML = `
        <h3><i class="fas fa-palette"></i> Appearance</h3>
        <div class="campaign-card">
            <div class="form-group">
                <label>Theme</label>
                <select class="form-control">
                    <option selected>Light</option>
                    <option>Dark</option>
                    <option>Auto</option>
                </select>
            </div>
            <div class="form-group">
                <label>Language</label>
                <select class="form-control">
                    <option selected>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                </select>
            </div>
        </div>
    `;
    
    // Notifications Settings
    const notificationsSection = createElement('div', { className: 'settings-section' });
    notificationsSection.innerHTML = `
        <h3><i class="fas fa-bell"></i> Notifications</h3>
        <div class="campaign-card">
            <div class="setting-row">
                <div class="setting-info">
                    <label>Email Notifications</label>
                    <p class="setting-description">Receive campaign updates via email</p>
                </div>
                <label class="toggle-switch">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                </label>
            </div>
            <div class="setting-row">
                <div class="setting-info">
                    <label>Push Notifications</label>
                    <p class="setting-description">Get real-time alerts about your campaigns</p>
                </div>
                <label class="toggle-switch">
                    <input type="checkbox">
                    <span class="toggle-slider"></span>
                </label>
            </div>
        </div>
    `;
    
    // Data & Privacy Settings
    const privacySection = createElement('div', { className: 'settings-section' });
    privacySection.innerHTML = `
        <h3><i class="fas fa-database"></i> Data & Privacy</h3>
        <div class="campaign-card">
            <div class="setting-row">
                <div class="setting-info">
                    <label>Export Your Data</label>
                    <p class="setting-description">Download a copy of all your campaign data</p>
                </div>
                <button class="btn btn-secondary" onclick="alert('Data export functionality coming soon')">
                    <i class="fas fa-download"></i> Export Data
                </button>
            </div>
            <div class="setting-row danger-zone">
                <div class="setting-info">
                    <label>Delete Account</label>
                    <p class="setting-description">Permanently delete your account and all data</p>
                </div>
                <button class="btn btn-danger" onclick="if(confirm('Are you sure? This action cannot be undone.')) alert('Account deletion functionality coming soon')">
                    <i class="fas fa-trash"></i> Delete Account
                </button>
            </div>
        </div>
    `;
    
    settingsContainer.appendChild(accountSection);
    settingsContainer.appendChild(securitySection);
    settingsContainer.appendChild(appearanceSection);
    settingsContainer.appendChild(notificationsSection);
    settingsContainer.appendChild(privacySection);
    
    // Save button
    const saveSection = createElement('div', { className: 'settings-actions' });
    saveSection.innerHTML = `
        <button class="btn btn-primary" onclick="alert('Settings saved successfully!')">
            <i class="fas fa-save"></i> Save All Changes
        </button>
        <button class="btn btn-secondary" id="reset-settings-btn">
            <i class="fas fa-undo"></i> Reset
        </button>
    `;
    
    dashboardContent.appendChild(settingsHeader);
    dashboardContent.appendChild(settingsContainer);
    dashboardContent.appendChild(saveSection);
    
    main.appendChild(topBar);
    main.appendChild(dashboardContent);
    dashboard.appendChild(sidebar);
    dashboard.appendChild(main);
    container.appendChild(dashboard);
    
    // Add reset button event listener
    const resetBtn = container.querySelector('#reset-settings-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Reset all form fields to their original values
            const inputs = container.querySelectorAll('input[type=\"text\"], input[type=\"email\"], select');
            inputs.forEach(input => {
                if (input.defaultValue) {
                    input.value = input.defaultValue;
                }
            });
            const checkboxes = container.querySelectorAll('input[type=\"checkbox\"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = checkbox.defaultChecked;
            });
            alert('Settings reset to original values');
        });
    }
}
