const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const code = fs.readFileSync(require.resolve('../hero-playback.js'), 'utf8');

function harness(count = 25, effectiveType = '4g') {
  let now = 1;
  const intervals = new Set();
  class Target {
    listeners = new Map();
    addEventListener(type, fn) {
      if (!this.listeners.has(type)) this.listeners.set(type, []);
      this.listeners.get(type).push(fn);
    }
    emit(type) { (this.listeners.get(type) || []).forEach(fn => fn()); }
  }
  const videos = Array.from({length: count}, (_, index) => {
    const source = Object.assign(new Target(), {dataset: {src: `clip-${index}.mp4`}, src: ''});
    source.removeAttribute = name => { if (name === 'src') source.src = ''; };
    const video = Object.assign(new Target(), {
      source, paused: true, currentTime: 0, seeking: false, end: 0,
      loads: 0, plays: 0, preload: 'none', blocked: false,
      querySelector: () => source,
      load() { this.loads++; },
      pause() { this.paused = true; },
      play() {
        this.plays++;
        if (this.blocked) return Promise.reject(Object.assign(new Error('Blocked'), {name: 'NotAllowedError'}));
        this.paused = false;
        return Promise.resolve();
      }
    });
    video.buffered = {get length() { return video.end > 0 ? 1 : 0; }, start: () => 0, end: () => video.end};
    return video;
  });
  const navigator = {connection: {effectiveType}, onLine: true};
  const context = {window: {}, navigator, Promise, Date: {now: () => now},
    setInterval: fn => { intervals.add(fn); return fn; }, clearInterval: fn => intervals.delete(fn)};
  vm.runInNewContext(code, context);
  const player = context.window.createHeroPlayback(videos, () => {});
  return {player, videos, navigator,
    advance(ms) { now += ms; [...intervals].forEach(fn => fn()); },
    active() { return videos.flatMap((v, i) => v.source.src ? [i] : []); }};
}
const settle = () => new Promise(resolve => setImmediate(resolve));

test('three unobscured tiles start first, and each ready tile frees a loading slot', () => {
  const h = harness(); h.player.setEnabled(true);
  assert.deepEqual(h.active(), [4, 9, 14]);
  h.videos[4].emit('canplay');
  assert.deepEqual(h.active(), [4, 9, 14, 19]);
});
test('slow connections start two streams and offline starts none', () => {
  const h = harness(25, '3g'); h.navigator.onLine = false; h.player.setEnabled(true);
  assert.deepEqual(h.active(), []);
  h.navigator.onLine = true; h.player.retry();
  assert.deepEqual(h.active(), [4, 9]);
});
test('a slow download making progress is not restarted after 15 seconds', () => {
  const h = harness(1); h.player.setEnabled(true);
  for (let i = 0; i < 12; i++) {
    h.videos[0].end += .2; h.videos[0].emit('progress'); h.advance(10000);
  }
  assert.equal(h.videos[0].loads, 1);
  assert.equal(h.videos[0].source.src, 'clip-0.mp4');
});
test('an unresponsive stream releases its slot and cannot block the other rows', () => {
  const h = harness(); h.player.setEnabled(true); h.advance(46000);
  assert.equal(h.videos[4].source.src, '');
  assert.equal(h.videos[19].source.src, 'clip-19.mp4');
  assert.equal(h.active().length, 3);
});
test('repeated failures stop retrying automatically but manual retry recovers', () => {
  const h = harness(1); h.player.setEnabled(true);
  for (let i = 0; i < 3; i++) { h.videos[0].source.emit('error'); h.advance(40000); }
  const loads = h.videos[0].loads;
  h.advance(180000); assert.equal(h.videos[0].loads, loads);
  h.player.retry(); assert.equal(h.videos[0].source.src, 'clip-0.mp4');
});
test('leaving the hero cancels unfinished loads; returning resumes them', () => {
  const h = harness(); h.player.setEnabled(true); h.player.setEnabled(false);
  assert.deepEqual(h.active(), []); assert.ok(h.videos.every(v => v.paused));
  h.advance(120000); assert.deepEqual(h.active(), []);
  h.player.setEnabled(true); assert.deepEqual(h.active(), [4, 9, 14]);
});
test('autoplay rejection does not create a download loop and can be retried', async () => {
  const h = harness(1); h.videos[0].blocked = true; h.player.setEnabled(true);
  h.videos[0].emit('canplay'); await settle(); h.advance(100000);
  assert.equal(h.videos[0].loads, 1); assert.equal(h.videos[0].plays, 1);
  h.videos[0].blocked = false; h.player.retry(); await settle();
  assert.equal(h.videos[0].paused, false);
});
test('a play promise resolving after pause cannot restart background motion', async () => {
  const h = harness(1); let resolvePlay;
  h.videos[0].play = function () { return new Promise(resolve => { resolvePlay = () => { this.paused = false; resolve(); }; }); };
  h.player.setEnabled(true); h.player.setEnabled(false); resolvePlay(); await settle();
  assert.equal(h.videos[0].paused, true);
});
