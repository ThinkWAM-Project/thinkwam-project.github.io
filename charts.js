'use strict';

(() => {
  const NS = 'http://www.w3.org/2000/svg';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const palette = {ours: '#72d6c7', baseline: '#9dbce2', jepa: '#c2a5e4'};
  const svgNode = (tag, attrs = {}, text) => {
    const node = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const line = (parent, x1, y1, x2, y2, className = 'chart-grid') => {
    const node = svgNode('line', {x1, y1, x2, y2, class: className}); parent.append(node); return node;
  };
  const text = (parent, x, y, value, className = '', anchor = 'start') => {
    const node = svgNode('text', {x, y, class: className, 'text-anchor': anchor}, value); parent.append(node); return node;
  };
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const polar = (radius, index) => {
    const angle = index * Math.PI / 3 - Math.PI / 2;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius];
  };
  const pointString = points => points.map(p => p.map(v => v.toFixed(3)).join(',')).join(' ');

  function makeTooltip(stage) {
    const tip = document.createElement('div'); tip.className = 'chart-tooltip'; tip.role = 'tooltip'; tip.hidden = true;
    stage.append(tip);
    let active;
    const hide = () => { tip.hidden = true; active = null; };
    function show(node, heading, rows, note) {
      active = node; tip.replaceChildren();
      const title = document.createElement('strong'); title.textContent = heading; tip.append(title);
      const list = document.createElement('dl');
      rows.forEach(([label, value]) => {
        const row = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd');
        dt.textContent = label; dd.textContent = value; row.append(dt, dd); list.append(row);
      });
      tip.append(list);
      if (note) { const p = document.createElement('p'); p.textContent = note; tip.append(p); }
      tip.hidden = false;
      const box = stage.getBoundingClientRect(), target = node.getBoundingClientRect();
      const left = clamp(target.x + target.width / 2 - box.x - tip.offsetWidth / 2, 2, box.width - tip.offsetWidth - 2);
      let top = target.top - box.top - tip.offsetHeight - 10;
      if (top < 0) top = target.bottom - box.top + 10;
      tip.style.left = `${left}px`; tip.style.top = `${clamp(top, 0, Math.max(0, box.height - tip.offsetHeight))}px`;
    }
    function bind(node, heading, rows, note) {
      node.setAttribute('tabindex', '0'); node.setAttribute('role', 'button');
      node.setAttribute('aria-label', `${heading}. ${rows.map(([k, v]) => `${k}: ${v}`).join('. ')}${note ? '. ' + note : ''}`);
      const reveal = () => show(node, heading, rows, note);
      node.addEventListener('pointerenter', reveal);
      node.addEventListener('pointerleave', () => { if (document.activeElement !== node) hide(); });
      node.addEventListener('focus', reveal);
      node.addEventListener('blur', hide);
      node.addEventListener('click', event => { event.stopPropagation(); node.focus(); reveal(); });
      node.addEventListener('keydown', event => {
        if (event.key === 'Escape') { hide(); node.blur(); }
        if (['Enter', ' '].includes(event.key)) { event.preventDefault(); reveal(); }
      });
    }
    const onOutside = event => { if (active && !event.target.closest('.chart-point')) hide(); };
    stage.addEventListener('pointerdown', onOutside);
    return {bind, hide, destroy: () => stage.removeEventListener('pointerdown', onOutside)};
  }

  function createSVG(width, height, title, description) {
    const svg = svgNode('svg', {viewBox: `0 0 ${width} ${height}`, width, height, role: 'group', 'aria-label': title});
    svg.append(svgNode('title', {}, title), svgNode('desc', {}, description));
    return svg;
  }

  function renderRadar(stage, data, width, pending) {
    const compact = width < 400, height = compact ? 390 : 440;
    const cx = width / 2, cy = height / 2 - 18;
    const radius = Math.min(128, (width - 144) / 2);
    const svg = createSVG(width, height, 'Success across six settings', data.note);
    const defs = svgNode('defs'), gradient = svgNode('linearGradient', {id: 'radar-fill', x1: '0%', y1: '0%', x2: '90%', y2: '100%'});
    gradient.append(svgNode('stop', {offset: '0%', 'stop-color': '#65b9ad', 'stop-opacity': '.28'}), svgNode('stop', {offset: '100%', 'stop-color': '#83b7c3', 'stop-opacity': '.05'}));
    defs.append(gradient); svg.append(defs);
    const grid = svgNode('g', {transform: `translate(${cx} ${cy})`}); svg.append(grid);
    for (const value of [20, 40, 60, 80, 100]) {
      grid.append(svgNode('polygon', {points: pointString(data.axes_clockwise_from_top.map((_, i) => polar(radius * value / 100, i))), class: 'chart-grid'}));
    }
    for (let i = 0; i < 6; i++) { const [x, y] = polar(radius, i); line(grid, 0, 0, x, y); }
    for (const value of [20, 40, 60, 80, 100]) text(grid, -7, -radius * value / 100 + 4, value, '', 'end');
    const seriesGroups = [];
    [...data.series].reverse().forEach(series => {
      const ours = series.method === 'ThinkWAM', color = ours ? palette.ours : palette.baseline;
      const group = svgNode('g', {class: 'radar-series', transform: pending ? 'scale(0)' : 'scale(1)', opacity: pending ? 0 : 1, 'data-method': series.method});
      const points = series.values.map((value, index) => polar(radius * value / 100, index));
      group.append(svgNode('polygon', {points: pointString(points), fill: ours ? 'url(#radar-fill)' : '#819bb80b', stroke: color, 'stroke-width': ours ? 2.8 : 2, 'stroke-dasharray': ours ? 'none' : '5 5', 'stroke-linejoin': 'round', 'data-values': series.values.join(',')}));
      points.forEach(([x, y], i) => group.append(ours
        ? svgNode('circle', {cx: x, cy: y, r: 3.8, fill: color, stroke: '#fff', 'stroke-width': 1.2, 'data-value': series.values[i]})
        : svgNode('rect', {x: x - 2.7, y: y - 2.7, width: 5.4, height: 5.4, rx: .7, fill: color, stroke: '#fff', 'stroke-width': 1, 'data-value': series.values[i]})));
      grid.append(group); seriesGroups.push(group);
    });
    stage.replaceChildren(svg);
    const tooltip = makeTooltip(stage);
    const axisLabels = [['LIBERO'], ['LIBERO-Plus'], ['RoboCasa24'], ['Real-world', 'OOD'], ['RoboTwin', 'Random'], ['RoboTwin', 'Clean']];
    const ours = data.series.find(s => s.method === 'ThinkWAM'), baseline = data.series.find(s => s.method === 'π0.5');
    data.axes_clockwise_from_top.forEach((axis, index) => {
      const [dx, dy] = polar(radius + (compact ? 40 : 43), index);
      const x = cx + dx, y = cy + dy;
      const label = svgNode('g', {class: 'chart-point radar-axis-label', 'data-axis': axis.key, transform: `translate(${x} ${y})`});
      const lines = axisLabels[index]; const offset = index === 0 ? -12 : index === 3 ? 4 : -8;
      label.append(svgNode('rect', {x: -53, y: offset - 15, width: 106, height: lines.length * 16 + 28, rx: 7, fill: 'transparent', 'pointer-events': 'all'}));
      label.append(svgNode('rect', {x: -53, y: offset - 15, width: 106, height: lines.length * 16 + 28, rx: 7, fill: 'transparent', class: 'focus-ring'}));
      lines.forEach((value, i) => text(label, 0, offset + i * 16, value, 'radar-axis-name', 'middle'));
      const value = text(label, 0, offset + lines.length * 16 + 3, '', 'radar-value', 'middle');
      value.append(svgNode('tspan', {}, ours.labels[index]), svgNode('tspan', {class: 'radar-baseline-value'}, ` / ${baseline.labels[index]}`));
      tooltip.bind(label, axis.label, [['ThinkWAM', ours.labels[index] + '%'], ['π0.5', baseline.labels[index] + '%']], 'Success rate');
      svg.append(label);
    });
    text(svg, width / 2, height - 7, 'Success rate (%)', 'chart-axis-title', 'middle');
    return {seriesGroups, tooltip};
  }

  function renderScatter(stage, data, width) {
    const compact = width < 480, height = compact ? 420 : 440;
    const left = 44, right = width - 15, top = 38, bottom = height - 83;
    const gap = compact ? 22 : 30, unit = (right - left - gap) / 11;
    const firstEnd = left + 2 * unit, secondStart = firstEnd + gap;
    const x = value => value <= 52 ? left + (value - 50) * unit : secondStart + (value - 77) * unit;
    const y = value => bottom - (value - 96) / 3.15 * (bottom - top);
    const svg = createSVG(width, height, 'LIBERO vs LIBERO-Plus success', 'Eleven methods. Circle or diamond area represents model parameters. The x-axis omits 52–77%. All values match the source benchmark tables.');
    const defs = svgNode('defs');
    for (const [key, color] of Object.entries(palette)) {
      const gradient = svgNode('linearGradient', {id: `scatter-${key}`, x1: '0%', y1: '0%', x2: '100%', y2: '100%'});
      gradient.append(svgNode('stop', {offset: '0%', 'stop-color': color, 'stop-opacity': '.68'}), svgNode('stop', {offset: '100%', 'stop-color': color}));defs.append(gradient);
    }
    svg.append(defs);
    for (const value of [96, 96.5, 97, 97.5, 98, 98.5, 99]) {
      line(svg, left, y(value), firstEnd, y(value)); line(svg, secondStart, y(value), right, y(value));
      text(svg, left - 8, y(value) + 4, Number.isInteger(value) ? value.toFixed(1) : value, '', 'end');
    }
    const ticks = compact ? [50, 52, 78, 82, 86] : [50, 52, 78, 80, 82, 84, 86];
    ticks.forEach(value => { line(svg, x(value), top, x(value), bottom); text(svg, x(value), bottom + 22, value, '', 'middle'); });
    line(svg, left, top, left, bottom, 'chart-axis');
    line(svg, left, bottom, firstEnd, bottom, 'chart-axis'); line(svg, secondStart, bottom, right, bottom, 'chart-axis');
    const breakX = (firstEnd + secondStart) / 2;
    for (const offset of [-4, 3]) line(svg, breakX + offset - 2, bottom + 4, breakX + offset + 3, bottom - 4, 'chart-axis');
    text(svg, left, 16, 'LIBERO (ID, %)', 'chart-axis-title');
    text(svg, (left + right) / 2, bottom + 49, 'LIBERO-Plus (OOD, %)', 'chart-axis-title', 'middle');
    const footnote = compact ? ['Area = parameters', 'X-axis break: 52–77%'] : ['Area = parameters · X-axis break: 52–77%'];
    footnote.forEach((value, i) => text(svg, width / 2, height - 18 + i * 14, value, 'chart-footnote', 'middle'));
    stage.replaceChildren(svg);
    const tooltip = makeTooltip(stage);
    const offsets = {
      'π0.5': [18, -4, 'start'], 'ABot-M0': [-10, -20, 'end'], 'ResVLA': [-16, 25, 'end'],
      'FastWAM': [0, -22, 'middle'], 'ImageWAM': [13, 24, 'start'], 'ForeWAM': [-13, -20, 'end'],
      'VLANeXt (Base)': [-6, 28, 'end'], 'VLA-JEPA': [-16, -10, 'end'], 'JEPA-WAM': [12, 32, 'start'],
      'V-JEPA Policy (from scratch)': [12, -21, 'start'], 'ThinkWAM': [0, -22, 'middle']
    };
    const points = [...data.points].sort((a, b) => a.x - b.x);
    points.forEach((point, index) => {
      const ours = point.group === 'ThinkWAM', jepa = point.group === 'JEPA-based';
      const kind = ours ? 'ours' : jepa ? 'jepa' : 'baseline';
      const px = x(point.x), py = y(point.y), radius = 4.7 * Math.sqrt(point.size_b);
      const group = svgNode('g', {class: 'chart-point scatter-point', transform: `translate(${px} ${py})`, 'data-method': point.method, 'data-x': point.x, 'data-y': point.y, 'data-size': point.size_b, style: `--point-delay:${index * 70}ms`});
      const mark = svgNode('g', {class: 'scatter-marker'});
      const common = {fill: `url(#scatter-${kind})`, stroke: ours ? '#b5f3e7' : '#d4dbef', 'stroke-width': ours ? 1.5 : 1.2};
      if (jepa) {
        const d = radius * Math.sqrt(Math.PI / 2);
        mark.append(svgNode('polygon', {...common, points: `0,${-d} ${d},0 0,${d} ${-d},0`}));
      } else mark.append(svgNode('circle', {...common, r: radius}));
      mark.append(svgNode('circle', {r: radius + 5, class: 'focus-ring'}));group.append(mark);
      group.append(svgNode('circle', {r: Math.max(10, radius + 3), fill: 'transparent'}));
      if (!compact || ['ThinkWAM', 'FastWAM', 'π0.5'].includes(point.method)) {
        let [dx, dy, anchor] = offsets[point.method];
        const name = point.method === 'V-JEPA Policy (from scratch)' ? 'V-JEPA Policy' : point.method === 'VLANeXt (Base)' ? 'VLANeXt' : point.method;
        if (ours) { dx = right - px; anchor = 'end'; }
        if (compact && point.method === 'π0.5') { dx = 10; dy = 24; }
        text(group, dx, dy, name, 'chart-method-label' + (ours ? ' ours' : ''), anchor);
        if (ours) text(group, dx, dy + 16, `${point.x_label} / ${point.y_label}`, 'chart-method-label ours', anchor);
      }
      const note = point.method === 'ABot-M0' ? 'Size excludes optional spatial modules.' : point.method === 'V-JEPA Policy (from scratch)' ? 'Size excludes the frozen text encoder.' : '';
      tooltip.bind(group, point.method, [['LIBERO', `${point.y_label}%`], ['LIBERO-Plus', `${point.x_label}%`], ['Parameters', `${point.size_label}B`]], note);
      svg.append(group);
    });
    return {tooltip};
  }

  function mountChart(card, type, data) {
    const stage = card.querySelector('.chart-stage');
    let width = 0, drawing, revealed = motion.matches, frame = 0, finishTimer;
    const cancel = () => { cancelAnimationFrame(frame); clearTimeout(finishTimer); };
    const finish = () => {
      cancel(); revealed = true; card.classList.remove('is-pending'); card.dataset.chartState = 'revealed';
      drawing?.seriesGroups?.forEach(g => { g.setAttribute('transform', 'scale(1)'); g.setAttribute('opacity', '1'); });
    };
    function draw() {
      cancel();
      drawing?.tooltip?.destroy();
      card.classList.toggle('is-pending', !revealed && !motion.matches);
      drawing = type === 'radar' ? renderRadar(stage, data, width, !revealed && !motion.matches) : renderScatter(stage, data, width);
      card.dataset.chartState = revealed || motion.matches ? 'revealed' : 'pending';
      card.dataset.chartReady = 'true';
    }
    function reveal() {
      if (motion.matches) { finish(); return; }
      revealed = true; card.dataset.chartState = 'animating';
      if (type === 'scatter') {
        // Two frames ensure the browser paints the initial transparent state.
        frame = requestAnimationFrame(() => { frame = requestAnimationFrame(() => {
          card.classList.remove('is-pending'); finishTimer = setTimeout(finish, 1500);
        }); });
      } else {
        card.classList.remove('is-pending');
        const started = performance.now();
        const tick = now => {
          let complete = true;
          drawing.seriesGroups.forEach((group, i) => {
            const p = clamp((now - started - i * 110) / 1250, 0, 1), eased = 1 - Math.pow(1 - p, 3);
            group.setAttribute('transform', `scale(${eased})`); group.setAttribute('opacity', Math.min(1, p * 4));
            if (p < 1) complete = false;
          });
          if (complete) finish(); else frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      }
    }
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting) && !revealed && drawing) { observer.unobserve(card); reveal(); }
    }, {threshold: .24}) : null;
    function resize() {
      const next = Math.round(stage.clientWidth);
      if (next < 1 || next === width) return;
      width = next; draw();
      if (!observer) finish();
    }
    resize();
    if (observer) observer.observe(card);
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(stage);
    else window.addEventListener('resize', resize, {passive: true});
    card.querySelector('.chart-replay').addEventListener('click', () => {
      if (motion.matches) return;
      cancel(); drawing?.tooltip?.hide(); revealed = false; draw(); reveal();
    });
    motion.addEventListener('change', () => { if (motion.matches) finish(); });
  }

  async function init() {
    try {
      const response = await fetch('assets/performance-data-v14.json?v=20261115-21b');
      if (!response.ok) throw new Error('Chart data unavailable');
      const source = await response.json();
      mountChart(document.querySelector('#radar-chart'), 'radar', source.figures.radar);
      mountChart(document.querySelector('#scatter-chart'), 'scatter', source.figures.scatter);
    } catch {
      document.querySelectorAll('.chart-stage').forEach(stage => {
        stage.replaceChildren(); const link = document.createElement('a');
        link.className = 'chart-loading'; link.href = '#simulation-results'; link.textContent = 'View benchmark tables'; stage.append(link);
      });
    }
  }
  init();
})();
