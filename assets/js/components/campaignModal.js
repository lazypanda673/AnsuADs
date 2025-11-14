import { createElement } from '../utils/dom.js';
import { createModal } from './modal.js';
import { createCampaign, updateCampaign, createVariant, deleteVariant } from '../api/mockData.js';
import { validateRequired, validateNumber, validateDateRange } from '../utils/validation.js';

export async function showCampaignModal(campaign, onSave) {
    console.log('showCampaignModal called with:', campaign);
    const isEdit = !!campaign;
    const title = isEdit ? 'Edit Campaign' : 'Create Campaign';
    
    const form = createElement('form', { className: 'campaign-form' });
    
    // Name
    const nameGroup = createElement('div', { className: 'form-group' });
    const nameLabel = createElement('label', { className: 'form-label', for: 'campaign-name' }, ['Campaign Name *']);
    const nameInput = createElement('input', {
        type: 'text',
        id: 'campaign-name',
        className: 'form-input',
        placeholder: 'Enter campaign name',
        value: campaign?.name || ''
    });
    const nameError = createElement('div', { className: 'error-message hidden', id: 'name-error' });
    nameGroup.appendChild(nameLabel);
    nameGroup.appendChild(nameInput);
    nameGroup.appendChild(nameError);
    
    // Objective
    const objectiveGroup = createElement('div', { className: 'form-group' });
    const objectiveLabel = createElement('label', { className: 'form-label', for: 'campaign-objective' }, ['Objective']);
    const objectiveInput = createElement('input', {
        type: 'text',
        id: 'campaign-objective',
        className: 'form-input',
        placeholder: 'e.g., Brand Awareness, Lead Generation',
        value: campaign?.objective || ''
    });
    objectiveGroup.appendChild(objectiveLabel);
    objectiveGroup.appendChild(objectiveInput);
    
    // Budget and Status row
    const row1 = createElement('div', { className: 'form-row' });
    
    const budgetGroup = createElement('div', { className: 'form-group' });
    const budgetLabel = createElement('label', { className: 'form-label', for: 'campaign-budget' }, ['Budget (USD) *']);
    const budgetInput = createElement('input', {
        type: 'number',
        id: 'campaign-budget',
        className: 'form-input',
        placeholder: '0.00',
        step: '0.01',
        min: '0',
        value: campaign?.budget || ''
    });
    const budgetError = createElement('div', { className: 'error-message hidden', id: 'budget-error' });
    budgetGroup.appendChild(budgetLabel);
    budgetGroup.appendChild(budgetInput);
    budgetGroup.appendChild(budgetError);
    
    const statusGroup = createElement('div', { className: 'form-group' });
    const statusLabel = createElement('label', { className: 'form-label', for: 'campaign-status' }, ['Status']);
    const statusSelect = createElement('select', {
        id: 'campaign-status',
        className: 'form-select'
    });
    
    const statuses = ['draft', 'active', 'paused', 'completed'];
    statuses.forEach(status => {
        const option = createElement('option', { value: status }, [status.charAt(0).toUpperCase() + status.slice(1)]);
        if (campaign?.status === status) option.selected = true;
        statusSelect.appendChild(option);
    });
    statusGroup.appendChild(statusLabel);
    statusGroup.appendChild(statusSelect);
    
    row1.appendChild(budgetGroup);
    row1.appendChild(statusGroup);
    
    // Date row
    const row2 = createElement('div', { className: 'form-row' });
    
    const startDateGroup = createElement('div', { className: 'form-group' });
    const startLabel = createElement('label', { className: 'form-label', for: 'campaign-start' }, ['Start Date *']);
    const startInput = createElement('input', {
        type: 'date',
        id: 'campaign-start',
        className: 'form-input',
        value: campaign?.start_date || ''
    });
    const startError = createElement('div', { className: 'error-message hidden', id: 'start-error' });
    startDateGroup.appendChild(startLabel);
    startDateGroup.appendChild(startInput);
    startDateGroup.appendChild(startError);
    
    const endDateGroup = createElement('div', { className: 'form-group' });
    const endLabel = createElement('label', { className: 'form-label', for: 'campaign-end' }, ['End Date *']);
    const endInput = createElement('input', {
        type: 'date',
        id: 'campaign-end',
        className: 'form-input',
        value: campaign?.end_date || ''
    });
    const endError = createElement('div', { className: 'error-message hidden', id: 'end-error' });
    endDateGroup.appendChild(endLabel);
    endDateGroup.appendChild(endInput);
    endDateGroup.appendChild(endError);
    
    row2.appendChild(startDateGroup);
    row2.appendChild(endDateGroup);
    
    // Variants section (only for edit mode)
    let variantsSection = null;
    if (isEdit) {
        variantsSection = createVariantsSection(campaign);
    }
    
    // Assemble form
    form.appendChild(nameGroup);
    form.appendChild(objectiveGroup);
    form.appendChild(row1);
    form.appendChild(row2);
    if (variantsSection) {
        form.appendChild(variantsSection);
    }
    
    // Form submit handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submitted');
        
        // Clear errors
        document.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));
        
        // Validate
        const name = nameInput.value.trim();
        const budget = budgetInput.value.trim();
        const startDate = startInput.value;
        const endDate = endInput.value;
        
        let hasError = false;
        
        if (!validateRequired(name)) {
            nameError.textContent = 'Campaign name is required';
            nameError.classList.remove('hidden');
            hasError = true;
        }
        
        if (!validateRequired(budget) || !validateNumber(budget)) {
            budgetError.textContent = 'Valid budget is required';
            budgetError.classList.remove('hidden');
            hasError = true;
        }
        
        if (!validateRequired(startDate)) {
            startError.textContent = 'Start date is required';
            startError.classList.remove('hidden');
            hasError = true;
        }
        
        if (!validateRequired(endDate)) {
            endError.textContent = 'End date is required';
            endError.classList.remove('hidden');
            hasError = true;
        }
        
        if (startDate && endDate && !validateDateRange(startDate, endDate)) {
            endError.textContent = 'End date must be after start date';
            endError.classList.remove('hidden');
            hasError = true;
        }
        
        if (hasError) return;
        
        const campaignData = {
            name,
            objective: objectiveInput.value.trim(),
            budget: parseFloat(budget),
            status: statusSelect.value,
            start_date: startDate,
            end_date: endDate
        };
        
        try {
            console.log('Saving campaign:', campaignData);
            if (isEdit) {
                await updateCampaign(campaign.id, campaignData);
                console.log('Campaign updated');
            } else {
                const newCampaign = await createCampaign(campaignData);
                console.log('Campaign created:', newCampaign);
            }
            
            document.body.removeChild(overlay);
            if (onSave) await onSave();
        } catch (error) {
            console.error('Error saving campaign:', error);
            alert('Error saving campaign: ' + error.message);
        }
    });
    
    // Footer with both buttons - add to form before creating modal
    const footer = createElement('div', { className: 'modal-footer' });
    
    const cancelBtn = createElement('button', {
        type: 'button',
        className: 'btn btn-secondary',
        onclick: (e) => {
            e.preventDefault();
            const overlay = document.querySelector('.modal-overlay');
            if (overlay) document.body.removeChild(overlay);
        }
    }, ['Cancel']);
    
    const saveBtn = createElement('button', {
        type: 'submit',
        className: 'btn btn-primary'
    }, [isEdit ? 'Update' : 'Create']);
    
    footer.appendChild(cancelBtn);
    footer.appendChild(saveBtn);
    form.appendChild(footer);
    
    // Create modal with the complete form (including footer)
    const { overlay, modal } = createModal(title, form);
    console.log('Modal created, overlay:', overlay);
}

function createVariantsSection(campaign) {
    const section = createElement('div', { className: 'variants-section' });
    
    const header = createElement('div', { className: 'variants-header' });
    const title = createElement('h3', { className: 'variants-title' }, ['Variants']);
    const addBtn = createElement('button', {
        type: 'button',
        className: 'btn btn-success',
        onclick: () => addVariant(campaign, variantsList)
    }, ['+ Add Variant']);
    
    header.appendChild(title);
    header.appendChild(addBtn);
    
    const variantsList = createElement('div', { className: 'variants-list' });
    
    if (campaign.variants && campaign.variants.length > 0) {
        campaign.variants.forEach(variant => {
            const variantItem = createVariantItem(campaign, variant, variantsList);
            variantsList.appendChild(variantItem);
        });
    }
    
    section.appendChild(header);
    section.appendChild(variantsList);
    
    return section;
}

function createVariantItem(campaign, variant, container) {
    const item = createElement('div', { className: 'variant-item' });
    
    const header = createElement('div', { className: 'variant-header' });
    const name = createElement('div', { className: 'variant-name' }, [variant.name || 'Variant']);
    const deleteBtn = createElement('button', {
        type: 'button',
        className: 'variant-delete',
        onclick: async () => {
            await deleteVariant(campaign.id, variant.id);
            container.removeChild(item);
        }
    }, ['Delete']);
    
    header.appendChild(name);
    header.appendChild(deleteBtn);
    
    const details = createElement('div', { className: 'variant-details' }, [
        `Creative: ${variant.creative_text || 'N/A'}`
    ]);
    
    item.appendChild(header);
    item.appendChild(details);
    
    return item;
}

function addVariant(campaign, container) {
    const variantName = prompt('Enter variant name:');
    if (!variantName) return;
    
    const creativeText = prompt('Enter creative text:');
    
    createVariant(campaign.id, {
        name: variantName,
        creative_text: creativeText || '',
        creative_url: ''
    }).then(variant => {
        const item = createVariantItem(campaign, variant, container);
        container.appendChild(item);
    }).catch(error => {
        alert('Error creating variant: ' + error.message);
    });
}
