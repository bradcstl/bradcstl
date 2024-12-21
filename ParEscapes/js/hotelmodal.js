// Variables for slider functionality
let currentIndex = 0;
const imageHeight = 150;
const imagesContainer = document.getElementById("secondary-images");
const totalImages = imagesContainer.children.length;
const visibleImagesCount = 3;

function scrollUp() {
    if (currentIndex > 0) {
        currentIndex--;
        imagesContainer.style.transform = `translateY(-${currentIndex * imageHeight}px)`;
    }
}

function scrollDown() {
    if (currentIndex < totalImages - visibleImagesCount) {
        currentIndex++;
        imagesContainer.style.transform = `translateY(-${currentIndex * imageHeight}px)`;
    }
}

// Modal functionality
function openModall(imageSrc) {
    document.getElementById("modalImage").src = imageSrc;
    document.getElementById("modalOverlay").classList.add("active");
}

function closeModall() {
    document.getElementById("modalOverlay").classList.remove("active");
}