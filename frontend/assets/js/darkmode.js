const dayNight = document.querySelector(".day-night");
const body = document.body;
const icon = dayNight.querySelector("i");

// Function to check if it's nighttime (between 6 PM and 6 AM)
function isNightTime() {
    const hour = new Date().getHours();
    return hour < 6 || hour >= 18;
}

// Function to update theme based on time
function updateTheme() {
    if (isNightTime()) {
        body.classList.add("dark");
        icon.classList.add("fa-sun");
        icon.classList.remove("fa-moon");
    } else {
        body.classList.remove("dark");
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

// Manual toggle functionality
dayNight.addEventListener("click", () => {
    icon.classList.toggle("fa-sun");
    icon.classList.toggle("fa-moon");
    body.classList.toggle("dark");
});

// Initial theme setup
window.addEventListener("load", () => {
    updateTheme();
});

// Check and update theme every minute
setInterval(updateTheme, 60000);

// Update theme when tab becomes visible
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        updateTheme();
    }
});
