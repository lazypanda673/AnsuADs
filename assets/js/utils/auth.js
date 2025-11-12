// Authentication utilities

const AUTH_KEY = 'ansuads_auth';

export function login(email, password) {
    // Mock login validation
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    
    // For demo purposes, accept any email/password
    // In production, this would validate against backend
    const user = {
        id: 1,
        email: email,
        name: email.split('@')[0],
        role: 'admin'
    };
    
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
}

export function logout() {
    localStorage.removeItem(AUTH_KEY);
}

export function getAuthUser() {
    const userStr = localStorage.getItem(AUTH_KEY);
    if (!userStr) return null;
    
    try {
        return JSON.parse(userStr);
    } catch (e) {
        return null;
    }
}

export function isAuthenticated() {
    return getAuthUser() !== null;
}
