// Get the element with the class "icon"
let icon = document.getElementsByClassName("icon")[0];

// Add an event listener for the 'click' event on the icon element
icon.addEventListener('click', responsive_control);

// Function to control the responsiveness of the navigation bar
function responsive_control() {
  // Get the element with the id "myTopnav"
  let x = document.getElementById("myTopnav");

  // Check if the class name of the element is "topnav"
  if (x.className === "topnav") {
    // If it is, add the "responsive" class to the element
    x.className += " responsive";
  } else {
    // If it's not, remove the "responsive" class from the element
    x.className = "topnav";
  }
}

let slideIndex = 1;
let slideTimer = null;
showSlides(slideIndex);
startAutoAdvance(5000);

function plusSlides(n) {
  showSlides(slideIndex += n);
  resetAutoAdvance();
}

function currentSlide(n) {
  showSlides(slideIndex = n);
  resetAutoAdvance();
}

function showSlides(n) {
  const slides = document.querySelectorAll('.slideshow-container .slide');
  const dots = document.querySelectorAll('.dots .dot');
  if (!slides.length) return;
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  slides.forEach(s => s.style.display = 'none');
  dots.forEach(d => d.classList.remove('active'));
  slides[slideIndex - 1].style.display = 'block';
  if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add('active');
}

/* Auto-advance helpers */
function startAutoAdvance(ms) {
  stopAutoAdvance();
  slideTimer = setInterval(() => { plusSlides(1); }, ms);
}
function stopAutoAdvance() {
  if (slideTimer) { clearInterval(slideTimer); slideTimer = null; }
}
function resetAutoAdvance() {
  startAutoAdvance(5000);
}

/* Optional: pause on hover to improve accessibility */
const slideshow = document.getElementById('slideshow');
if (slideshow) {
  slideshow.addEventListener('mouseenter', stopAutoAdvance);
  slideshow.addEventListener('mouseleave', resetAutoAdvance);
}

/* Keyboard (left/right) support */
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') plusSlides(-1);
  if (e.key === 'ArrowRight') plusSlides(1);
});

// Accessibility helpers for the topnav References dropdown
(function() {
  const refsBtn = document.getElementById('refsBtn');
  if (!refsBtn) return;
  const dropdown = refsBtn.closest('.topnav-item');
  const menu = dropdown.querySelector('.dropdown-content');

  // Toggle aria-expanded and visibility for keyboard users
  function openMenu() {
    refsBtn.setAttribute('aria-expanded', 'true');
    menu.style.display = 'block';
  }
  function closeMenu() {
    refsBtn.setAttribute('aria-expanded', 'false');
    menu.style.display = '';
  }

  // Open on focus, close on blur (keeps hover behavior intact)
  refsBtn.addEventListener('focus', openMenu);
  refsBtn.addEventListener('blur', () => setTimeout(closeMenu, 150)); // slight delay for tab into menu

  // Keyboard handling (Enter/Space to toggle, Esc to close)
  refsBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const expanded = refsBtn.getAttribute('aria-expanded') === 'true';
      if (expanded) closeMenu(); else openMenu();
    }
    if (e.key === 'Escape') closeMenu();
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) closeMenu();
  });
})();