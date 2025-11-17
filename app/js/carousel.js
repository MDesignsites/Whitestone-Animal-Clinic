const track = document.querySelector(".testimonial-track");
const cards = document.querySelectorAll(".testimonial-card");

let index = 0;
const total = cards.length;
const visible = 3;
const cardWidth = cards[0].offsetWidth + 24; // width + gap

// CLONE FIRST CARDS AND APPEND THEM TO THE END
for (let i = 0; i < visible; i++) {
    const clone = cards[i].cloneNode(true);
    track.appendChild(clone);
}

function moveCarousel() {
    index++;
    track.style.transition = "transform .6s ease-in-out";
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    // WHEN WE REACH THE END, TELEPORT BACK WITHOUT ANIMATION
    setTimeout(() => {
        if (index >= total) {
            track.style.transition = "none";
            track.style.transform = "translateX(0)";
            index = 0;
        }
    }, 650);
}

let autoSlide = setInterval(moveCarousel, 4000);
