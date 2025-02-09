document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    // Toggle menu
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
});
