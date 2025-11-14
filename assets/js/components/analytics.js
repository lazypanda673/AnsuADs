import { createElement } from '../utils/dom.js';
import { createSidebar, createTopBar } from '../utils/layout.js';

export async function showAnalytics(container) {
    container.innerHTML = '';
    
    const dashboard = createElement('div', { className: 'dashboard' });
    const sidebar = createSidebar('/analytics');
    const main = createElement('div', { className: 'dashboard-main' });
    const topBar = createTopBar('Analytics');
    const dashboardContent = createElement('div', { className: 'dashboard-content' });
    
    // Get campaigns data from localStorage
    const campaigns = JSON.parse(localStorage.getItem('ansuads_campaigns') || '[]');
    
    // Calculate total metrics
    let totalImpressions = 0;
    let totalClicks = 0;
    let totalConversions = 0;
    
    campaigns.forEach(campaign => {
        if (campaign.metrics) {
            totalImpressions += campaign.metrics.impressions || 0;
            totalClicks += campaign.metrics.clicks || 0;
            totalConversions += campaign.metrics.conversions || 0;
        }
    });
    
    const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0;
    
    // Generate last 7 days data
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        last7Days.push({
            day: dayName,
            impressions: Math.floor(Math.random() * 5000) + 2000,
            clicks: Math.floor(Math.random() * 500) + 100
        });
    }
    
    const maxImpressions = Math.max(...last7Days.map(d => d.impressions));
    const maxClicks = Math.max(...last7Days.map(d => d.clicks));
    
    // Analytics content
    const analyticsHeader = createElement('div', { className: 'analytics-header' });
    analyticsHeader.innerHTML = '<h2>Analytics Overview</h2><p>Track your campaign performance and insights</p>';
    
    // Stats overview
    const statsGrid = createElement('div', { className: 'stats-grid' });
    const stats = [
        { label: 'Total Impressions', value: totalImpressions.toLocaleString(), change: '+12.5%', icon: '👁️' },
        { label: 'Total Clicks', value: totalClicks.toLocaleString(), change: '+8.2%', icon: '🖱️' },
        { label: 'Avg CTR', value: avgCTR + '%', change: '+2.1%', icon: '📊' },
        { label: 'Conversions', value: totalConversions.toLocaleString(), change: '+1.8%', icon: '🎯' }
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
    
    // Charts section with two side-by-side charts
    const chartsSection = createElement('div', { className: 'charts-row' });
    
    // Impressions Chart
    const impressionsChart = createElement('div', { className: 'chart-container' });
    impressionsChart.innerHTML = `
        <h3>Impressions (Last 7 Days)</h3>
        <div class="chart">
            ${last7Days.map(day => `
                <div class="chart-bar-wrapper">
                    <div class="chart-bar" style="height: ${(day.impressions / maxImpressions) * 100}%">
                        <span class="chart-value">${day.impressions.toLocaleString()}</span>
                    </div>
                    <span class="chart-label">${day.day}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    // Clicks Chart
    const clicksChart = createElement('div', { className: 'chart-container' });
    clicksChart.innerHTML = `
        <h3>Clicks (Last 7 Days)</h3>
        <div class="chart">
            ${last7Days.map(day => `
                <div class="chart-bar-wrapper">
                    <div class="chart-bar" style="height: ${(day.clicks / maxClicks) * 100}%; background: linear-gradient(180deg, #f093fb 0%, #f5576c 100%);">
                        <span class="chart-value">${day.clicks.toLocaleString()}</span>
                    </div>
                    <span class="chart-label">${day.day}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    chartsSection.appendChild(impressionsChart);
    chartsSection.appendChild(clicksChart);
    
    dashboardContent.appendChild(analyticsHeader);
    dashboardContent.appendChild(statsGrid);
    dashboardContent.appendChild(chartsSection);
    
    main.appendChild(topBar);
    main.appendChild(dashboardContent);
    dashboard.appendChild(sidebar);
    dashboard.appendChild(main);
    container.appendChild(dashboard);
}
