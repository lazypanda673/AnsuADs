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
    }, ['Create Campaign']);
    
    dashboardHeader.appendChild(title);
    dashboardHeader.appendChild(createBtn);
    
    // Stats section
    const statsSection = createElement('div', { className: 'dashboard-stats' });
    
    // Campaigns section
    const campaignsSection = createElement('div', { className: 'campaigns-grid', id: 'campaigns-grid' });
    
    dashboardContainer.appendChild(dashboardHeader);
    dashboardContainer.appendChild(statsSection);
    dashboardContainer.appendChild(campaignsSection);
    dashboard.appendChild(dashboardContainer);
    container.appendChild(dashboard);
    
    // Load data
    await loadStats(statsSection);
    await loadCampaigns(campaignsSection, dashboardContainer);
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
    await showCampaignModal(campaign, async () => {
        const grid = document.getElementById('campaigns-grid');
        const statsSection = grid.previousElementSibling;
        await loadStats(statsSection);
        await loadCampaigns(grid, parentContainer);
    });
}
