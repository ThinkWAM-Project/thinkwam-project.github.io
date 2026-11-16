'use strict';

// Decorative videos load in small batches; an unavailable tile cannot block the rest.
window.createHeroPlayback = function createHeroPlayback(videos, onChange) {
  const states = videos.map((video, index) => ({
    video, index, source: video.querySelector('source'), status: 'idle',
    failures: 0, retryAt: 0, lastTime: 0, lastAdvance: 0, startedAt: 0,
    pendingPlay: false, blocked: false
  }));
  const order = [...states].sort((a, b) => (a.index % 5) - (b.index % 5) || a.index - b.index);
  let enabled = false;
  let timer;

  function play(state) {
    if (!enabled || state.blocked || state.pendingPlay || !state.video.paused) return;
    state.pendingPlay = true;
    Promise.resolve(state.video.play()).catch(error => {
      if (error.name === 'NotAllowedError') state.blocked = true;
    }).finally(() => { state.pendingPlay = false; onChange(); });
  }
  function pump() {
    if (!enabled) return;
    let loading = states.filter(state => state.status === 'loading').length;
    for (const state of order) {
      if (state.status === 'ready') { play(state); continue; }
      if (loading >= 3 || state.status === 'loading' || Date.now() < state.retryAt) continue;
      state.status = 'loading';
      state.startedAt = state.lastAdvance = Date.now();
      state.lastTime = 0;
      state.source.src = state.source.dataset.src;
      state.video.preload = 'auto';
      state.video.load();
      loading++;
      play(state);
    }
    onChange();
  }
  function retryLater(state) {
    if (state.status === 'idle') return;
    state.status = 'idle';
    state.failures++;
    state.retryAt = Date.now() + Math.min(30000, 1500 * 2 ** Math.min(state.failures - 1, 5));
    state.video.pause();
    state.source.removeAttribute('src');
    state.video.load();
    pump();
  }
  function ready(state) {
    if (state.status !== 'loading') return;
    state.status = 'ready';
    state.lastAdvance = Date.now();
    state.lastTime = state.video.currentTime;
    pump();
  }
  for (const state of states) {
    const video = state.video;
    video.muted = true;
    video.addEventListener('canplay', () => ready(state));
    video.addEventListener('playing', () => { ready(state); onChange(); });
    video.addEventListener('pause', onChange);
    // A <source> failure does not always bubble to its parent <video>.
    state.source.addEventListener('error', () => retryLater(state));
    video.addEventListener('error', () => retryLater(state));
  }
  function checkProgress() {
    if (!enabled) return;
    const now = Date.now();
    for (const state of states) {
      const video = state.video;
      if (state.status === 'loading' && now - state.startedAt > 15000) retryLater(state);
      if (state.status !== 'ready' || state.blocked) continue;
      if (Math.abs(video.currentTime - state.lastTime) > .01) {
        state.lastTime = video.currentTime;
        state.lastAdvance = now;
        state.failures = 0;
      } else if (!video.seeking && now - state.lastAdvance > 12000) {
        retryLater(state);
      }
    }
    pump();
  }
  return {
    setEnabled(value) {
      const changed = enabled !== value;
      enabled = value;
      if (!enabled) {
        clearInterval(timer); timer = undefined;
        states.forEach(state => { if (!state.video.paused) state.video.pause(); });
      } else {
        if (changed) states.forEach(state => { state.lastAdvance = state.startedAt = Date.now(); });
        if (!timer) timer = setInterval(checkProgress, 2000);
        pump();
      }
      onChange();
    },
    retry() {
      states.forEach(state => { state.blocked = false; state.retryAt = 0; });
      pump();
    }
  };
};
