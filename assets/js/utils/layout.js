import { createElement } from './dom.js';
import { getAuthUser, logout } from './auth.js';
import { navigate } from '../router.js';

export function createSidebar(activeRoute = '/dashboard') {
    const sidebar = createElement('aside', { className: 'dashboard-sidebar' });
    
    const sidebarHeader = createElement('div', { className: 'sidebar-header' });
    const logo = createElement('div', { className: 'sidebar-logo' });
    logo.innerHTML = '<span class="logo-icon">🎯</span> AnsuADs';
    logo.style.cursor = 'pointer';
    logo.onclick = () => navigate('/dashboard');
    sidebarHeader.appendChild(logo);
    
    const nav = createElement('nav', { className: 'sidebar-nav' });
    
    const navItems = [
        { icon: '📊', label: 'Dashboard', route: '/dashboard' },
        { icon: '📢', label: 'Campaigns', route: '/campaigns' },
        { icon: '📈', label: 'Analytics', route: '/analytics' },
        { icon: '🎯', label: 'A/B Tests', route: '/ab-tests' },
        { icon: '⚙️', label: 'Settings', route: '/settings' }
    ];
    
    navItems.forEach(item => {
        const navItem = createElement('a', {
            href: '#',
            className: `sidebar-nav-item ${item.route === activeRoute ? 'active' : ''}`,
            onclick: (e) => {
                e.preventDefault();
                navigate(item.route);
            }
        });
        
        const icon = createElement('span', { className: 'sidebar-nav-icon' }, [item.icon]);
        const label = createElement('span', {}, [item.label]);
        
        navItem.appendChild(icon);
        navItem.appendChild(label);
        nav.appendChild(navItem);
    });
    
    const sidebarFooter = createElement('div', { className: 'sidebar-footer' });
    
    const profileLink = createElement('a', {
        href: '#',
        className: 'sidebar-nav-item',
        onclick: (e) => {
            e.preventDefault();
            navigate('/profile');
        }
    });
    profileLink.innerHTML = '<span class="sidebar-nav-icon">👤</span><span>Profile</span>';
    
    const logoutBtn = createElement('button', {
        className: 'sidebar-logout-btn',
        onclick: () => {
            logout();
            navigate('/login');
        }
    });
    logoutBtn.innerHTML = '<span class="nav-icon">🚪</span><span class="nav-text">Logout</span>';
    
    sidebarFooter.appendChild(profileLink);
    sidebarFooter.appendChild(logoutBtn);
    
    sidebar.appendChild(sidebarHeader);
    sidebar.appendChild(nav);
    sidebar.appendChild(sidebarFooter);
    
    return sidebar;
}

export function createTopBar(pageTitle = 'Dashboard') {
    const user = getAuthUser();
    const topbar = createElement('div', { className: 'dashboard-topbar' });
    
    const topbarLeft = createElement('div', { className: 'topbar-left' });
    const title = createElement('h1', { className: 'page-title' }, [pageTitle]);
    topbarLeft.appendChild(title);
    
    const topbarRight = createElement('div', { className: 'topbar-right' });
    
    const profileMenu = createElement('div', { className: 'profile-menu' });
    
    const profileAvatar = createElement('div', { className: 'profile-avatar' });
    const initials = user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U';
    profileAvatar.textContent = initials;
    
    const profileInfo = createElement('div', { className: 'profile-info' });
    const profileName = createElement('div', { className: 'profile-name' }, [user?.name || 'User']);
    const profileEmail = createElement('div', { className: 'profile-email' }, [user?.email || '']);
    
    profileInfo.appendChild(profileName);
    profileInfo.appendChild(profileEmail);
    
    profileMenu.appendChild(profileAvatar);
    profileMenu.appendChild(profileInfo);
    profileMenu.style.cursor = 'pointer';
    profileMenu.onclick = () => navigate('/profile');
    
    topbarRight.appendChild(profileMenu);
    topbar.appendChild(topbarLeft);
    topbar.appendChild(topbarRight);
    
    return topbar;
}
