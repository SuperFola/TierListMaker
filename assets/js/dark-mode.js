function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const darkModeEnabled = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', darkModeEnabled);
    updateDarkModeButton(darkModeEnabled);
}

function updateDarkModeButton(darkModeEnabled) {
    const button = document.getElementById('darkModeToggle');
    if (darkModeEnabled) {
        button.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        button.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
}

function initDarkMode() {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
    }
    updateDarkModeButton(darkModeEnabled);
}

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
});