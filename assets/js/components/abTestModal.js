import { createElement } from '../utils/dom.js';
import { createModal } from './modal.js';

export async function showABTestModal(test, onSave) {
    const isEdit = !!test;
    const title = isEdit ? 'Edit A/B Test' : 'Create New A/B Test';
    
    const form = createElement('form', { className: 'abtest-form' });
    
    // Name
    const nameGroup = createElement('div', { className: 'form-group' });
    const nameLabel = createElement('label', { className: 'form-label', for: 'test-name' }, ['Test Name *']);
    const nameInput = createElement('input', {
        type: 'text',
        id: 'test-name',
        className: 'form-input',
        placeholder: 'e.g., Headline Test - Summer Sale',
        value: test?.name || ''
    });
    nameGroup.appendChild(nameLabel);
    nameGroup.appendChild(nameInput);
    
    // Number of Variants
    const variantsGroup = createElement('div', { className: 'form-group' });
    const variantsLabel = createElement('label', { className: 'form-label', for: 'test-variants' }, ['Number of Variants *']);
    const variantsInput = createElement('input', {
        type: 'number',
        id: 'test-variants',
        className: 'form-input',
        placeholder: '2',
        min: '2',
        max: '10',
        value: test?.variants || '2'
    });
    variantsGroup.appendChild(variantsLabel);
    variantsGroup.appendChild(variantsInput);
    
    // Date row
    const row1 = createElement('div', { className: 'form-row' });
    
    const startDateGroup = createElement('div', { className: 'form-group' });
    const startLabel = createElement('label', { className: 'form-label', for: 'test-start' }, ['Start Date *']);
    const startInput = createElement('input', {
        type: 'date',
        id: 'test-start',
        className: 'form-input',
        value: test?.startDate || ''
    });
    startDateGroup.appendChild(startLabel);
    startDateGroup.appendChild(startInput);
    
    const endDateGroup = createElement('div', { className: 'form-group' });
    const endLabel = createElement('label', { className: 'form-label', for: 'test-end' }, ['End Date *']);
    const endInput = createElement('input', {
        type: 'date',
        id: 'test-end',
        className: 'form-input',
        value: test?.endDate || ''
    });
    endDateGroup.appendChild(endLabel);
    endDateGroup.appendChild(endInput);
    
    row1.appendChild(startDateGroup);
    row1.appendChild(endDateGroup);
    
    // Target Metric
    const metricGroup = createElement('div', { className: 'form-group' });
    const metricLabel = createElement('label', { className: 'form-label', for: 'test-metric' }, ['Target Metric *']);
    const metricSelect = createElement('select', {
        id: 'test-metric',
        className: 'form-select'
    });
    
    const metrics = ['Clicks', 'Conversions', 'CTR', 'Revenue'];
    metrics.forEach(metric => {
        const option = createElement('option', { value: metric }, [metric]);
        if (test?.targetMetric === metric) option.selected = true;
        metricSelect.appendChild(option);
    });
    metricGroup.appendChild(metricLabel);
    metricGroup.appendChild(metricSelect);
    
    // Description
    const descGroup = createElement('div', { className: 'form-group' });
    const descLabel = createElement('label', { className: 'form-label', for: 'test-description' }, ['Description']);
    const descInput = createElement('textarea', {
        id: 'test-description',
        className: 'form-input',
        placeholder: 'Describe what you\'re testing...',
        rows: '3',
        value: test?.description || ''
    });
    descInput.value = test?.description || '';
    descGroup.appendChild(descLabel);
    descGroup.appendChild(descInput);
    
    // Status
    const statusGroup = createElement('div', { className: 'form-group' });
    const statusLabel = createElement('label', { className: 'form-label', for: 'test-status' }, ['Status']);
    const statusSelect = createElement('select', {
        id: 'test-status',
        className: 'form-select'
    });
    
    const statuses = ['Running', 'Paused', 'Completed'];
    statuses.forEach(status => {
        const option = createElement('option', { value: status }, [status]);
        if (test?.status === status) option.selected = true;
        statusSelect.appendChild(option);
    });
    statusGroup.appendChild(statusLabel);
    statusGroup.appendChild(statusSelect);
    
    // Assemble form
    form.appendChild(nameGroup);
    form.appendChild(variantsGroup);
    form.appendChild(row1);
    form.appendChild(metricGroup);
    form.appendChild(descGroup);
    form.appendChild(statusGroup);
    
    // Form submit handler
    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        
        const name = nameInput.value.trim();
        const variants = parseInt(variantsInput.value);
        const startDate = startInput.value;
        const endDate = endInput.value;
        const targetMetric = metricSelect.value;
        const description = descInput.value.trim();
        const status = statusSelect.value;
        
        if (!name || !variants || variants < 2 || !startDate || !endDate || !targetMetric) {
            alert('Please fill in all required fields');
            return false;
        }
        
        const testData = {
            id: test?.id || Date.now(),
            name,
            variants,
            startDate,
            endDate,
            targetMetric,
            description,
            status,
            impressions: test?.impressions || 0,
            conversions: test?.conversions || 0,
            winner: test?.winner || null
        };
        
        // Save to localStorage
        const tests = JSON.parse(localStorage.getItem('ansuads_abtests') || '[]');
        
        if (isEdit) {
            const index = tests.findIndex(t => t.id === test.id);
            if (index !== -1) {
                tests[index] = testData;
            }
        } else {
            tests.push(testData);
        }
        
        localStorage.setItem('ansuads_abtests', JSON.stringify(tests));
        
        if (onSave) {
            await onSave();
        }
        
        return true;
    };
    
    form.addEventListener('submit', handleSubmit);
    
    const actions = [
        {
            label: 'Cancel',
            className: 'btn btn-secondary',
            onClick: () => {}
        },
        {
            label: isEdit ? 'Save Changes' : 'Create Test',
            className: 'btn btn-primary',
            onClick: () => {
                return handleSubmit();
            }
        }
    ];
    
    await createModal(title, form, actions);
}

export async function showDeleteABTestConfirm(testName, onConfirm) {
    const message = createElement('p', {}, [
        `Are you sure you want to delete the A/B test "${testName}"? This action cannot be undone.`
    ]);
    
    const actions = [
        {
            label: 'Delete',
            className: 'btn btn-danger',
            onClick: async () => {
                if (onConfirm) {
                    await onConfirm();
                }
            }
        },
        {
            label: 'Cancel',
            className: 'btn btn-secondary',
            onClick: () => {}
        }
    ];
    
    await createModal('Delete A/B Test', message, actions);
}
