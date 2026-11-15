'use strict';

(() => {
  // Inline only the site's own latency SVGs so individual bars can reveal on entry.
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const reveal = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.remove('is-pending');
      entry.target.classList.add('is-revealed');
      reveal.unobserve(entry.target);
    }
  }, {threshold: .2}) : null;

  document.querySelectorAll('#efficiency-figures .zoomable').forEach(async (link, index) => {
    const img = link.querySelector('img');
    if (!img) return;
    try {
      const url = new URL(img.src, location.href);
      if (url.origin !== location.origin || !/\/assets\/(?:inference-latency|latency-[\w-]+)-v15\.svg$/.test(url.pathname)) return;
      const response = await fetch(url);
      if (!response.ok) return;
      const parsed = new DOMParser().parseFromString(await response.text(), 'image/svg+xml');
      if (parsed.querySelector('parsererror')) return;
      const svg = document.importNode(parsed.documentElement, true);
      const ids = new Map();
      svg.querySelectorAll('[id]').forEach(node => {
        const old = node.id, next = `latency-${index}-${old}`;
        ids.set(old, next); node.id = next;
      });
      [svg, ...svg.querySelectorAll('*')].forEach(node => {
        for (const attribute of [...node.attributes]) {
          let value = attribute.value;
          ids.forEach((next, old) => { value = value.replaceAll(`url(#${old})`, `url(#${next})`); });
          if (attribute.name === 'aria-labelledby') value = value.split(' ').map(id => ids.get(id) || id).join(' ');
          if (value !== attribute.value) node.setAttribute(attribute.name, value);
        }
      });
      svg.classList.add('latency-chart');
      svg.setAttribute('aria-label', img.alt);
      svg.querySelectorAll('[data-method]').forEach((bar, position) => {
        bar.classList.add('latency-bar');
        bar.style.setProperty('--bar-delay', `${(position % 3) * 90 + Math.floor(position / 3) * 60}ms`);
      });
      if (reveal && !reducedMotion.matches) svg.classList.add('is-pending');
      img.replaceWith(svg);
      if (svg.classList.contains('is-pending')) requestAnimationFrame(() => requestAnimationFrame(() => reveal.observe(svg)));
    } catch { /* Keep the static image when enhancement is unavailable. */ }
  });
})();
