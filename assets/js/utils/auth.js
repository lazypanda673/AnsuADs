// Authentication utilities with client-side password hashing

const AUTH_KEY = 'ansuads_auth';
const USERS_KEY = 'ansuads_users';

// Hash password using Web Crypto API (SHA-256)
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Get all registered users from localStorage
function getUsers() {
    const usersStr = localStorage.getItem(USERS_KEY);
    if (!usersStr) return [];
    
    try {
        return JSON.parse(usersStr);
    } catch (e) {
        return [];
    }
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Register a new user
export async function register(email, password, firstName, lastName) {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    
    const users = getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('An account with this email already exists');
    }
    
    // Hash the password
    const passwordHash = await hashPassword(password);
    
    // Create new user
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        email: email.toLowerCase(),
        firstName: firstName,
        lastName: lastName,
        name: `${firstName} ${lastName}`,
        passwordHash: passwordHash,
        role: 'user',
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    // Auto-login after registration
    const userSession = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
    };
    
    localStorage.setItem(AUTH_KEY, JSON.stringify(userSession));
    return userSession;
}

// Login with email and password validation
export async function login(email, password) {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
        throw new Error('Invalid email or password');
    }
    
    // Hash the provided password and compare
    const passwordHash = await hashPassword(password);
    
    if (user.passwordHash !== passwordHash) {
        throw new Error('Invalid email or password');
    }
    
    // Create session (without password hash)
    const userSession = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    };
    
    localStorage.setItem(AUTH_KEY, JSON.stringify(userSession));
    return userSession;
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
