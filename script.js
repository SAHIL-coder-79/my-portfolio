document.addEventListener("DOMContentLoaded", function () {
    console.log("Portfolio Loaded!");

    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    function setTheme(dark) {
        if (dark) {
            body.classList.add('dark-theme');
            themeToggle.checked = true;
            themeIcon.textContent = '☀️';
        } else {
            body.classList.remove('dark-theme');
            themeToggle.checked = false;
            themeIcon.textContent = '🌙';
        }
    }

    themeToggle.addEventListener('change', function () {
        setTheme(themeToggle.checked);
        localStorage.setItem('portfolioTheme', themeToggle.checked ? 'dark' : 'light');
    });

    // On load, check for saved theme
    if (localStorage.getItem('portfolioTheme') === 'dark') {
        setTheme(true);
    } else {
        setTheme(false);
    }
});
