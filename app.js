'use strict';
const data = window.THINKWAM || {};
const el = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; };

function cameraIcon(kind) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('class', 'control-icon');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const path = document.createElementNS(svg.namespaceURI, 'path');
  path.setAttribute('d', kind === 'wrist'
    ? 'M9 3h6v5H9V3Zm3 5v4M8 12h8l3 5-3 4M8 12l-3 5 3 4M8 17v2M16 17v2'
    : 'M4 7h4l2-3h4l2 3h4v13H4V7Zm11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z');
  svg.append(path);
  return svg;
}

function setupTabs(container, onSelect) {
  if (!container) return () => {};
  const tabs = [...container.querySelectorAll('[role="tab"]')];
  const activate = (tab, focus = false) => {
    tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
    onSelect(tab, tabs.indexOf(tab));
    if (focus) tab.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault(); activate(tabs[next], true);
    });
  });
  return activate;
}

if (data.authors?.length) {
  const authors = document.querySelector('#authors');
  data.authors.forEach(author => {
    const item = el(author.url ? 'a' : 'span', '', author.name);
    if (author.url) { item.href = author.url; item.target = '_blank'; item.rel = 'noopener'; }
    if (author.sup) item.append(el('sup', '', author.sup));
    authors.append(item);
  });
  authors.hidden = false;
}
if (data.affiliations?.length) {
  const affiliations = document.querySelector('#affiliations');
  const logos = document.querySelector('#institution-logos');
  data.affiliations.forEach(affiliation => {
    const label = el('span');
    if (affiliation.index) label.append(el('sup', '', affiliation.index + ' '));
    label.append(document.createTextNode(affiliation.name)); affiliations.append(label);
    if (affiliation.logo) {
      const link = el(affiliation.url ? 'a' : 'span', 'institution-item');
      if (affiliation.url) { link.href = affiliation.url; link.target = '_blank'; link.rel = 'noopener'; }
      const img = el('img', 'institution-logo'); img.src = affiliation.logo; img.alt = affiliation.name; img.height = 64;
      if (affiliation.logoBounds) {
        const {width, height, x, y, cropWidth, cropHeight, displayWidth} = affiliation.logoBounds;
        link.style.setProperty('--logo-width', displayWidth + 'px');
        link.style.setProperty('--logo-ratio', `${cropWidth} / ${cropHeight}`);
        img.style.width = `${width / cropWidth * 100}%`;
        img.style.height = `${height / cropHeight * 100}%`;
        img.style.left = `${-x / cropWidth * 100}%`;
        img.style.top = `${-y / cropHeight * 100}%`;
      }
      link.append(img); logos.append(link);
    }
  });
  affiliations.hidden = false; logos.hidden = !logos.children.length;
}
if (data.authorNotes) { const notes = document.querySelector('#author-notes'); notes.textContent = data.authorNotes; notes.hidden = false; }
for (const [key, id] of [['arxivUrl', 'arxiv-link'], ['codeUrl', 'code-link']]) {
  if (!data[key]) continue;
  const current = document.getElementById(id);
  const link = current.tagName === 'A' ? current : el('a', 'resource-button');
  if (link !== current) {
    link.id = id; link.append(...current.childNodes); current.replaceWith(link);
  }
  link.href = data[key]; link.target = '_blank'; link.rel = 'noopener';
  link.classList.remove('unavailable'); link.querySelector('.coming-soon')?.remove();
  link.removeAttribute('aria-label');
}

setupTabs(document.querySelector('.method-tabs'), (_, index) => {
  document.querySelectorAll('.method-panel').forEach((panel, i) => { panel.hidden = i !== index; });
});

const demos = data.demos || [];
let selectedSimulationGroup = 'LIBERO / LIBERO-Plus';
let selectedRealGroup = 'Two targets';
const simulationFilters = document.querySelector('#simulation-filters');
const realFilters = document.querySelector('#real-filters');
simulationFilters.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
  selectedSimulationGroup = button.dataset.simulationGroup;
  renderDemos(document.getElementById('demo-simulation-tab'));
}));
realFilters.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
  selectedRealGroup = button.dataset.realGroup;
  renderDemos(document.getElementById('demo-real-tab'));
}));
document.querySelector('#real-count').textContent = demos.filter(demo => demo.type === 'real').length || '';
document.querySelector('#simulation-count').textContent = demos.filter(demo => demo.type === 'simulation').length || '';
function renderDemos(tab) {
  const type = tab.dataset.demoFilter;
  document.querySelectorAll('#demo-grid video').forEach(video => video.pause());
  const grid = document.querySelector('#demo-grid'); grid.replaceChildren();
  const selectedGroup = type === 'real' ? selectedRealGroup : selectedSimulationGroup;
  const filtered = demos.filter(item => item.type === type && item.group === selectedGroup);
  document.querySelector('#real-task-description').hidden = type !== 'real';
  grid.dataset.environment = type;
  simulationFilters.hidden = type !== 'simulation';
  realFilters.hidden = type !== 'real';
  simulationFilters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.simulationGroup === selectedSimulationGroup)));
  realFilters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.realGroup === selectedRealGroup)));
  const groupNames = [...new Set(filtered.map(item => item.group || ''))];
  const groupGrids = new Map();
  grid.classList.toggle('grouped-gallery', groupNames.some(Boolean));
  if (groupNames.some(Boolean)) {
    groupNames.forEach(name => {
      const group = el('section', 'demo-group');
      if (name && type === 'real' && groupNames.length > 1) group.append(el('h3', 'demo-group-title', name));
      const groupGrid = el('div', 'demo-group-grid' + (type === 'real' ? ' real-group-grid' : ' simulation-group-grid'));
      if (filtered.filter(item => (item.group || '') === name).length === 1) groupGrid.classList.add('single-demo');
      if (filtered.filter(item => (item.group || '') === name).length === 4) groupGrid.classList.add('paired-grid');
      group.append(groupGrid); grid.append(group); groupGrids.set(name, groupGrid);
    });
  }
  document.querySelector('#demo-panel').setAttribute('aria-labelledby', tab.id);
  document.querySelector('.video-note').textContent = type === 'real' ? 'Selected recordings · original playback speed · click to play' : 'Selected trajectories · click to play · playback speed shown with each video';
  for (const [index, demo] of filtered.entries()) {
    const figure = el('figure', 'demo-card');
    const media = el('div', 'demo-video-wrap' + (type === 'simulation' ? ' simulation' : ''));
    if (demo.aspect) media.style.aspectRatio = demo.aspect;
    const video = document.createElement('video'); video.controls = true; video.playsInline = true; video.muted = true; video.preload = 'metadata'; video.poster = demo.poster;
    video.setAttribute('aria-label', demo.title); const source = document.createElement('source'); source.src = demo.src; source.type = 'video/mp4'; video.append(source);
    const fallback = el('a', '', 'Download video'); fallback.href = demo.src; video.append(fallback);
    video.addEventListener('play', () => { document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); }); });
    media.append(video); figure.append(media);
    if (demo.views?.length > 1) {
      const viewControls = el('div', 'camera-switcher');
      viewControls.setAttribute('role', 'group');
      viewControls.setAttribute('aria-label', `Camera view for ${demo.title}`);
      viewControls.dataset.views = demo.views.length;
      let switchController;
      let pendingPlayback;
      const buttons = demo.views.map((view, viewIndex) => {
        const wrist = /wrist/i.test(view.label);
        const label = demo.views.length === 2 ? (wrist ? 'Wrist view' : 'Scene view') : view.label.replace(/ view$/i, '');
        const button = el('button'); button.type = 'button';
        button.append(cameraIcon(wrist ? 'wrist' : 'scene'), el('span', 'camera-label', label));
        button.setAttribute('aria-label', label.endsWith('view') ? label : `${label} view`);
        button.setAttribute('aria-pressed', String(viewIndex === 0));
        button.addEventListener('click', () => {
          if (button.getAttribute('aria-pressed') === 'true') return;
          // Keep the intended position if another view is chosen before loading finishes.
          pendingPlayback ||= {time: video.currentTime, playing: !video.paused, rate: video.playbackRate};
          const {time, playing, rate} = pendingPlayback;
          video.pause();
          if (switchController) switchController.abort();
          switchController = new AbortController();
          buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
          video.addEventListener('loadedmetadata', () => {
            video.currentTime = Math.min(time, Math.max(0, video.duration - .01));
            video.playbackRate = rate;
          }, {once: true, signal: switchController.signal});
          video.addEventListener('canplay', () => {
            pendingPlayback = null;
            if (playing && video.isConnected) video.play().catch(() => {});
          }, {once: true, signal: switchController.signal});
          media.style.aspectRatio = view.aspect || demo.aspect || "";
          video.poster = view.poster; source.src = view.src; fallback.href = view.src;
          video.setAttribute('aria-label', `${demo.title} — ${view.label}`); video.load();
        });
        viewControls.append(button); return button;
      });
      viewControls.addEventListener('keydown', event => {
        const current = buttons.indexOf(event.target);
        if (current < 0) return;
        let next;
        if (event.key === 'ArrowRight') next = (current + 1) % buttons.length;
        else if (event.key === 'ArrowLeft') next = (current - 1 + buttons.length) % buttons.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = buttons.length - 1;
        else return;
        event.preventDefault(); buttons[next].focus(); buttons[next].click();
      });
      figure.prepend(viewControls);
    }
    const caption = document.createElement('figcaption'); const top = el('div', 'demo-caption-line'); top.append(el('span', '', `${type === 'real' ? 'REAL-WORLD' : 'SIMULATION'} / ${String(index + 1).padStart(2, '0')}`));
    if (demo.duration) top.append(el('small', '', demo.duration));
    caption.append(top, el('h3', '', demo.title)); if (demo.description) caption.append(el('p', '', demo.description));
    figure.append(caption); (groupGrids.get(demo.group || '') || grid).append(figure);
  }
  if (!grid.children.length) grid.append(el('p', 'demo-empty', 'Demonstrations are being prepared.'));
  document.querySelector('#demo-footnote').textContent = type === 'real' ? (data.realVideoNote || 'Selected real-world recordings. These examples illustrate behavior under the stated conditions.') : (data.simulationNotes?.[selectedSimulationGroup] || data.simulationVideoNote || 'Selected recorded simulation trajectories. These qualitative examples are separate from the benchmark aggregates.');
}
const activateDemo = setupTabs(document.querySelector('[aria-label="Demonstration environment"]'), renderDemos);
activateDemo(document.getElementById(demos.some(item => item.type === 'real') ? 'demo-real-tab' : 'demo-simulation-tab'));

function renderResults(tab) {
  const benchmark = data.benchmarks?.[tab.dataset.benchmark];
  if (!benchmark) return;
  document.querySelector('#result-panel').setAttribute('aria-labelledby', tab.id);
  document.querySelector('#benchmark-title').textContent = benchmark.title;
  document.querySelector('#benchmark-description').textContent = benchmark.description;
  const comparison = data.comparisons?.[tab.dataset.benchmark];
  if (comparison) {
    renderComparison(document.querySelector('#benchmark-comparison'), comparison);
    renderNotes(document.querySelector('#benchmark-notes'), comparison.notes || []);
  }
  const bars = document.querySelector('#benchmark-bars'); if (!bars) return; bars.replaceChildren();
  benchmark.rows.forEach(row => {
    const item = el('div', 'bar-row'); const track = el('div', 'bar-track'); track.setAttribute('aria-hidden', 'true'); const fill = el('div', 'bar-fill'); fill.style.setProperty('--value', `${Math.max(0, Math.min(100, row.value))}%`); track.append(fill);
    item.append(el('span', 'bar-label', row.label), track, el('span', 'bar-value', row.value.toFixed(row.decimals ?? 2) + '%')); bars.append(item);
  });
}

function renderComparison(container, comparison) {
  if (!container || !comparison) return;
  const table = el('table', 'comparison-table');
  const caption = el('caption', 'sr-only', comparison.title); table.append(caption);
  const head = el('thead'); const header = el('tr');
  const groupStarts = new Set();
  let groupOffset = 1;
  comparison.columnGroups?.forEach((group, index) => {
    if (index > 0) groupStarts.add(groupOffset);
    groupOffset += group.span;
  });
  const styleColumn = (cell, column, index) => {
    if (column.unit || column.key === 'demos_per_task') cell.classList.add('numeric-column');
    if (column.key.endsWith('_chunk')) cell.classList.add('chunk-column');
    if (column.key === 'average') cell.classList.add('average-column');
    if (groupStarts.has(index)) cell.classList.add('group-start');
  };
  if (comparison.columnGroups) {
    table.classList.add('has-grouped-head');
    const groups = el('tr'); const method = el('th', '', comparison.columns[0].label);
    method.scope = 'col'; method.rowSpan = 2; groups.append(method);
    comparison.columnGroups.forEach(group => {const cell = el('th', '', group.label); cell.colSpan = group.span; cell.scope = 'colgroup'; groups.append(cell);});
    head.append(groups);
  }
  comparison.columns.forEach((column, index) => {
    if (comparison.columnGroups && index === 0) return;
    const cell = el('th', '', column.label); cell.scope = 'col'; styleColumn(cell, column, index);
    if (column.unit === 'ms') cell.append(el('span', 'column-unit', ' (ms)'));
    header.append(cell);
  });
  head.append(header); table.append(head); const body = el('tbody');
  let lastGroup = null;
  comparison.rows.forEach(row => {
    if (row.group && row.group !== lastGroup) {
      const groupRow = el('tr', 'group-row'); const cell = el('td', '', row.group); cell.colSpan = comparison.columns.length; groupRow.append(cell); body.append(groupRow); lastGroup = row.group;
    }
    const tr = el('tr', row.is_ours ? 'ours' : '');
    comparison.columns.forEach((column, index) => {
      const value = row[column.key]; const td = el('td', '', value == null ? '—' : String(value));
      styleColumn(td, column, index);
      if (column.key.endsWith('_chunk') && typeof value === 'string') {
        const parts = value.match(/^(.*?)\s+\(([^)]+)\)$/);
        if (parts) {
          td.replaceChildren(el('span', 'chunk-shape', parts[1]), el('small', 'chunk-detail', ` (${parts[2]})`));
          td.setAttribute('aria-label', value);
        }
      }
      if (column.key === 'action_pretraining' && ['Yes', 'No'].includes(value)) {
        td.textContent = value === 'Yes' ? '✓' : '✗'; td.classList.add('pretraining-indicator', value === 'Yes' ? 'pt-yes' : 'pt-no');
        td.setAttribute('aria-label', value); td.title = value === 'Yes' ? 'With action pretraining' : 'Without action pretraining';
      }
      if (row.source_emphasis?.[column.key] === 'bold') td.classList.add('best');
      if (row.source_emphasis?.[column.key] === 'underline') td.classList.add('second');
      tr.append(td);
    }); body.append(tr);
  });
  table.append(body); container.replaceChildren(table);
}

function renderNotes(container, notes) {
  if (!container) return;
  container.replaceChildren();
  notes.slice(0, 2).forEach(note => container.append(el('p', '', note)));
  if (notes.length > 2) { const details = el('details'); details.append(el('summary', '', 'Evaluation and reporting details')); notes.slice(2).forEach(note => details.append(el('p', '', note))); container.append(details); }
}

const activateResult = setupTabs(document.querySelector('.result-tabs'), renderResults); activateResult(document.querySelector('.result-tabs button'));

renderComparison(document.querySelector('#latency-comparison'), data.latency);
renderNotes(document.querySelector('#latency-notes'), data.latency?.notes || []);
if (data.realWorldComparison) {
  const comparison = data.realWorldComparison;
  const columns = comparison.columns.filter(column => !column.hideWhenEmpty || comparison.rows.some(row => row[column.key] != null));
  renderComparison(document.querySelector('#real-world-comparison'), {...comparison, columns});
  renderNotes(document.querySelector('#real-world-notes'), comparison.notes || []);
}
for (const metric of data.headlineMetrics || []) {
  const item = el('div');
  item.append(el('dt', '', metric.label), el('dd', '', metric.value));
  if (metric.detail) item.append(el('span', '', metric.detail));
  document.querySelector('#headline-metrics').append(item);
}
function renderResearchFigures(selector, figures) {
  const container = document.querySelector(selector);
  if (!container) return;
  for (const item of figures || []) {
    const article = el('article', 'research-figure');
    if (item.title && !item.hideHeading) article.append(el('h3', '', item.title));
    const figure = el('figure', 'paper-figure');
    const link = el('a', 'zoomable');
    link.href = item.src; link.dataset.figure = ''; link.dataset.caption = item.title;
    link.setAttribute('aria-label', 'Enlarge ' + item.title);
    link.style.setProperty('--figure-aspect', `${item.width} / ${item.height}`);
    const img = el('img'); img.src = item.src; img.alt = item.alt || item.caption;
    img.width = item.width; img.height = item.height; img.loading = 'lazy';
    link.append(img, el('span', 'zoom-hint', '↗ Enlarge'));
    figure.append(link);
    if (item.mobileParts?.length) {
      link.classList.add('desktop-plot');
      const parts = el('div', 'mobile-plot-parts');
      for (const part of item.mobileParts) {
        const partLink = el('a', 'zoomable'); partLink.href = part.src;
        partLink.dataset.figure = ''; partLink.dataset.caption = part.title;
        partLink.setAttribute('aria-label', 'Enlarge ' + part.title);
        const partImage = el('img'); partImage.src = part.src; partImage.alt = part.alt;
        partImage.width = part.width; partImage.height = part.height; partImage.loading = 'lazy';
        partLink.append(partImage, el('span', 'zoom-hint', '↗ Enlarge')); parts.append(partLink);
      }
      figure.append(parts);
    }
    figure.append(el('figcaption', '', item.caption));
    article.append(figure); container.append(article);
  }
}
renderResearchFigures('#performance-figures', data.performanceFigures);
renderResearchFigures('#efficiency-figures', data.efficiencyFigures);
const mechanismRoot = document.querySelector('#mechanism-figures');
const mechanismGroups = new Map();
const mechanismRows = new Map();
for (const item of data.mechanisms || []) {
  let parent = mechanismRoot;
  if (item.row) {
    if (!mechanismRows.has(item.row)) {
      const row = el('div', 'mechanism-row'); row.dataset.mechanismRow = item.row;
      mechanismRoot.append(row); mechanismRows.set(item.row, row);
    }
    parent = mechanismRows.get(item.row);
  }
  if (item.group) {
    const groupKey = `${item.row || ''}/${item.group}`;
    if (!mechanismGroups.has(groupKey)) {
      const group = el('section', 'mechanism-group'); group.append(el('h3', '', item.group));
      parent.append(group); mechanismGroups.set(groupKey, group);
    }
    parent = mechanismGroups.get(groupKey);
  }
  const article = el('article', 'mechanism-item');
  if (item.layout) article.dataset.figureLayout = item.layout;
  if (!item.hideHeading) article.append(el(item.group ? 'h4' : 'h3', '', item.title));
  const figure = el('figure', 'paper-figure'); const link = el('a', 'zoomable'); link.href = item.src; link.dataset.figure = ''; link.dataset.caption = item.title; link.setAttribute('aria-label', 'Enlarge ' + item.title);
  link.style.setProperty('--figure-aspect', `${item.width} / ${item.height}`);
  const img = el('img'); img.src = item.src; img.alt = item.caption; img.width = item.width; img.height = item.height; img.loading = 'lazy'; link.append(img, el('span', 'zoom-hint', '↗ Enlarge'));
  figure.append(link);
  if (item.pages?.length > 1) {
    const pagination = el('div', 'figure-pagination'); pagination.setAttribute('role', 'group');
    pagination.setAttribute('aria-label', `Figure pages for ${item.title}`);
    const pageButtons = item.pages.map((page, index) => {
      const button = el('button', '', page.label); button.type = 'button'; button.setAttribute('aria-pressed', String(index === 0));
      button.addEventListener('click', () => {
        img.src = page.src; img.width = page.width; img.height = page.height;
        link.style.setProperty('--figure-aspect', `${page.width} / ${page.height}`);
        link.href = page.src; link.dataset.caption = `${item.title} · ${page.label}`;
        pageButtons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      });
      pagination.append(button); return button;
    });
    figure.append(pagination);
  }
  figure.append(el('figcaption', '', item.caption)); article.append(figure); parent.append(article);
}

const dialog = document.querySelector('#figure-dialog');
document.querySelectorAll('[data-figure]').forEach(link => link.addEventListener('click', event => {
  if (!dialog.showModal) return;
  event.preventDefault(); const image = document.querySelector('#figure-image'); image.src = link.href; image.alt = link.querySelector('img').alt;
  document.querySelector('#figure-caption').textContent = link.dataset.caption; dialog.showModal();
}));
document.querySelector('#close-figure').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });

document.querySelector('#copy-bibtex').addEventListener('click', async event => {
  const button = event.currentTarget;
  try { await navigator.clipboard.writeText(document.querySelector('#bibtex-text').textContent); button.textContent = 'Copied'; }
  catch (_) { button.textContent = 'Select text to copy'; }
  setTimeout(() => { button.textContent = 'Copy'; }, 2200);
});

// Progressive motion: readable static content when motion or scripting is unavailable.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const pageHeader = document.querySelector('.site-header');
const hero = document.querySelector('.hero-cinematic');
const heroVideos = [...document.querySelectorAll('[data-hero-video]')];
const heroMotion = document.querySelector('#hero-motion');
const scrollProgress = document.querySelector('.scroll-progress');
const navTargets = [...document.querySelectorAll('.nav-inner nav a[href^="#"]')].map(link => ({link, section: document.querySelector(link.getAttribute('href'))})).filter(item => item.section);
let userPausedHero = reducedMotion.matches || Boolean(navigator.connection?.saveData);
let heroVisible = true;
let scrollFrame = 0;
let revealObserver;

function syncHeroButton() {
  if (!heroMotion) return;
  const playing = heroVideos.some(video => !video.paused);
  heroMotion.textContent = playing ? 'Pause videos' : 'Play videos';
  heroMotion.setAttribute('aria-label', playing ? 'Pause background demonstration videos' : 'Play background demonstration videos');
}
function updateHeroPlayback() {
  const otherVideoPlaying = [...document.querySelectorAll('#demo-grid video')].some(video => !video.paused);
  heroVideos.forEach(video => {
    const shouldPlay = heroVisible && !document.hidden && !userPausedHero && !otherVideoPlaying;
    if (shouldPlay && video.paused) video.play().catch(syncHeroButton);
    if (!shouldPlay && !video.paused) video.pause();
  });
  syncHeroButton();
}
if (heroMotion && heroVideos.length) {
  heroMotion.hidden = false;
  heroMotion.addEventListener('click', () => {
    userPausedHero = heroVideos.some(video => !video.paused);
    if (!userPausedHero) document.querySelectorAll('#demo-grid video').forEach(video => video.pause());
    updateHeroPlayback();
  });
  heroVideos.forEach(video => {
    video.addEventListener('playing', syncHeroButton);
    video.addEventListener('pause', syncHeroButton);
  });
}
function updateScrollExperience() {
  scrollFrame = 0;
  const scroll = window.scrollY;
  const extent = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  if (scrollProgress) scrollProgress.style.transform = `scaleX(${Math.min(1, Math.max(0, scroll / extent))})`;
  pageHeader?.classList.toggle('is-scrolled', !hero || hero.getBoundingClientRect().bottom <= 64);
  if (hero) {
    const bounds = hero.getBoundingClientRect();
    heroVisible = bounds.bottom > 0 && bounds.top < window.innerHeight;
  }
  let active = null;
  navTargets.forEach(item => { if (item.section.getBoundingClientRect().top <= 150) active = item; });
  navTargets.forEach(item => {
    if (item === active) item.link.setAttribute('aria-current', 'location');
    else item.link.removeAttribute('aria-current');
  });
  updateHeroPlayback();
}
function requestScrollUpdate() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollExperience);
}
function enableSectionReveals() {
  revealObserver?.disconnect();
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-pending').forEach(node => node.classList.add('is-visible'));
    return;
  }
  const selector = '.project-meta>.wrap, .academic-heading, .abstract-copy, .overview-composition, .method-section .paper-figure, .method-explanation, .demo-toolbar, #demo-panel, .real-results-body, .performance-figures, #result-panel, .efficiency-figures, #latency-comparison, .mechanism-row, .resources-section, .bibtex-section';
  const targets = [...document.querySelectorAll(selector)];
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, {threshold: .04, rootMargin: '0px 0px -24px 0px'});
  targets.forEach(node => {
    const bounds = node.getBoundingClientRect();
    node.classList.add('reveal-pending');
    if (bounds.top < window.innerHeight - 24 && bounds.bottom > 0) node.classList.add('is-visible');
    if (!node.classList.contains('is-visible')) revealObserver.observe(node);
  });
}
window.addEventListener('scroll', requestScrollUpdate, {passive: true});
window.addEventListener('resize', requestScrollUpdate);
document.addEventListener('visibilitychange', updateHeroPlayback);
reducedMotion.addEventListener('change', () => {
  userPausedHero = reducedMotion.matches;
  enableSectionReveals();
  requestScrollUpdate();
});
enableSectionReveals();
updateScrollExperience();
