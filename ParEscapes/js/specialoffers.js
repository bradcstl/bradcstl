// Data for special offers
const specialOffersData = [
    {
      img: "images/dona.jpg",
      title: "Dona Filipa Hotel",
      nights: "4 to 6 Dec 2024",
      price: "from £532.00",
      location: "Algarve",
      features: [
        { icon: "fas fa-check-circle", text: "Buffet Breakfast" },
        { icon: "fas fa-bus-alt", text: "Free shuttle to/from golf courses" },
        { icon: "fas fa-plane", text: "Private transfers from Faro airport" },
      ],
    },
    {
      img: "images/amber.jpg",
      title: "Amber Resort",
      nights: "1 to 3 Jan 2024",
      price: "from £670.00",
      location: "Mauritius",
      features: [
        { icon: "fas fa-star", text: "All Inclusive" },
        { icon: "fas fa-wifi", text: "Free Wi-Fi" },
        { icon: "fas fa-swimmer", text: "Swimming Pool Access" },
      ],
    },
  ];
  
  // Generate HTML for special offers
  function generateSpecialOffersHTML(offers) {
    return offers
      .map(
        (offer) => `
      <div class="special-offer-card">
        <!-- Card Header -->
        <div class="special-card-header">
          <div class="special-location">${offer.location}</div>
          <div class="special-dates">${offer.nights}</div>
        </div>
  
        <!-- Card Body -->
        <div class="special-card-body">
          <!-- Left Section -->
          <div class="special-info-section">
            <div class="special-course-name">
              <i class="fas fa-map-marker-alt"></i> ${offer.title}
            </div>
            <ul class="special-features">
              ${offer.features
                .map(
                  (feature) => `
                <li>
                  <i class="${feature.icon}"></i> ${feature.text}
                </li>`
                )
                .join("")}
            </ul>
            <div class="special-price">
              <span>${offer.price}</span>
            </div>
          </div>
  
          <!-- Right Section -->
          <div class="special-photo-section">
            <img src="${offer.img}" alt="${offer.title}">
            <button class="special-enquire-button" onclick="openSpecialModal()">Enquire Now</button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }
  
  // Display special offers on page load
  document.addEventListener("DOMContentLoaded", function () {
    const offersContainer = document.querySelector(".special-offers-container");
    if (!offersContainer) {
      console.error("Special offers container not found.");
      return;
    }
    offersContainer.innerHTML = generateSpecialOffersHTML(specialOffersData);
  });
  
  // Modal functionality for special offers
  function openSpecialModal() {
    const modal = document.getElementById("specialEnquiryModal");
    if (modal) modal.style.display = "flex";
  }
  
  function closeSpecialModal() {
    const modal = document.getElementById("specialEnquiryModal");
    if (modal) modal.style.display = "none";
  }
  
  // Success modal functionality
  function showSpecialSuccessModal() {
    const successModal = document.getElementById("specialSuccessModal");
    if (successModal) successModal.style.display = "flex";
  
    document
      .getElementById("specialCloseSuccessModal")
      .addEventListener("click", closeSpecialSuccessModal);
    document
      .getElementById("specialCloseSuccessBtn")
      .addEventListener("click", closeSpecialSuccessModal);
  }
  
  function closeSpecialSuccessModal() {
    const successModal = document.getElementById("specialSuccessModal");
    if (successModal) successModal.style.display = "none";
  }