// Wait until the DOM is fully loaded
$(document).ready(function () {
    // Preview Image Slider Navigation
    let currentImageIndex = 0; // Start with the first image
    const previewImages = $(".preview-slider img"); // Get all preview images
  
    // Click on a preview image to enlarge it
    $(".preview-slider img").on("click", function () {
      const imageSrc = $(this).attr("src"); // Get the image source
      showImageModal(imageSrc); // Call function to show modal
    });
  
    // Function to handle next image
    $(".next-btn").on("click", function () {
      currentImageIndex = (currentImageIndex + 1) % previewImages.length; // Loop back to the first image
      updatePreviewSlider();
    });
  
    // Function to handle previous image
    $(".prev-btn").on("click", function () {
      currentImageIndex =
        (currentImageIndex - 1 + previewImages.length) % previewImages.length; // Loop back to the last image
      updatePreviewSlider();
    });
  
    // Function to update the preview slider
    function updatePreviewSlider() {
      previewImages.removeClass("active").addClass("opaque"); // Reset all images
      $(previewImages[currentImageIndex]).removeClass("opaque").addClass("active"); // Highlight the current image
    }
  
    // Show the modal with the enlarged image
    function showImageModal(imageSrc) {
      const modal = $(".image-modal");
      modal.find("img").attr("src", imageSrc); // Set the modal image
      modal.show(); // Display the modal
    }
  
    // Close the modal
    $(".image-modal .close-btn").on("click", function () {
      $(".image-modal").hide(); // Hide the modal
    });
  
    // Handle "View All Breaks" button click
    $(".view-all-breaks").on("click", function (e) {
      e.preventDefault(); // Prevent default link behavior
      alert("Redirecting to all breaks..."); // Example action
      // You can replace this with your custom functionality (e.g., redirect to another page)
    });
  });