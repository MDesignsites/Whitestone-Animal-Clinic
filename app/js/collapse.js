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

// FAQs collapsible logic
    const faqCards = document.querySelectorAll(".faq-card");

    faqCards.forEach((faq) => {
        const toggle = faq.querySelector(".faq-collapse");
        const arrowImg =  faq.querySelector("img");

        toggle.addEventListener("click", () => {
            const isActive = faq.classList.contains("active");

            faqCards.forEach(f => {
            f.classList.remove("active");
            const img = f.querySelector(".faq-collapse img");
            if (img) img.src = "./app/img/icons8-arrow-down-50.png";
        });
        if (!isActive) {
            faq.classList.add("active");
            arrowImg.src = "./app/img/icons8-arrow-up-50.png";
        }
    });
});
});