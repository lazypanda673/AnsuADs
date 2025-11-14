import { createElement } from '../utils/dom.js';
import { getAuthUser, logout } from '../utils/auth.js';
import { navigate } from '../router.js';
import { fetchCampaigns, fetchStats, deleteCampaign } from '../api/mockData.js';
import { formatCurrency, formatDate } from '../utils/validation.js';
import { showCampaignModal } from './campaignModal.js';
import { showDeleteConfirm } from './modal.js';

function createSidebar(activeRoute = '/campaigns') {
    const sidebar = createElement('aside', { className: 'dashboard-sidebar' });
    
    const sidebarHeader = createElement('div', { className: 'sidebar-header' });
    const logo = createElement('div', { className: 'sidebar-logo' });
    logo.innerHTML = '<span class="logo-icon">🎯</span> AnsuADs';
    logo.style.cursor = 'pointer';
    logo.onclick = () => navigate('/dashboard');
    sidebarHeader.appendChild(logo);
    
    const nav = createElement('nav', { className: 'sidebar-nav' });
    
    const navItems = [
        { icon: '📊', label: 'Dashboard', route: '/dashboard' },
        { icon: '📢', label: 'Campaigns', route: '/campaigns' },
        { icon: '📈', label: 'Analytics', route: '/analytics' },
        { icon: '🎯', label: 'A/B Tests', route: '/ab-tests' },
        { icon: '⚙️', label: 'Settings', route: '/settings' }
    ];
    
    navItems.forEach(item => {
        const navItem = createElement('a', {
            href: '#',
            className: `sidebar-nav-item ${item.route === activeRoute ? 'active' : ''}`,
            onclick: (e) => {
                e.preventDefault();
                navigate(item.route);
            }
        });
        
        const icon = createElement('span', { className: 'sidebar-nav-icon' }, [item.icon]);
        const label = createElement('span', {}, [item.label]);
        
        navItem.appendChild(icon);
        navItem.appendChild(label);
        nav.appendChild(navItem);
    });
    
    const sidebarFooter = createElement('div', { className: 'sidebar-footer' });
    
    const profileLink = createElement('a', {
        href: '#',
        className: 'sidebar-nav-item',
        onclick: (e) => {
            e.preventDefault();
            navigate('/profile');
        }
    });
    profileLink.innerHTML = '<span class="sidebar-nav-icon">👤</span><span>Profile</span>';
    
    const logoutBtn = createElement('button', {
        className: 'sidebar-logout-btn',
        onclick: () => {
            logout();
            navigate('/login');
        }
    });
    logoutBtn.innerHTML = '<span class="nav-icon">🚪</span><span class="nav-text">Logout</span>';
    
    sidebarFooter.appendChild(profileLink);
    sidebarFooter.appendChild(logoutBtn);
    
    sidebar.appendChild(sidebarHeader);
    sidebar.appendChild(nav);
    sidebar.appendChild(sidebarFooter);
    
    return sidebar;
}

function createTopBar() {
    const user = getAuthUser();
    const topbar = createElement('div', { className: 'dashboard-topbar' });
    
    const topbarLeft = createElement('div', { className: 'topbar-left' });
    const title = createElement('h1', { className: 'page-title' }, ['Campaigns']);
    topbarLeft.appendChild(title);
    
    const topbarRight = createElement('div', { className: 'topbar-right' });
    
    const profileMenu = createElement('div', { className: 'profile-menu' });
    
    const profileAvatar = createElement('div', { className: 'profile-avatar' });
    const initials = user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U';
    profileAvatar.textContent = initials;
    
    const profileInfo = createElement('div', { className: 'profile-info' });
    const profileName = createElement('div', { className: 'profile-name' }, [user?.name || 'User']);
    const profileEmail = createElement('div', { className: 'profile-email' }, [user?.email || '']);
    
    profileInfo.appendChild(profileName);
    profileInfo.appendChild(profileEmail);
    
    profileMenu.appendChild(profileAvatar);
    profileMenu.appendChild(profileInfo);
    profileMenu.style.cursor = 'pointer';
    profileMenu.onclick = () => navigate('/profile');
    
    topbarRight.appendChild(profileMenu);
    topbar.appendChild(topbarLeft);
    topbar.appendChild(topbarRight);
    
    return topbar;
}

export async function showCampaigns(container) {
    container.innerHTML = '';
    
    const dashboard = createElement('div', { className: 'dashboard' });
    const sidebar = createSidebar('/campaigns');
    const main = createElement('div', { className: 'dashboard-main' });
    const topBar = createTopBar();
    const dashboardContent = createElement('div', { className: 'dashboard-content' });
    
    // Action bar
    const actionBar = createElement('div', { className: 'campaigns-action-bar' });
    
    const createBtn = createElement('button', {
        className: 'btn btn-primary',
        onclick: () => openCampaignModal(null, dashboardContent)
    });
    createBtn.innerHTML = '<span style="font-size: 1.2rem; margin-right: 0.5rem;">+</span> Create Campaign';
    
    actionBar.appendChild(createBtn);
    
    // Filter section
    const filterSection = createElement('div', { className: 'filter-section' });
    
    const searchWrapper = createElement('div', { className: 'search-wrapper' });
    const searchInput = createElement('input', {
        type: 'text',
        className: 'search-input',
        placeholder: 'Search campaigns...'
    });
    searchWrapper.appendChild(searchInput);
    
    const filterWrapper = createElement('div', { className: 'filter-wrapper' });
    const filterLabel = createElement('label', { for: 'status-filter', className: 'filter-label' }, ['Filter:']);
    const filterSelect = createElement('select', {
        className: 'filter-select',
        id: 'status-filter'
    });
    
    const filterOptions = [
        { value: 'all', label: 'All Campaigns' },
        { value: 'active', label: 'Active' },
        { value: 'paused', label: 'Paused' },
        { value: 'draft', label: 'Draft' },
        { value: 'completed', label: 'Completed' }
    ];
    
    filterOptions.forEach(opt => {
        const option = createElement('option', { value: opt.value }, [opt.label]);
        filterSelect.appendChild(option);
    });
    
    filterWrapper.appendChild(filterLabel);
    filterWrapper.appendChild(filterSelect);
    
    filterSection.appendChild(searchWrapper);
    filterSection.appendChild(filterWrapper);
    
    // Campaigns grid
    const campaignsSection = createElement('div', { className: 'campaigns-grid', id: 'campaigns-grid' });
    
    dashboardContent.appendChild(actionBar);
    dashboardContent.appendChild(filterSection);
    dashboardContent.appendChild(campaignsSection);
    
    main.appendChild(topBar);
    main.appendChild(dashboardContent);
    dashboard.appendChild(sidebar);
    dashboard.appendChild(main);
    container.appendChild(dashboard);
    
    // Load campaigns
    await loadCampaigns(campaignsSection, dashboardContent);
    
    // Add event listeners
    searchInput.addEventListener('input', (e) => {
        filterCampaigns(e.target.value, filterSelect.value, campaignsSection, dashboardContent);
    });
    
    filterSelect.addEventListener('change', (e) => {
        filterCampaigns(searchInput.value, e.target.value, campaignsSection, dashboardContent);
    });
}

async function loadCampaigns(container, parentContainer) {
    try {
        const campaigns = await fetchCampaigns();
        
        container.innerHTML = '';
        
        if (campaigns.length === 0) {
            const emptyState = createElement('div', { className: 'empty-state' });
            const icon = createElement('div', { className: 'empty-state-icon' }, ['📢']);
            const title = createElement('h2', { className: 'empty-state-title' }, ['No campaigns yet']);
            const subtitle = createElement('p', {}, ['Create your first campaign to get started']);
            const createBtn = createElement('button', {
                className: 'btn btn-primary btn-lg',
                style: 'margin-top: 1.5rem',
                onclick: () => openCampaignModal(null, parentContainer)
            }, ['Create Campaign']);
            
            emptyState.appendChild(icon);
            emptyState.appendChild(title);
            emptyState.appendChild(subtitle);
            emptyState.appendChild(createBtn);
            container.appendChild(emptyState);
            return;
        }
        
        campaigns.forEach(campaign => {
            const card = createCampaignCard(campaign, parentContainer);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading campaigns:', error);
        container.innerHTML = '<p class="error-message">Error loading campaigns</p>';
    }
}

async function filterCampaigns(searchTerm, statusFilter, container, parentContainer) {
    try {
        const campaigns = await fetchCampaigns();
        
        const filtered = campaigns.filter(campaign => {
            const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                (campaign.objective && campaign.objective.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
            
            return matchesSearch && matchesStatus;
        });
        
        container.innerHTML = '';
        
        if (filtered.length === 0) {
            const emptyState = createElement('div', { className: 'empty-state' });
            const icon = createElement('div', { className: 'empty-state-icon' }, ['🔍']);
            const title = createElement('h2', { className: 'empty-state-title' }, ['No campaigns found']);
            const subtitle = createElement('p', {}, ['Try adjusting your search or filter criteria']);
            
            emptyState.appendChild(icon);
            emptyState.appendChild(title);
            emptyState.appendChild(subtitle);
            container.appendChild(emptyState);
            return;
        }
        
        filtered.forEach(campaign => {
            const card = createCampaignCard(campaign, parentContainer);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error filtering campaigns:', error);
    }
}

function createCampaignCard(campaign, parentContainer) {
    const card = createElement('div', { className: 'campaign-card' });
    
    const cardHeader = createElement('div', { className: 'campaign-header' });
    const nameDiv = createElement('div');
    const name = createElement('h3', { className: 'campaign-name' }, [campaign.name]);
    const objective = createElement('p', { className: 'campaign-objective' }, [campaign.objective || 'N/A']);
    nameDiv.appendChild(name);
    nameDiv.appendChild(objective);
    
    const status = createElement('span', {
        className: `campaign-status status-${campaign.status}`
    }, [campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)]);
    
    cardHeader.appendChild(nameDiv);
    cardHeader.appendChild(status);
    
    const metrics = campaign.metrics || {};
    const metricsSection = createElement('div', { className: 'campaign-metrics' });
    
    // Show metrics for all campaigns, use --- for non-active/completed
    const showData = campaign.status === 'active' || campaign.status === 'completed';
    
    const metricItems = [
        { label: 'Impressions', value: showData ? (metrics.impressions || 0).toLocaleString() : '---', icon: '👁️' },
        { label: 'Clicks', value: showData ? (metrics.clicks || 0).toLocaleString() : '---', icon: '🖱️' },
        { label: 'CTR', value: showData ? `${(metrics.ctr || 0).toFixed(2)}%` : '---', icon: '📊' },
        { label: 'Conversions', value: showData ? (metrics.conversions || 0).toLocaleString() : '---', icon: '✅' }
    ];
    
    metricItems.forEach(item => {
        const metricDiv = createElement('div', { className: 'metric-item' });
        const iconSpan = createElement('span', { className: 'metric-icon' }, [item.icon]);
        const metricContent = createElement('div', { className: 'metric-content' });
        const label = createElement('div', { className: 'metric-label' }, [item.label]);
        const value = createElement('div', { className: 'metric-value' }, [item.value]);
        
        metricContent.appendChild(label);
        metricContent.appendChild(value);
        metricDiv.appendChild(iconSpan);
        metricDiv.appendChild(metricContent);
        metricsSection.appendChild(metricDiv);
    });
    
    card.appendChild(cardHeader);
    card.appendChild(metricsSection);
    
    const details = createElement('div', { className: 'campaign-details' });
    
    const detailItems = [
        { label: 'Budget', value: formatCurrency(campaign.budget || 0) },
        { label: 'Start Date', value: formatDate(campaign.start_date) },
        { label: 'End Date', value: formatDate(campaign.end_date) },
        { label: 'Variants', value: (campaign.variants || []).length.toString() }
    ];
    
    detailItems.forEach(item => {
        const detailDiv = createElement('div', { className: 'campaign-detail' });
        const label = createElement('div', { className: 'campaign-detail-label' }, [item.label]);
        const value = createElement('div', { className: 'campaign-detail-value' }, [item.value]);
        detailDiv.appendChild(label);
        detailDiv.appendChild(value);
        details.appendChild(detailDiv);
    });
    
    const actions = createElement('div', { className: 'campaign-actions' });
    
    const editBtn = createElement('button', {
        className: 'btn btn-primary',
        onclick: (e) => {
            e.stopPropagation();
            openCampaignModal(campaign, parentContainer);
        }
    }, ['Edit']);
    
    const deleteBtn = createElement('button', {
        className: 'btn btn-danger',
        onclick: async (e) => {
            e.stopPropagation();
            const confirmed = await showDeleteConfirm(
                'Delete Campaign',
                `Are you sure you want to delete "${campaign.name}"? This action cannot be undone.`
            );
            
            if (confirmed) {
                await deleteCampaign(campaign.id);
                const grid = document.getElementById('campaigns-grid');
                await loadCampaigns(grid, parentContainer);
            }
        }
    }, ['Delete']);
    
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    
    card.appendChild(details);
    card.appendChild(actions);
    
    return card;
}

async function openCampaignModal(campaign, parentContainer) {
    try {
        await showCampaignModal(campaign, async () => {
            const grid = document.getElementById('campaigns-grid');
            await loadCampaigns(grid, parentContainer);
        });
    } catch (error) {
        console.error('Error opening campaign modal:', error);
        alert('Error opening campaign form: ' + error.message);
    }
}
