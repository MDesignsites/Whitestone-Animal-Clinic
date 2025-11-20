const track = document.querySelector(".testimonial-track");
const originalCards = [...document.querySelectorAll(".testimonial-card")];
let cards = originalCards;

let index = 0;
let visible = getVisibleCards();
let total;
const CARD_GAP = 24; // Matches the 1.5rem (24px) gap in SCSS

// --- Core Utility Functions ---

function getVisibleCards() {
    // Match breakpoints from SCSS
    if (window.innerWidth <= 576) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

function getCardOffset() {
    // Calculates the width of ONE card PLUS the gap.
    // Assumes all cards have the same width.
    return cards[0].offsetWidth + CARD_GAP;
}

// --- Carousel Logic ---

function cloneCards() {
    // Clone exactly 'visible' cards and append them to the end of the track
    for (let i = 0; i < visible; i++) {
        const clone = cards[i].cloneNode(true);
        track.appendChild(clone);
    }
}

function buildCarousel() {
    // 1. Ensure the track only has the original cards first
    track.innerHTML = '';
    originalCards.forEach(card => track.appendChild(card.cloneNode(true)));
    
    // 2. Get the full list of cards (originals + clones)
    cards = [...document.querySelectorAll(".testimonial-card")];

    // 3. Clone the necessary number of cards for the loop
    cloneCards();
    
    // 4. Reset state variables
    total = cards.length - visible;
    index = 0;

    // 5. Reset track position immediately
    track.style.transition = "none";
    track.style.transform = "translateX(0)";
}

function moveCarousel() {
    const cardOffset = getCardOffset();
    index++;
    
    track.style.transition = `transform 0.6s ease-in-out`;
    track.style.transform = `translateX(-${index * cardOffset}px)`;

    // Check if we've moved past the last original card
    setTimeout(() => {
        if (index >= total) {
            // Instant jump back to the start
            track.style.transition = "none";
            track.style.transform = "translateX(0)";
            index = 0;
        }
    }, 650); // Slightly longer than transition duration
}

// --- Initialization and Event Handling ---

// Initial setup
buildCarousel();

// Start auto-slide
let autoSlide = setInterval(moveCarousel, 4000);

// Resize Handler
window.addEventListener("resize", () => {
    // Debounce the resize to prevent running too often
    let newVisible = getVisibleCards();
    
    if (newVisible !== visible) {
        clearInterval(autoSlide);
        visible = newVisible;
        
        // Rebuild the DOM and reset
        buildCarousel();

        // Restart auto-slide
        autoSlide = setInterval(moveCarousel, 4000);
    }
});