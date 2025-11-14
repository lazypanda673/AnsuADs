import { createElement } from '../utils/dom.js';
import { createSidebar, createTopBar } from '../utils/layout.js';

export async function showABTests(container) {
    container.innerHTML = '';
    
    const dashboard = createElement('div', { className: 'dashboard' });
    const sidebar = createSidebar('/ab-tests');
    const main = createElement('div', { className: 'dashboard-main' });
    const topBar = createTopBar('A/B Tests');
    const dashboardContent = createElement('div', { className: 'dashboard-content' });
    
    // A/B Tests content
    const testsHeader = createElement('div', { className: 'tests-header' });
    testsHeader.innerHTML = `
        <p>Create and manage A/B tests for your campaigns</p>
        <button class="btn btn-primary" style="margin-top: 1rem;">+ Create New Test</button>
    `;
    
    // Active tests
    const testsSection = createElement('div', { className: 'campaigns-grid' });
    
    // Sample A/B tests
    const sampleTests = [
        {
            name: 'Headline Test - Summer Sale',
            variants: 2,
            status: 'Running',
            winner: null,
            impressions: 5420,
            conversions: 234
        },
        {
            name: 'CTA Button Color Test',
            variants: 3,
            status: 'Completed',
            winner: 'Variant B',
            impressions: 8900,
            conversions: 445
        }
    ];
    
    sampleTests.forEach(test => {
        const testCard = createElement('div', { className: 'campaign-card' });
        testCard.innerHTML = `
            <div class="campaign-header">
                <h3>${test.name}</h3>
                <span class="campaign-status status-${test.status.toLowerCase()}">${test.status}</span>
            </div>
            <div class="campaign-details">
                <p><strong>Variants:</strong> ${test.variants}</p>
                <p><strong>Impressions:</strong> ${test.impressions.toLocaleString()}</p>
                <p><strong>Conversions:</strong> ${test.conversions}</p>
                ${test.winner ? `<p><strong>Winner:</strong> ${test.winner}</p>` : '<p><em>No winner yet</em></p>'}
            </div>
            <div class="campaign-actions">
                <button class="btn btn-secondary">View Details</button>
                <button class="btn btn-secondary">Edit</button>
            </div>
        `;
        testsSection.appendChild(testCard);
    });
    
    // Empty state
    if (sampleTests.length === 0) {
        const emptyState = createElement('div', { className: 'empty-state' });
        emptyState.innerHTML = `
            <p>No A/B tests yet. Create your first test to start optimizing your campaigns!</p>
        `;
        testsSection.appendChild(emptyState);
    }
    
    dashboardContent.appendChild(testsHeader);
    dashboardContent.appendChild(testsSection);
    
    main.appendChild(topBar);
    main.appendChild(dashboardContent);
    dashboard.appendChild(sidebar);
    dashboard.appendChild(main);
    container.appendChild(dashboard);
}
