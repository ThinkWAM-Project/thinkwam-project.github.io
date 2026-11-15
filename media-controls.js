'use strict';

(() => {
  const formatTime = value => {
    const seconds = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0));
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  };

  function attachTimeline(video) {
    if (video.dataset.timelineBound) return;
    video.dataset.timelineBound = 'true';
    const timeline = document.createElement('div');
    timeline.className = 'video-timeline';
    const range = document.createElement('input');
    range.type = 'range'; range.min = '0'; range.max = '1'; range.step = '.01'; range.value = '0'; range.disabled = true;
    range.setAttribute('aria-label', `Video progress: ${video.getAttribute('aria-label')}`);
    const clock = document.createElement('output');
    clock.textContent = '0:00 / —';
    timeline.append(range, clock);
    video.closest('.demo-video-wrap').after(timeline);
    if (!video.closest('.demo-card').querySelector('.camera-switcher')) {
      const label = document.createElement('div');
      label.className = 'single-view-note';
      label.textContent = 'Single camera view';
      timeline.after(label);
    }
    let dragging = false, resumeAfterSeek = false;

    const update = () => {
      const duration = video.duration;
      const ready = Number.isFinite(duration) && duration > 0;
      range.disabled = !ready;
      range.max = ready ? String(duration) : '1';
      if (!dragging) range.value = ready ? String(video.currentTime) : '0';
      const time = ready ? Number(range.value) : 0;
      range.style.setProperty('--progress', `${ready ? Math.min(100, time / duration * 100) : 0}%`);
      clock.textContent = `${formatTime(time)} / ${ready ? formatTime(duration) : '—'}`;
      range.setAttribute('aria-valuetext', `${formatTime(time)} of ${ready ? formatTime(duration) : 'unknown duration'}`);
    };
    range.addEventListener('pointerdown', () => {
      dragging = true; resumeAfterSeek = !video.paused; video.pause();
    });
    range.addEventListener('input', () => {
      if (!Number.isFinite(video.duration)) return;
      video.currentTime = Math.min(Number(range.value), video.duration);
      update();
    });
    const finishSeek = () => {
      dragging = false;
      if (resumeAfterSeek) video.play().catch(() => {});
      resumeAfterSeek = false;
      update();
    };
    range.addEventListener('change', finishSeek);
    range.addEventListener('pointerup', finishSeek);
    range.addEventListener('pointercancel', finishSeek);
    range.addEventListener('blur', finishSeek);
    for (const event of ['loadedmetadata', 'durationchange', 'timeupdate', 'seeked', 'emptied']) video.addEventListener(event, update);
    update();
  }

  const gallery = document.querySelector('#demo-grid');
  if (gallery) {
    const attach = () => gallery.querySelectorAll('video').forEach(attachTimeline);
    attach();
    new MutationObserver(attach).observe(gallery, {childList: true, subtree: true});
  }

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
