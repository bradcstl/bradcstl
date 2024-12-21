// Data for each tab category
const golfBreaksData = {
  "All Inclusive": [
    {
      img: "images/dona.jpg",
      title: "Dona Filipa Hotel",
      nights: "4 to 6 Dec 2024",
      price: "from £1109.00",
      location: "Mauritius",
      features: [
        { icon: "fas fa-star", text: "All Inclusive" },
        { icon: "fas fa-shuttle-van", text: "Free Golf Course Shuttle Included" },
        { icon: "fas fa-golf-ball", text: "Unlimited Golf Included" },
      ],
    },
    {
      img: "images/dona.jpg",
      title: "Dona Filipa Hotel",
      nights: "4 to 6 Dec 2024",
      price: "from £1109.00",
      location: "Mauritius",
      features: [
        { icon: "fas fa-star", text: "All Inclusive" },
        { icon: "fas fa-shuttle-van", text: "Free Golf Course Shuttle Included" },
        { icon: "fas fa-golf-ball", text: "Unlimited Golf Included" },
      ],
    },
  ],
  // Add more categories and cards here...
};

// Function to generate the card HTML for each category
function generateCardsHTML(cards) {
  return cards
    .map(
      (card) => `
    <div class="golf-card">
      <!-- Card Header -->
      <div class="card-header">
        <div class="location">${card.location}</div>
        <div class="dates">${card.nights}</div>
      </div>

      <!-- Card Body -->
      <div class="card-body">
        <!-- Left Section -->
        <div class="info-section">
          <div class="course-name">
            <i class="fas fa-map-marker-alt"></i> ${card.title}
          </div>
          <ul class="features">
            ${card.features
              .map(
                (feature) => `
              <li>
                <i class="${feature.icon}"></i> ${feature.text}
              </li>`
              )
              .join("")}
          </ul>
          <div class="price">
            <span>${card.price}</span>
          </div>
        </div>

        <!-- Right Section -->
        <div class="photo-section">
          <img src="${card.img}" alt="${card.title}">
          <button class="enquire-button" onclick="openModal()">Enquire Now</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Function to apply fade-in animation for cards
function fadeInCards() {
  const cards = document.querySelectorAll(".golf-card");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("active");
    }, index * 100); // Staggered delay for fade-in effect
  });
}

// Handle tab click
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    const cardsContainer = document.querySelector(".cards-container");

    if (!cardsContainer) {
      console.error("Cards container not found.");
      return;
    }

    // Remove active class from all tabs and add to the clicked one
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    this.classList.add("active");

    // Get the tab name (text) and show corresponding cards
    const tabName = this.innerText.trim();
    const selectedCards = golfBreaksData[tabName] || [];
    cardsContainer.innerHTML = generateCardsHTML(selectedCards);

    // Trigger fade-in animation for the new cards
    fadeInCards();
  });
});

// Display "All Inclusive" cards on page load
document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.querySelector(".cards-container");

  if (!cardsContainer) {
    console.error("Cards container not found.");
    return;
  }

  const allInclusiveCards = golfBreaksData["All Inclusive"];
  cardsContainer.innerHTML = generateCardsHTML(allInclusiveCards);
  fadeInCards();
});

// Modal functionality
function openModal() {
  const modal = document.getElementById("enquiryModal");
  if (modal) modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("enquiryModal");
  if (modal) modal.style.display = "none";
}

// Success modal functionality
function showSuccessModal() {
  const successModal = document.getElementById("successModal");
  if (successModal) successModal.style.display = "flex";

  document.getElementById("closeSuccessModal").addEventListener("click", closeSuccessModal);
  document.getElementById("closeSuccessBtn").addEventListener("click", closeSuccessModal);
}

function closeSuccessModal() {
  const successModal = document.getElementById("successModal");
  if (successModal) successModal.style.display = "none";
}

// Handle form submission
document.getElementById("enquiryForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(this);

  fetch("sendEnquiry.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      showSuccessModal();
    })
    .catch((error) => {
      alert("Failed to send enquiry. Please try again.");
    });
});