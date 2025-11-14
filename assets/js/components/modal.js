import { createElement } from '../utils/dom.js';

export function createModal(title, content, actions = null, onClose = null) {
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
    
    // Footer with action buttons
    if (actions && actions.length > 0) {
        const footer = createElement('div', { className: 'modal-footer' });
        
        actions.forEach(action => {
            const btn = createElement('button', {
                className: action.className || 'btn btn-secondary',
                onclick: () => {
                    if (action.onClick) {
                        const result = action.onClick();
                        if (result !== false) {
                            document.body.removeChild(overlay);
                        }
                    } else {
                        document.body.removeChild(overlay);
                    }
                }
            }, [action.label]);
            footer.appendChild(btn);
        });
        
        modal.appendChild(footer);
    }
    
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
        
        const actions = [
            {
                label: 'Cancel',
                className: 'btn btn-secondary',
                onClick: () => {
                    resolve(false);
                }
            },
            {
                label: 'Delete',
                className: 'btn btn-danger',
                onClick: () => {
                    resolve(true);
                }
            }
        ];
        
        createModal(title, content, actions, () => resolve(false));
    });
}
