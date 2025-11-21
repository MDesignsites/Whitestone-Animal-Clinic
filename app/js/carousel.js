const track = document.querySelector(".testimonial-track");
const originalCards = [...document.querySelectorAll(".testimonial-card")];

let cards = originalCards; // Reference to all cards (originals + clones)
let index = 0;
let visible = getVisibleCards();
let total; // Total number of original cards
const CARD_GAP = 24;

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
    return cards.length > 0 ? cards[0].offsetWidth + CARD_GAP : 0;
}

// --- Carousel Logic ---

function cloneCards() {
    // 1. Clear existing track content
    track.innerHTML = ''; 
    
    // 2. Append original cards
    originalCards.forEach(card => track.appendChild(card.cloneNode(true)));
    
    // 3. Append clones of the first 'visible' cards to the end (for smooth loop back)
    for (let i = 0; i < visible; i++) {
        const clone = originalCards[i].cloneNode(true);
        track.appendChild(clone);
    }
}

function buildCarousel() {
    cloneCards();
    
    // Update the list of all cards (originals + clones)
    cards = [...document.querySelectorAll(".testimonial-card")];

    // Total original cards (this is where the index needs to reset)
    total = originalCards.length;
    index = 0;

    // Reset track position immediately
    track.style.transition = "none";
    track.style.transform = "translateX(0)";
}

function moveCarousel() {
    const cardOffset = getCardOffset();
    
    // The index moves one step, triggering the transition
    index++;
    track.style.transition = `transform 0.6s ease-in-out`;
    track.style.transform = `translateX(-${index * cardOffset}px)`;

    // Check if the current index has moved past the last ORIGINAL card
    // which means we are now viewing one of the CLONED cards at the end.
    if (index >= total) {
        // Wait for the transition to finish (650ms)
        setTimeout(() => {
            // Instant jump back to the start (index 0)
            // This jump is invisible because the last cloned card 
            // is visually identical to the first original card at index 0.
            track.style.transition = "none";
            track.style.transform = "translateX(0)";
            index = 0;
        }, 650); 
    }
}

// --- Initialization and Event Handling ---

// Initial setup
buildCarousel();

// Start auto-slide
let autoSlide = setInterval(moveCarousel, 4000);

// Resize Handler
window.addEventListener("resize", () => {
    let newVisible = getVisibleCards();
    
    // Only rebuild if the number of visible cards (i.e., breakpoint) changes
    if (newVisible !== visible) {
        clearInterval(autoSlide);
        visible = newVisible;
        
        // Rebuild the DOM and reset
        buildCarousel();

        // Restart auto-slide
        autoSlide = setInterval(moveCarousel, 4000);
    }
});