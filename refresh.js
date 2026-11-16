'use strict';
// Back-to-top button: appears once the reader has scrolled past the hero.
(() => {
  const button = document.querySelector('.back-to-top');
  const hero = document.querySelector('.hero-cinematic');
  if (!button) return;
  button.hidden = false;
  let frame = 0;
  const update = () => {
    frame = 0;
    const threshold = hero ? hero.offsetHeight : window.innerHeight;
    button.classList.toggle('is-shown', window.scrollY > threshold);
  };
  window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(update); }, {passive: true});
  button.addEventListener('click', event => {
    event.preventDefault();
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({top: 0, behavior: smooth ? 'smooth' : 'auto'});
  });
  update();
})();
