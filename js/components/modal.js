import { createElement } from '../utils/dom.js';

export function createModal(title, content, onClose) {
    const overlay = createElement('div', { className: 'modal-overlay' });
    
    const modal = createElement('div', { className: 'modal' });
    
    // Header
    const header = createElement('div', { className: 'modal-header' });
    const titleEl = createElement('h2', { className: 'modal-title' }, [title]);
    const closeBtn = createElement('button', {
        className: 'modal-close',
        onclick: () => {
            document.body.removeChild(overlay);
            if (onClose) onClose();
        }
    }, ['×']);
    
    header.appendChild(titleEl);
    header.appendChild(closeBtn);
    
    // Body
    const body = createElement('div', { className: 'modal-body' });
    if (typeof content === 'string') {
        body.innerHTML = content;
    } else {
        body.appendChild(content);
    }
    
    modal.appendChild(header);
    modal.appendChild(body);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
            if (onClose) onClose();
        }
    });
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    return { overlay, modal, body };
}

export function showDeleteConfirm(title, message) {
    return new Promise((resolve) => {
        const content = createElement('div');
        const messageEl = createElement('p', {}, [message]);
        content.appendChild(messageEl);
        
        const footer = createElement('div', { className: 'modal-footer' });
        
        const cancelBtn = createElement('button', {
            className: 'btn btn-secondary',
            onclick: () => {
                document.body.removeChild(overlay);
                resolve(false);
            }
        }, ['Cancel']);
        
        const confirmBtn = createElement('button', {
            className: 'btn btn-danger',
            onclick: () => {
                document.body.removeChild(overlay);
                resolve(true);
            }
        }, ['Delete']);
        
        footer.appendChild(cancelBtn);
        footer.appendChild(confirmBtn);
        
        const { overlay, modal } = createModal(title, content, () => resolve(false));
        modal.appendChild(footer);
    });
}
