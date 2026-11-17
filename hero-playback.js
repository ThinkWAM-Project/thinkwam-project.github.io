'use strict';

// Start the unobscured right-hand tiles first, without letting a slow clip block a row.
window.createHeroPlayback = function createHeroPlayback(videos, onChange) {
  const states = videos.map((video, index) => ({
    video, index, source: video.querySelector('source'), status: 'idle',
    failures: 0, retryAt: 0, lastTime: 0, lastAdvance: 0, lastProgress: 0,
    buffered: 0, generation: 0, pendingPlay: false, blocked: false
  }));
  const order = [...states].sort((a, b) => (b.index % 5) - (a.index % 5) || a.index - b.index);
  const slowConnection = () => /(^|-)2g$|^3g$/.test(navigator.connection?.effectiveType || '');
  const stallTimeout = () => slowConnection() ? 90000 : 45000;
  let enabled = false;
  let timer;

  function play(state) {
    if (!enabled || state.blocked || state.pendingPlay || !state.video.paused) return;
    const generation = state.generation;
    state.pendingPlay = true;
    Promise.resolve(state.video.play()).then(() => {
      if (!enabled) state.video.pause();
    }).catch(error => {
      if (generation !== state.generation) return;
      if (error.name === 'NotAllowedError') state.blocked = true;
      else if (error.name === 'NotSupportedError') retryLater(state);
    }).finally(() => {
      if (generation === state.generation) state.pendingPlay = false;
      onChange();
    });
  }
  function pump() {
    if (!enabled || navigator.onLine === false) return;
    let loading = states.filter(state => state.status === 'loading').length;
    const limit = slowConnection() ? 2 : 3;
    for (const state of order) {
      if (state.status === 'ready') { play(state); continue; }
      if (loading >= limit || state.status !== 'idle' || Date.now() < state.retryAt) continue;
      state.status = 'loading';
      state.lastProgress = state.lastAdvance = Date.now();
      state.lastTime = state.buffered = 0;
      state.generation++;
      state.pendingPlay = false;
      state.source.src = state.source.dataset.src;
      state.video.preload = 'auto';
      state.video.load();
      loading++;
      play(state);
    }
    onChange();
  }
  function release(state) {
    // Invalidate promises from the old load before aborting it.
    state.generation++;
    state.pendingPlay = false;
    state.video.pause();
    state.source.removeAttribute('src');
    state.video.preload = 'none';
    state.video.load();
  }
  function retryLater(state) {
    if (state.status === 'idle' || state.status === 'failed') return;
    state.failures++;
    // Keep the poster after repeated failures; manual retry / coming online can resume.
    state.status = state.failures >= 3 ? 'failed' : 'idle';
    state.retryAt = Date.now() + Math.min(30000, 1500 * 2 ** Math.min(state.failures - 1, 5));
    release(state);
    pump();
  }
  function recordProgress(state) {
    const ranges = state.video.buffered;
    let buffered = 0;
    for (let i = 0; i < ranges.length; i++) buffered += ranges.end(i) - ranges.start(i);
    // A progress event alone is not proof that new bytes were buffered.
    if (buffered > state.buffered + .01) state.lastProgress = Date.now();
    state.buffered = buffered;
  }
  function ready(state) {
    if (state.status !== 'loading') return;
    state.status = 'ready';
    state.lastAdvance = Date.now();
    state.lastTime = state.video.currentTime;
    recordProgress(state);
    pump();
  }
  for (const state of states) {
    const video = state.video;
    video.muted = true;
    video.addEventListener('canplay', () => ready(state));
    video.addEventListener('playing', () => {
      if (!enabled) video.pause();
      ready(state); onChange();
    });
    video.addEventListener('progress', () => recordProgress(state));
    video.addEventListener('pause', onChange);
    // A <source> failure does not always bubble to its parent <video>.
    state.source.addEventListener('error', () => retryLater(state));
    video.addEventListener('error', () => retryLater(state));
  }
  function checkProgress() {
    if (!enabled || navigator.onLine === false) return;
    const now = Date.now();
    for (const state of states) {
      const video = state.video;
      recordProgress(state);
      if (state.status === 'loading' && now - state.lastProgress > stallTimeout()) retryLater(state);
      if (state.status !== 'ready' || state.blocked) continue;
      if (Math.abs(video.currentTime - state.lastTime) > .01) {
        state.lastTime = video.currentTime;
        state.lastAdvance = now;
        state.failures = 0;
      } else if (!video.seeking && now - state.lastAdvance > stallTimeout() && now - state.lastProgress > stallTimeout()) {
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
        states.forEach(state => {
          if (!state.video.paused) state.video.pause();
          if (state.status === 'loading') {
            state.status = 'idle';
            release(state);
          }
        });
      } else {
        if (changed) states.forEach(state => { state.lastAdvance = state.lastProgress = Date.now(); });
        if (!timer) timer = setInterval(checkProgress, 2000);
        pump();
      }
      onChange();
    },
    retry() {
      states.forEach(state => {
        state.blocked = false; state.retryAt = 0; state.failures = 0;
        if (state.status === 'failed') state.status = 'idle';
      });
      pump();
    }
  };
};
