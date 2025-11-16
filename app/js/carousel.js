const track = document.querySelector(".testimonial-track");
const cards = document.querySelectorAll(".testimonial-card");

let index = 0;
const total = cards.length;
const visible = 3;                 // number of visible cards
const cardWidth = cards[0].offsetWidth + 24;   // card width + gap

function moveCarousel() {
    index = (index + 1) % total;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
}

// auto scroll every 4 seconds
setInterval(moveCarousel, 4000);