let currentIndex = 0;

    // Function to handle search action
    function search() {
        const query = document.getElementById('search-input').value.trim();
        if (query !== '') {
            // Redirect to a search results page
            window.location.href = `/search?query=${encodeURIComponent(query)}`;
        }
    }

    // Function to show the next slide
    function nextSlide() {
        const slides = document.getElementById('slides');
        const totalSlides = slides.children.length;
        currentIndex = (currentIndex + 1) % totalSlides;
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Function to show the previous slide
    function prevSlide() {
        const slides = document.getElementById('slides');
        const totalSlides = slides.children.length;
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }