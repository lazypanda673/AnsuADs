import { createElement } from '../utils/dom.js';
import { createSidebar, createTopBar } from '../utils/layout.js';
import { showABTestModal, showDeleteABTestConfirm } from './abTestModal.js';

export async function showABTests(container) {
    container.innerHTML = '';
    
    const dashboard = createElement('div', { className: 'dashboard' });
    const sidebar = createSidebar('/ab-tests');
    const main = createElement('div', { className: 'dashboard-main' });
    const topBar = createTopBar('A/B Tests');
    const dashboardContent = createElement('div', { className: 'dashboard-content' });
    
    // Load tests from localStorage
    const loadTests = () => {
        let tests = JSON.parse(localStorage.getItem('ansuads_abtests') || '[]');
        
        // If no tests exist, add sample data
        if (tests.length === 0) {
            tests = [
                {
                    id: 1,
                    name: 'Headline Test - Summer Sale',
                    variants: 2,
                    startDate: '2024-11-01',
                    endDate: '2024-12-01',
                    targetMetric: 'Clicks',
                    description: 'Testing different headlines for summer sale campaign',
                    status: 'Running',
                    impressions: 5420,
                    conversions: 234,
                    winner: null
                },
                {
                    id: 2,
                    name: 'CTA Button Color Test',
                    variants: 3,
                    startDate: '2024-10-15',
                    endDate: '2024-11-15',
                    targetMetric: 'Conversions',
                    description: 'Testing blue vs green vs orange CTA buttons',
                    status: 'Completed',
                    impressions: 8900,
                    conversions: 445,
                    winner: 'Variant B'
                },
                {
                    id: 3,
                    name: 'Product Image Layout',
                    variants: 2,
                    startDate: '2024-11-10',
                    endDate: '2024-12-10',
                    targetMetric: 'CTR',
                    description: 'Grid layout vs carousel for product images',
                    status: 'Running',
                    impressions: 2150,
                    conversions: 87,
                    winner: null
                }
            ];
            localStorage.setItem('ansuads_abtests', JSON.stringify(tests));
        }
        
        return tests;
    };
    
    const refreshTests = async () => {
        testsSection.innerHTML = '';
        const tests = loadTests();
        
        if (tests.length === 0) {
            const emptyState = createElement('div', { className: 'empty-state' });
            emptyState.innerHTML = `
                <div class="empty-state-icon">🎯</div>
                <h2 class="empty-state-title">No A/B tests yet</h2>
                <p>Create your first test to start optimizing your campaigns!</p>
            `;
            testsSection.appendChild(emptyState);
            return;
        }
        
        tests.forEach(test => {
            const testCard = createElement('div', { className: 'campaign-card' });
            testCard.innerHTML = `
                <div class="campaign-header">
                    <div>
                        <h3>${test.name}</h3>
                        ${test.description ? `<p class="campaign-objective">${test.description}</p>` : ''}
                    </div>
                    <span class="campaign-status status-${test.status.toLowerCase()}">${test.status}</span>
                </div>
                <div class="campaign-details">
                    <div class="campaign-detail">
                        <div class="campaign-detail-label">Variants</div>
                        <div class="campaign-detail-value">${test.variants}</div>
                    </div>
                    <div class="campaign-detail">
                        <div class="campaign-detail-label">Impressions</div>
                        <div class="campaign-detail-value">${test.impressions?.toLocaleString() || 0}</div>
                    </div>
                    <div class="campaign-detail">
                        <div class="campaign-detail-label">Conversions</div>
                        <div class="campaign-detail-value">${test.conversions?.toLocaleString() || 0}</div>
                    </div>
                    ${test.winner ? `
                    <div class="campaign-detail">
                        <div class="campaign-detail-label">Winner</div>
                        <div class="campaign-detail-value">${test.winner}</div>
                    </div>
                    ` : '<div class="campaign-detail"><div class="campaign-detail-label">Winner</div><div class="campaign-detail-value">-</div></div>'}
                </div>
                <div class="campaign-actions">
                    <button class="btn btn-primary edit-test-btn">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger delete-test-btn">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            
            // Add edit handler
            const editBtn = testCard.querySelector('.edit-test-btn');
            editBtn.addEventListener('click', async () => {
                await showABTestModal(test, refreshTests);
            });
            
            // Add delete handler
            const deleteBtn = testCard.querySelector('.delete-test-btn');
            deleteBtn.addEventListener('click', async () => {
                await showDeleteABTestConfirm(test.name, async () => {
                    const tests = loadTests();
                    const updatedTests = tests.filter(t => t.id !== test.id);
                    localStorage.setItem('ansuads_abtests', JSON.stringify(updatedTests));
                    await refreshTests();
                });
            });
            
            testsSection.appendChild(testCard);
        });
    };
    
    // A/B Tests content
    const testsHeader = createElement('div', { className: 'tests-header' });
    testsHeader.innerHTML = `
        <h2>A/B Tests</h2>
        <p>Create and manage A/B tests for your campaigns</p>
    `;
    
    const createBtn = createElement('button', {
        className: 'btn btn-primary',
        style: 'margin-top: 1rem;'
    });
    createBtn.innerHTML = '<i class="fas fa-plus"></i> Create New Test';
    createBtn.addEventListener('click', async () => {
        await showABTestModal(null, refreshTests);
    });
    testsHeader.appendChild(createBtn);
    
    // Active tests
    const testsSection = createElement('div', { className: 'campaigns-grid', style: 'margin-top: 24px;' });
    
    dashboardContent.appendChild(testsHeader);
    dashboardContent.appendChild(testsSection);
    
    main.appendChild(topBar);
    main.appendChild(dashboardContent);
    dashboard.appendChild(sidebar);
    dashboard.appendChild(main);
    container.appendChild(dashboard);
    
    // Initial load
    await refreshTests();
}
