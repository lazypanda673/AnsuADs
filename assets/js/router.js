// Navigate function
export function navigate(path) {
    window.history.pushState({}, '', path);
    // Trigger router by dispatching custom event
    const event = new Event('popstate');
    window.dispatchEvent(event);
}
