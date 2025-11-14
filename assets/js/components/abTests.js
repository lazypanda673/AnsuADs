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
        const tests = JSON.parse(localStorage.getItem('ansuads_abtests') || '[]');
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
