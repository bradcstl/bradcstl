 // Fade-in effect when scrolling to the "Why Choose Us" section
 window.addEventListener('scroll', function () {
    const cards = document.querySelectorAll('.why-choose-us-wrapper .card');
    const section = document.querySelector('.why-choose-us-wrapper');
    const sectionPosition = section.getBoundingClientRect();
    const screenHeight = window.innerHeight;

    // Check if section is in view
    if (sectionPosition.top < screenHeight && sectionPosition.bottom > 0) {
        // Add fade-in class to each card when section is visible
        cards.forEach((card) => {
            card.classList.add('active');
        });
    } else {
        // Remove fade-in class (reset) when section is out of view
        cards.forEach((card) => {
            card.classList.remove('active');
        });
    }
});