import { createElement } from '../utils/dom.js';
import { createSidebar, createTopBar } from '../utils/layout.js';

export async function showAnalytics(container) {
    container.innerHTML = '';
    
    const dashboard = createElement('div', { className: 'dashboard' });
    const sidebar = createSidebar('/analytics');
    const main = createElement('div', { className: 'dashboard-main' });
    const topBar = createTopBar('Analytics');
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
