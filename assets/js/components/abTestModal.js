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
    form.appendChild(descGroup);
    form.appendChild(statusGroup);
    
    // Form submit handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = nameInput.value.trim();
        const variants = parseInt(variantsInput.value);
        const description = descInput.value.trim();
        const status = statusSelect.value;
        
        if (!name || !variants || variants < 2) {
            alert('Please fill in all required fields');
            return;
        }
        
        const testData = {
            id: test?.id || Date.now(),
            name,
            variants,
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
    });
    
    const actions = [
        {
            label: isEdit ? 'Save Changes' : 'Create Test',
            className: 'btn btn-primary',
            onClick: () => {
                form.dispatchEvent(new Event('submit'));
            }
        },
        {
            label: 'Cancel',
            className: 'btn btn-secondary',
            onClick: () => {}
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
