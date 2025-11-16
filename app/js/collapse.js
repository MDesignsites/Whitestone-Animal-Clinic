document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".featured-card");

    // Open the first card by default
    if (cards.length > 0) {
        cards[0].classList.add("active");
    }

    cards.forEach((card) => {
        const toggle = card.querySelector(".collapse");

        toggle.addEventListener("click", () => {
            const isActive = card.classList.contains("active");

            // Collapse all cards
            cards.forEach(c => c.classList.remove("active"));

            // Open this card only if it wasn't already open
            if (!isActive) {
                card.classList.add("active");
            }
        });
    });
});