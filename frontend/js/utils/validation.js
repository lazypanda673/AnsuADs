// Validation utilities

export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function validateRequired(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
}

export function validateNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

export function validateDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

export function validateDateRange(startDate, endDate) {
    if (!validateDate(startDate) || !validateDate(endDate)) {
        return false;
    }
    return new Date(startDate) <= new Date(endDate);
}

export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

export function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
