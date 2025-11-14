import { createElement } from '../utils/dom.js';
import { getAuthUser, logout } from '../utils/auth.js';
import { navigate } from '../router.js';

export function createHeader() {
    const user = getAuthUser();
    
    const header = createElement('header', { className: 'header' });
    const container = createElement('div', { className: 'header-container container' });
    
    // Logo
    const logo = createElement('a', {
        href: '#',
        className: 'header-logo',
        onclick: (e) => {
            e.preventDefault();
            navigate('/dashboard');
        }
    }, ['AnsuADs']);
    
    // Nav
    const nav = createElement('nav', { className: 'header-nav' });
    
    if (user) {
        const userDiv = createElement('div', { className: 'header-user' });
        const username = createElement('span', { className: 'header-username' }, [user.name || user.email]);
        const logoutBtn = createElement('button', {
            className: 'btn btn-secondary header-logout',
            onclick: () => {
                logout();
                navigate('/login');
            }
        }, ['Logout']);
        
        userDiv.appendChild(username);
        userDiv.appendChild(logoutBtn);
        nav.appendChild(userDiv);
    }
    
    container.appendChild(logo);
    container.appendChild(nav);
    header.appendChild(container);
    
    return header;
}
