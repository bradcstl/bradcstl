const golfBreaksData = [
    {
      location: "Algarve",
      date: "4 to 6 Dec 2024",
      hotelName: "Dona Filipa Hotel",
      courseName: "San Lorenzo Golf Course",
      nights: 3,
      rounds: 2,
      features: [
        "Buffet Breakfast",
        "Free shuttle to/from golf courses",
        "Private transfers from Faro airport",
      ],
      price: "£532",
      image: "images/dona_filipa.jpg",
    },
  ];
  
  function renderGolfBreaks(data) {
    const container = document.querySelector('.golf-breaks-container'); // Ensure the container exists in your HTML
    container.innerHTML = data
      .map(
        (breakData) => `
        <div class="golf-break-card">
          <div class="card-header">
            <span class="location">${breakData.location}</span>
            <span class="date">${breakData.date}</span>
          </div>
          <div class="card-body">
            <div class="info-section">
              <h3 class="hotel-name">${breakData.hotelName}</h3>
              <p class="course-name">
                <i class="fas fa-golf-ball"></i> ${breakData.courseName}
              </p>
              <p class="nights-rounds">
                <i class="fas fa-info-circle"></i> Nights: <strong>${breakData.nights}</strong> &nbsp; Rounds: <strong>${breakData.rounds}</strong>
              </p>
              <ul class="features">
                ${breakData.features
                  .map(
                    (feature) =>
                      `<li><i class="fas fa-check-circle"></i> ${feature}</li>`
                  )
                  .join("")}
              </ul>
              <p class="price">from <span>${breakData.price}</span></p>
            </div>
            <div class="image-section">
              <img src="${breakData.image}" alt="${breakData.hotelName}">
            </div>
          </div>
          <div class="card-footer">
            <button class="enquire-now-btn">Enquire Now</button>
          </div>
        </div>
      `
      )
      .join("");
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    renderGolfBreaks(golfBreaksData);
  });