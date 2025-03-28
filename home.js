document.addEventListener("DOMContentLoaded", function () {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    // Check Local Storage for Theme
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeToggleBtn.textContent = "☀️"; // Sun icon for Light mode
    }

    themeToggleBtn.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Save Theme Preference
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggleBtn.textContent = "☀️"; // Change to Sun
        } else {
            localStorage.setItem("theme", "light");
            themeToggleBtn.textContent = "🌙"; // Change to Moon
        }
    });
});
