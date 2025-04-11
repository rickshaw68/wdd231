export function updateFooter() {
    const yearSpan = document.getElementById('current-year');
    const lastUpdatedSpan = document.getElementById('last-updated');

    const now = new Date();
    yearSpan.textContent = document.lastModified;
}