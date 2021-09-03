// scroll when click about arrow
let aboutArrow = document.querySelector('#about-arrow');
aboutArrow.addEventListener('click', () => {
  window.scrollBy(0, window.innerHeight);
});