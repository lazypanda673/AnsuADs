import { createElement } from '../utils/dom.js';
import { getAuthUser, logout } from '../utils/auth.js';
import { navigate } from '../router.js';
import { fetchCampaigns, fetchStats } from '../api/mockData.js';
import { formatCurrency, formatDate } from '../utils/validation.js';

function createSidebar(activeRoute = '/dashboard') {
    const sidebar = createElement('aside', { className: 'dashboard-sidebar' });

    const sidebarHeader = createElement('div', { className: 'sidebar-header' });
    const logo = createElement('div', { className: 'sidebar-logo' });
    logo.innerHTML = '<span class="logo-icon">📊</span> AnsuADs';
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

    const logoutBtn = createElement('button', {
        className: 'sidebar-logout-btn',
        onclick: () => {
            logout();
            navigate('/login');
        }
    });
    logoutBtn.innerHTML = '<span class="nav-icon">🚪</span><span class="nav-text">Logout</span>';

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
    const greeting = createElement('div', { className: 'welcome-greeting' });
    const hour = new Date().getHours();
    const greetingText = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    greeting.innerHTML = `
        <h1 class="page-title">${greetingText}, ${user?.name || 'User'}!</h1>
        <p class="page-subtitle">Here's what's happening with your campaigns today</p>
    `;
    topbarLeft.appendChild(greeting);

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

function createPerformanceChart() {
    const chartContainer = createElement('div', { className: 'chart-container' });

    const chartHeader = createElement('div', { className: 'chart-header' });
    chartHeader.innerHTML = '<h3>📈 Performance Overview (Last 7 Days)</h3>';

    const chartContent = createElement('div', { className: 'chart-content' });

    // Sample data for last 7 days
    const data = [
        { day: 'Mon', impressions: 2500, clicks: 180, conversions: 45 },
        { day: 'Tue', impressions: 3200, clicks: 220, conversions: 58 },
        { day: 'Wed', impressions: 2800, clicks: 195, conversions: 52 },
        { day: 'Thu', impressions: 3800, clicks: 285, conversions: 72 },
        { day: 'Fri', impressions: 4200, clicks: 320, conversions: 85 },
        { day: 'Sat', impressions: 2100, clicks: 145, conversions: 38 },
        { day: 'Sun', impressions: 1800, clicks: 125, conversions: 32 }
    ];

    const maxValue = Math.max(...data.map(d => d.impressions));

    const chartBars = createElement('div', { className: 'chart-bars' });

    data.forEach(day => {
        const barGroup = createElement('div', { className: 'chart-bar-group' });

        const barContainer = createElement('div', { className: 'chart-bar-container' });

        // Three bars for impressions, clicks, conversions
        const impressionsBar = createElement('div', { className: 'chart-bar bar-impressions' });
        impressionsBar.style.height = `${(day.impressions / maxValue) * 100}%`;
        impressionsBar.setAttribute('data-value', day.impressions.toLocaleString());

        const clicksBar = createElement('div', { className: 'chart-bar bar-clicks' });
        clicksBar.style.height = `${(day.clicks / maxValue) * 100}%`;
        clicksBar.setAttribute('data-value', day.clicks.toLocaleString());

        const conversionsBar = createElement('div', { className: 'chart-bar bar-conversions' });
        conversionsBar.style.height = `${(day.conversions / maxValue) * 100}%`;
        conversionsBar.setAttribute('data-value', day.conversions.toLocaleString());

        barContainer.appendChild(impressionsBar);
        barContainer.appendChild(clicksBar);
        barContainer.appendChild(conversionsBar);

        const label = createElement('div', { className: 'chart-label' }, [day.day]);

        barGroup.appendChild(barContainer);
        barGroup.appendChild(label);
        chartBars.appendChild(barGroup);
    });

    const chartLegend = createElement('div', { className: 'chart-legend' });
    chartLegend.innerHTML = `
        <div class="legend-item">
            <span class="legend-color" style="background: #3b82f6;"></span>
            <span>Impressions</span>
        </div>
        <div class="legend-item">
            <span class="legend-color" style="background: #8b5cf6;"></span>
            <span>Clicks</span>
        </div>
        <div class="legend-item">
            <span class="legend-color" style="background: #10b981;"></span>
            <span>Conversions</span>
        </div>
    `;

    chartContent.appendChild(chartBars);
    chartContent.appendChild(chartLegend);

    chartContainer.appendChild(chartHeader);
    chartContainer.appendChild(chartContent);

    return chartContainer;
}

export async function showDashboard(container) {
    container.innerHTML = '';

    const dashboard = createElement('div', { className: 'dashboard' });
    const sidebar = createSidebar('/dashboard');
    const main = createElement('div', { className: 'dashboard-main' });
    const topBar = createTopBar();
    const dashboardContent = createElement('div', { className: 'dashboard-content' });

    // Stats section
    const statsSection = createElement('div', { className: 'dashboard-stats' });

    // Performance chart
    const performanceSection = createElement('div', { className: 'dashboard-section' });
    const performanceChart = createPerformanceChart();
    performanceSection.appendChild(performanceChart);

    // Two column layout for recent campaigns and quick actions
    const twoColumnSection = createElement('div', { className: 'two-column-section' });

    // Recent campaigns
    const recentCampaignsCard = createElement('div', { className: 'dashboard-card' });
    const campaignsHeader = createElement('div', { className: 'card-header' });
    campaignsHeader.innerHTML = `
        <h3>📢 Recent Campaigns</h3>
        <a href="#" class="view-all-link">View All →</a>
    `;
    campaignsHeader.querySelector('.view-all-link').onclick = (e) => {
        e.preventDefault();
        navigate('/campaigns');
    };

    const campaignsList = createElement('div', { className: 'campaigns-list', id: 'recent-campaigns' });

    recentCampaignsCard.appendChild(campaignsHeader);
    recentCampaignsCard.appendChild(campaignsList);

    // Quick actions and activity feed column
    const rightColumn = createElement('div', { className: 'right-column' });

    // Quick actions
    const quickActionsCard = createElement('div', { className: 'dashboard-card quick-actions-card' });
    const actionsHeader = createElement('h3', {}, ['⚡ Quick Actions']);
    const actionsList = createElement('div', { className: 'quick-actions-list' });

    const actions = [
        { icon: '➕', label: 'Create Campaign', route: '/campaigns' },
        { icon: '📊', label: 'View Analytics', route: '/analytics' },
        { icon: '🎯', label: 'Run A/B Test', route: '/ab-tests' },
        { icon: '⚙️', label: 'Settings', route: '/settings' }
    ];

    actions.forEach(action => {
        const actionBtn = createElement('button', {
            className: 'quick-action-btn',
            onclick: () => navigate(action.route)
        });
        actionBtn.innerHTML = `<span class="action-icon">${action.icon}</span> ${action.label}`;
        actionsList.appendChild(actionBtn);
    });

    quickActionsCard.appendChild(actionsHeader);
    quickActionsCard.appendChild(actionsList);

    // Activity feed
    const activityCard = createElement('div', { className: 'dashboard-card activity-card' });
    const activityHeader = createElement('h3', {}, ['🔔 Activity Feed']);
    const activityList = createElement('div', { className: 'activity-list' });

    const activities = [
        { icon: '✅', text: 'Campaign "Summer Sale" completed', time: '2 hours ago' },
        { icon: '🎯', text: 'New A/B test started', time: '5 hours ago' },
        { icon: '⚠️', text: 'Budget alert: Campaign approaching limit', time: '1 day ago' }
    ];

    activities.forEach(activity => {
        const activityItem = createElement('div', { className: 'activity-item' });
        activityItem.innerHTML = `
            <span class="activity-icon">${activity.icon}</span>
            <div class="activity-content">
                <p class="activity-text">${activity.text}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        activityList.appendChild(activityItem);
    });

    activityCard.appendChild(activityHeader);
    activityCard.appendChild(activityList);

    rightColumn.appendChild(quickActionsCard);
    rightColumn.appendChild(activityCard);

    twoColumnSection.appendChild(recentCampaignsCard);
    twoColumnSection.appendChild(rightColumn);

    dashboardContent.appendChild(statsSection);
    dashboardContent.appendChild(performanceSection);
    dashboardContent.appendChild(twoColumnSection);

    main.appendChild(topBar);
    main.appendChild(dashboardContent);
    dashboard.appendChild(sidebar);
    dashboard.appendChild(main);
    container.appendChild(dashboard);

    // Load data
    await loadStats(statsSection);
    await loadRecentCampaigns(campaignsList);
}

async function loadStats(container) {
    try {
        const stats = await fetchStats();

        container.innerHTML = '';

        const statCards = [
            {
                label: 'Total Campaigns',
                value: stats.totalCampaigns,
                icon: '📊',
                color: '#3b82f6',
                change: '+12%'
            },
            {
                label: 'Total Budget',
                value: formatCurrency(stats.totalBudget),
                icon: '💰',
                color: '#10b981',
                change: '+8%'
            },
            {
                label: 'Avg. CTR',
                value: '6.4%',
                icon: '📈',
                color: '#8b5cf6',
                change: '+2.1%'
            },
            {
                label: 'Conversions',
                value: '3.2%',
                icon: '🎯',
                color: '#f59e0b',
                change: '+1.8%'
            }
        ];

        statCards.forEach(stat => {
            const card = createElement('div', { className: 'stat-card' });
            card.innerHTML = `
                <div class="stat-icon" style="background: ${stat.color}20; color: ${stat.color};">
                    ${stat.icon}
                </div>
                <div class="stat-content">
                    <div class="stat-label">${stat.label}</div>
                    <div class="stat-value">${stat.value.toString()}</div>
                    <div class="stat-change positive">${stat.change}</div>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

async function loadRecentCampaigns(container) {
    try {
        const campaigns = await fetchCampaigns();

        container.innerHTML = '';

        if (campaigns.length === 0) {
            const emptyState = createElement('div', { className: 'empty-state-small' });
            emptyState.innerHTML = '<p>No campaigns yet. Create your first campaign!</p>';
            container.appendChild(emptyState);
            return;
        }

        // Show only top 3 campaigns
        const recentCampaigns = campaigns.slice(0, 3);

        recentCampaigns.forEach(campaign => {
            const campaignItem = createElement('div', { className: 'campaign-list-item' });
            campaignItem.innerHTML = `
                <div class="campaign-item-left">
                    <h4 class="campaign-item-name">${campaign.name}</h4>
                    <p class="campaign-item-objective">${campaign.objective || 'N/A'}</p>
                </div>
                <div class="campaign-item-right">
                    <span class="campaign-status status-${campaign.status}">
                        ${campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                    <span class="campaign-item-budget">${formatCurrency(campaign.budget || 0)}</span>
                </div>
            `;
            campaignItem.style.cursor = 'pointer';
            campaignItem.onclick = () => navigate('/campaigns');
            container.appendChild(campaignItem);
        });
    } catch (error) {
        console.error('Error loading recent campaigns:', error);
    }
}
