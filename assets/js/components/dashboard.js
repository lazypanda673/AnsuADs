import { createElement } from '../utils/dom.js';
import { createHeader } from './header.js';
import { fetchCampaigns, fetchStats, deleteCampaign } from '../api/mockData.js';
import { formatCurrency, formatDate } from '../utils/validation.js';
import { showCampaignModal } from './campaignModal.js';
import { showDeleteConfirm } from './modal.js';

export async function showDashboard(container) {
    // Add header
    const header = createHeader();
    container.appendChild(header);
    
    // Main dashboard
    const dashboard = createElement('main', { className: 'dashboard' });
    const dashboardContainer = createElement('div', { className: 'container' });
    
    // Dashboard header
    const dashboardHeader = createElement('div', { className: 'dashboard-header' });
    const title = createElement('h1', { className: 'dashboard-title' }, ['Campaigns']);
    const createBtn = createElement('button', {
        className: 'btn btn-primary',
        onclick: () => openCampaignModal(null, dashboardContainer)
    }, ['+ Create Campaign']);
    
    dashboardHeader.appendChild(title);
    dashboardHeader.appendChild(createBtn);
    
    // Filter and Search Section
    const filterSection = createElement('div', { className: 'filter-section' });
    
    // Search input
    const searchWrapper = createElement('div', { className: 'search-wrapper' });
    const searchInput = createElement('input', {
        type: 'text',
        className: 'search-input',
        placeholder: 'Search campaigns...',
        id: 'campaign-search'
    });
    searchWrapper.appendChild(searchInput);
    
    // Filter dropdown
    const filterWrapper = createElement('div', { className: 'filter-wrapper' });
    const filterLabel = createElement('label', { for: 'status-filter', className: 'filter-label' }, ['Filter by:']);
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
    
    // Stats section
    const statsSection = createElement('div', { className: 'dashboard-stats' });
    
    // Campaigns section
    const campaignsSection = createElement('div', { className: 'campaigns-grid', id: 'campaigns-grid' });
    
    dashboardContainer.appendChild(dashboardHeader);
    dashboardContainer.appendChild(filterSection);
    dashboardContainer.appendChild(statsSection);
    dashboardContainer.appendChild(campaignsSection);
    dashboard.appendChild(dashboardContainer);
    container.appendChild(dashboard);
    
    // Load data
    await loadStats(statsSection);
    await loadCampaigns(campaignsSection, dashboardContainer);
    
    // Add event listeners for search and filter
    searchInput.addEventListener('input', (e) => {
        filterCampaigns(e.target.value, filterSelect.value, campaignsSection, dashboardContainer);
    });
    
    filterSelect.addEventListener('change', (e) => {
        filterCampaigns(searchInput.value, e.target.value, campaignsSection, dashboardContainer);
    });
}

async function loadStats(container) {
    try {
        const stats = await fetchStats();
        
        container.innerHTML = '';
        
        const statCards = [
            { label: 'Total Campaigns', value: stats.totalCampaigns },
            { label: 'Active Campaigns', value: stats.activeCampaigns },
            { label: 'Total Budget', value: formatCurrency(stats.totalBudget) },
            { label: 'Total Spend', value: formatCurrency(stats.totalSpend) }
        ];
        
        statCards.forEach(stat => {
            const card = createElement('div', { className: 'stat-card' });
            const label = createElement('div', { className: 'stat-label' }, [stat.label]);
            const value = createElement('div', { className: 'stat-value' }, [stat.value.toString()]);
            
            card.appendChild(label);
            card.appendChild(value);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

async function loadCampaigns(container, parentContainer) {
    try {
        const campaigns = await fetchCampaigns();
        console.log('Dashboard loaded campaigns:', campaigns);
        
        container.innerHTML = '';
        
        if (campaigns.length === 0) {
            const emptyState = createElement('div', { className: 'empty-state' });
            const icon = createElement('div', { className: 'empty-state-icon' }, ['📢']);
            const title = createElement('h2', { className: 'empty-state-title' }, ['No campaigns yet']);
            const subtitle = createElement('p', {}, ['Create your first campaign to get started']);
            
            emptyState.appendChild(icon);
            emptyState.appendChild(title);
            emptyState.appendChild(subtitle);
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
        
        // Filter by search term and status
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
    
    // Header
    const cardHeader = createElement('div', { className: 'campaign-header' });
    const nameDiv = createElement('div');
    const name = createElement('h3', { className: 'campaign-name' }, [campaign.name]);
    const objective = createElement('p', { className: 'campaign-detail-value' }, [campaign.objective || 'N/A']);
    nameDiv.appendChild(name);
    nameDiv.appendChild(objective);
    
    const status = createElement('span', {
        className: `campaign-status status-${campaign.status}`
    }, [campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)]);
    
    cardHeader.appendChild(nameDiv);
    cardHeader.appendChild(status);
    
    // Performance Metrics (if campaign is active or completed)
    if (campaign.status === 'active' || campaign.status === 'completed') {
        const metrics = campaign.metrics || {};
        const metricsSection = createElement('div', { className: 'campaign-metrics' });
        
        const metricItems = [
            { label: 'Impressions', value: (metrics.impressions || 0).toLocaleString(), icon: '👁️' },
            { label: 'Clicks', value: (metrics.clicks || 0).toLocaleString(), icon: '🖱️' },
            { label: 'CTR', value: `${(metrics.ctr || 0).toFixed(2)}%`, icon: '📊' },
            { label: 'Conversions', value: (metrics.conversions || 0).toLocaleString(), icon: '✅' }
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
    } else {
        card.appendChild(cardHeader);
    }
    
    // Details
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
    
    // Actions
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
                const statsSection = grid.previousElementSibling;
                await loadStats(statsSection);
                await loadCampaigns(grid, parentContainer);
            }
        }
    }, ['Delete']);
    
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    
    card.appendChild(cardHeader);
    card.appendChild(details);
    card.appendChild(actions);
    
    return card;
}

async function openCampaignModal(campaign, parentContainer) {
    console.log('Opening campaign modal, campaign:', campaign);
    try {
        await showCampaignModal(campaign, async () => {
            console.log('Campaign saved, reloading...');
            const grid = document.getElementById('campaigns-grid');
            const statsSection = grid.previousElementSibling;
            await loadStats(statsSection);
            await loadCampaigns(grid, parentContainer);
        });
    } catch (error) {
        console.error('Error opening campaign modal:', error);
        alert('Error opening campaign form: ' + error.message);
    }
}
