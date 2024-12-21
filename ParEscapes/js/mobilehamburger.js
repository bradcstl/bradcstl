const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');
const overlayy = document.getElementById('overlayy');
const closeNav = document.getElementById('closeNav');
const dropdownBtn = document.querySelector('.dropdown-btn');

// Toggle side menu and overlay
hamburger.addEventListener('click', () => {
  sideMenu.classList.toggle('active');
  overlayy.classList.toggle('active');
});

// Close side menu and overlay when clicking on the overlay
overlayy.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  overlayy.classList.remove('active');
});
closeNav.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  overlayy.classList.remove('active');
});
 // Toggle dropdown for Destinations
 dropdownBtn.addEventListener('click', function () {
  this.classList.toggle('active');
});