'use strict';
const data = window.THINKWAM || {};
const el = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; };

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
document.querySelector('#demo-instruction-text').textContent = data.realTaskInstruction || 'Put the green objects into the nearby box.';
let selectedSimulationGroup = 'LIBERO / LIBERO-Plus';
const simulationFilters = document.querySelector('#simulation-filters');
simulationFilters.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
  selectedSimulationGroup = button.dataset.simulationGroup;
  renderDemos(document.getElementById('demo-simulation-tab'));
}));
document.querySelector('#real-count').textContent = demos.filter(demo => demo.type === 'real').length || '';
document.querySelector('#simulation-count').textContent = demos.filter(demo => demo.type === 'simulation').length || '';
function renderDemos(tab) {
  const type = tab.dataset.demoFilter;
  document.querySelectorAll('#demo-grid video').forEach(video => video.pause());
  const grid = document.querySelector('#demo-grid'); grid.replaceChildren();
  const filtered = demos.filter(item => item.type === type && (type !== 'simulation' || item.group === selectedSimulationGroup));
  document.querySelector('#demo-instruction').hidden = type !== 'real';
  grid.dataset.environment = type;
  simulationFilters.hidden = type !== 'simulation';
  simulationFilters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.simulationGroup === selectedSimulationGroup)));
  const groupNames = [...new Set(filtered.map(item => item.group || ''))];
  const groupGrids = new Map();
  grid.classList.toggle('grouped-gallery', groupNames.some(Boolean));
  if (groupNames.some(Boolean)) {
    groupNames.forEach(name => {
      const group = el('section', 'demo-group');
      if (name && type === 'real') group.append(el('h3', 'demo-group-title', name));
      const groupGrid = el('div', 'demo-group-grid' + (type === 'real' ? ' real-group-grid' : ' simulation-group-grid'));
      if (filtered.filter(item => (item.group || '') === name).length === 1) groupGrid.classList.add('single-demo');
      if (filtered.filter(item => (item.group || '') === name).length === 4) groupGrid.classList.add('paired-grid');
      group.append(groupGrid); grid.append(group); groupGrids.set(name, groupGrid);
    });
  }
  document.querySelector('#demo-panel').setAttribute('aria-labelledby', tab.id);
  document.querySelector('.video-note').textContent = type === 'real' ? 'Full recordings · original playback speed · click to play' : 'Selected trajectories · click to play · playback speed shown with each video';
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
      let switchController;
      const buttons = demo.views.map((view, viewIndex) => {
        const button = el('button', '', view.label); button.type = 'button';
        button.setAttribute('aria-pressed', String(viewIndex === 0));
        button.addEventListener('click', () => {
          if (button.getAttribute('aria-pressed') === 'true') return;
          const time = video.currentTime; const playing = !video.paused;
          const rate = video.playbackRate; video.pause();
          if (switchController) switchController.abort();
          switchController = new AbortController();
          buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
          video.addEventListener('canplay', () => {
            video.currentTime = Math.min(time, Math.max(0, video.duration - .01));
            video.playbackRate = rate;
            if (playing && video.isConnected) video.play().catch(() => {});
          }, {once: true, signal: switchController.signal});
          video.poster = view.poster; source.src = view.src; fallback.href = view.src;
          video.setAttribute('aria-label', `${demo.title} — ${view.label}`); video.load();
        });
        viewControls.append(button); return button;
      });
      figure.append(viewControls);
    }
    const caption = document.createElement('figcaption'); const top = el('div', 'demo-caption-line'); top.append(el('span', '', `${type === 'real' ? 'REAL-WORLD' : 'SIMULATION'} / ${String(index + 1).padStart(2, '0')}`));
    if (demo.duration) top.append(el('small', '', demo.duration));
    caption.append(top, el('h3', '', demo.title)); if (demo.description) caption.append(el('p', '', demo.description));
    figure.append(caption); (groupGrids.get(demo.group || '') || grid).append(figure);
  }
  if (!grid.children.length) grid.append(el('p', 'demo-empty', 'Demonstrations are being prepared.'));
  document.querySelector('#demo-footnote').textContent = type === 'real' ? (data.realVideoNote || 'Selected full real-world recordings. These examples illustrate behavior under the stated conditions.') : (data.simulationNotes?.[selectedSimulationGroup] || data.simulationVideoNote || 'Selected recorded simulation trajectories. These qualitative examples are separate from the benchmark aggregates.');
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
const mechanismRoot = document.querySelector('#mechanism-figures');
const mechanismGroups = new Map();
for (const item of data.mechanisms || []) {
  let parent = mechanismRoot;
  if (item.group) {
    if (!mechanismGroups.has(item.group)) {
      const group = el('section', 'mechanism-group'); group.append(el('h3', '', item.group));
      mechanismRoot.append(group); mechanismGroups.set(item.group, group);
    }
    parent = mechanismGroups.get(item.group);
  }
  const article = el('article', 'mechanism-item');
  if (item.layout) article.dataset.figureLayout = item.layout;
  article.append(el(item.group ? 'h4' : 'h3', '', item.title));
  const figure = el('figure', 'paper-figure'); const link = el('a', 'zoomable'); link.href = item.src; link.dataset.figure = ''; link.dataset.caption = item.title; link.setAttribute('aria-label', 'Enlarge ' + item.title);
  const img = el('img'); img.src = item.src; img.alt = item.caption; img.width = item.width; img.height = item.height; img.loading = 'lazy'; link.append(img, el('span', 'zoom-hint', '↗ Enlarge'));
  figure.append(link);
  if (item.pages?.length > 1) {
    const pagination = el('div', 'figure-pagination'); pagination.setAttribute('role', 'group');
    pagination.setAttribute('aria-label', `Figure pages for ${item.title}`);
    const pageButtons = item.pages.map((page, index) => {
      const button = el('button', '', page.label); button.type = 'button'; button.setAttribute('aria-pressed', String(index === 0));
      button.addEventListener('click', () => {
        img.src = page.src; img.width = page.width; img.height = page.height;
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
