document.addEventListener("DOMContentLoaded", function () {
    // --- Configuration ---
    const AUTOSLIDE_DELAY = 10000; // 10 seconds waiting time
    const ANIMATION_DURATION = 350; // 350ms for text fade/slide transition

    // Select the hidden data elements
    const dataStore = document.querySelector(".video-nav-track");
    const cards = dataStore ? dataStore.querySelectorAll(".featured-card") : [];

    // Select the content containers
    const displayContainer = document.querySelector(".active-video-container");
    const captionDisplay = document.querySelector(".video-caption-display");
    const descriptionTitle = document.querySelector(".video-nav-list h3");
    const mobileControlsDiv = document.querySelector(".slider-controls");
    const videoNavList = document.querySelector(".video-nav-list"); // Target the description wrapper

    if (cards.length === 0) return;

    let currentIndex = 0;
    const totalVideos = cards.length;
    let autoSlide;
    
    // --- Core Utility Functions ---

    // Checks current layout for conditional animation
    function isDesktopView() {
        // Matches your SCSS breakpoint (above 992px is desktop)
        return window.innerWidth > 992;
    }

    // --- Core Carousel Functions ---

    function moveCarousel(direction = 'next') {
        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex < totalVideos - 1) ? currentIndex + 1 : 0;
        } else { // 'prev'
            newIndex = (currentIndex > 0) ? currentIndex - 1 : totalVideos - 1;
        }
        updateDisplay(newIndex, direction);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => moveCarousel('next'), AUTOSLIDE_DELAY);
    }

    // --- Animation Logic for Text ---
    function animateText(newCard, direction) {
        const desktop = isDesktopView();
        
        // 1. Get current content elements
        const titleEl = videoNavList.querySelector('h3');
        const captionEl = videoNavList.querySelector('.video-caption-display');
        
        // Determine animation class based on direction and view
        // Exit class moves the OLD text off-screen
        const exitClass = desktop 
            ? (direction === 'next' ? 'slide-up-exit' : 'slide-down-exit')
            : (direction === 'next' ? 'slide-left-exit' : 'slide-right-exit');

        // Enter class is applied to the NEW text to trigger the slide-in transition
        const enterClass = desktop 
            ? (direction === 'next' ? 'slide-down-enter' : 'slide-up-enter')
            : (direction === 'next' ? 'slide-right-enter' : 'slide-left-enter');

        // 2. Apply exit animation instantly (pushes old text off-screen)
        titleEl.classList.add(exitClass);
        captionEl.classList.add(exitClass);

        // 3. Update content and trigger enter animation
        setTimeout(() => {
            // Update text content with NEW data
            titleEl.textContent = newCard.querySelector('.collapse h3').textContent;
            captionEl.textContent = newCard.querySelector('.video-caption').textContent;

            // 4. Remove exit class and prepare for enter transition
            titleEl.classList.remove(exitClass);
            captionEl.classList.remove(exitClass);
            
            // 5. Apply enter class (text is now in the starting position for the slide-in)
            titleEl.classList.add(enterClass);
            captionEl.classList.add(enterClass);

            // 6. Clean up: trigger transition back to normal (0, 0, 1 opacity)
            setTimeout(() => {
                titleEl.classList.remove(enterClass);
                captionEl.classList.remove(enterClass);
            }, ANIMATION_DURATION);
            
        }, ANIMATION_DURATION); // Wait for exit animation to finish before updating/sliding in
    }
    
    // --- HELPER FUNCTION: Renders the Active Slide Content ---
    function updateDisplay(newIndex, direction = 'next') {
        const oldIndex = currentIndex;
        currentIndex = newIndex;
        
        const activeCard = cards[currentIndex];

        // --- 1. Apply Text Animation ---
        if (oldIndex !== newIndex) {
            animateText(activeCard, direction);
        } else {
            // If it's the initial load (no animation), update content instantly
            const titleText = activeCard.querySelector('.collapse h3').textContent;
            const captionText = activeCard.querySelector('.video-caption').textContent;
            
            if (descriptionTitle) { descriptionTitle.textContent = titleText; }
            captionDisplay.textContent = captionText;
        }

        // --- 2. Update Video and Active Status ---
        // Video change happens instantly
        const iframeClone = activeCard.querySelector('.video-iframe').cloneNode(true);
        displayContainer.innerHTML = ''; 
        displayContainer.appendChild(iframeClone);
        
        // Update active class
        cards.forEach(card => card.classList.remove("active"));
        activeCard.classList.add("active");
        
        // Update counter
        const counter = document.getElementById('slideCounter');
        if (counter) {
            counter.textContent = `${currentIndex + 1}/${totalVideos}`;
        }
    }

    // --- HANDLER: Mobile/Tablet Previous/Next Buttons ---
    function setupMobileControls() {
        mobileControlsDiv.innerHTML = `
            <button id="prevBtn" aria-label="Previous Video"></button> 
            <span id="slideCounter">1/${totalVideos}</span>
            <button id="nextBtn" aria-label="Next Video"></button>
        `;
        
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        
        prevBtn.addEventListener("click", () => {
            let newIndex = (currentIndex > 0) ? currentIndex - 1 : totalVideos - 1;
            updateDisplay(newIndex, 'prev');
            resetAutoSlide(); 
        });
        
        nextBtn.addEventListener("click", () => {
            let newIndex = (currentIndex < totalVideos - 1) ? currentIndex + 1 : 0;
            updateDisplay(newIndex, 'next');
            resetAutoSlide(); 
        });
    }

    // --- Initialization ---
    setupMobileControls();
    updateDisplay(currentIndex); 
    
    // START AUTO-SLIDE
    resetAutoSlide();
});