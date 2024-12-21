 // Scroll-triggered fade-in for cards
 const cards = document.querySelectorAll('.top-golf-getaways .card');

 function checkCardsInView() {
   const triggerPoint = window.innerHeight * 0.9;

   cards.forEach(card => {
     const cardTop = card.getBoundingClientRect().top;

     if (cardTop < triggerPoint) {
       card.classList.add('fade-in');
     } else {
       card.classList.remove('fade-in'); // Allow resetting the fade-in effect
     }
   });
 }

 window.addEventListener('scroll', checkCardsInView);