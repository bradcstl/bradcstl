document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("breaks-slider");
  const tabs = document.querySelectorAll(".tab");

  // Function to fetch and display data
  function fetchAndDisplayPackages(filter = "all") {
    // Fetch data from the server
    fetch(`fetch_golf_breaks.php?filter=${encodeURIComponent(filter)}`)
      .then((response) => response.json())
      .then((data) => {
        slider.innerHTML = ""; // Clear existing content
        if (data.error) {
          console.error(data.error);
          return;
        }

        data.forEach((package) => {
          const card = `
            <div class="card">
              <div class="card-header">
                <span class="location"><i class="fas fa-map-marker-alt"></i> ${package.location}</span>
                <span class="date">${package.date}</span>
              </div>
              <div class="card-content">
                <div class="card-info">
                  <h3 class="hotel-title">${package.hotel_name}</h3>
                  <p class="golf-course-location">
                    <i class="fas fa-golf-ball"></i> ${package.course_location}
                  </p>
                  <p class="nights-rounds-info">
                    <i class="fas fa-info-circle"></i> ${package.nights} Nights & ${package.rounds} Rounds
                  </p>
                  <ul class="info-list">
                    ${[
                      package.quick_info_1,
                      package.quick_info_2,
                      package.quick_info_3,
                      package.quick_info_4,
                    ]
                      .filter((info) => info) // Remove null or empty fields
                      .map(
                        (info) =>
                          `<li><i class="fas fa-check"></i> ${info}</li>`
                      )
                      .join("")}
                  </ul>
                  <div class="price-container">
                    <span class="from-text">From</span>
                    <span class="price">£${package.price}</span>
                  </div>
                </div>
                <div class="card-image-section">
                  <img src="images/${package.main_image}" alt="${package.hotel_name}" class="card-image" />
                  <button class="enquire-now-btn">Enquire Now</button>
                </div>
              </div>
            </div>
          `;
          slider.innerHTML += card;
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Attach event listeners to tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      const filter = tab.dataset.filter;

      // Remove active class from all tabs and add it to the clicked one
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Fetch and display filtered data
      fetchAndDisplayPackages(filter);
    });
  });

  // Initial fetch for "all" filter
  fetchAndDisplayPackages();
});