/**
 * Shinoda Interactions v3
 * Single inverted cursor, gravity, theme toggle
 *
 * v3: Fixed cursor XY offset — uses left/top positioning, not calc transform.
 *     Snappier lerp (0.22). Opacity scale: 20/40/60/80 only.
 */

/* ─── CURSOR ─────────────────────────────────────────────────────────── */

const cursor = document.createElement('div');
cursor.className = 'cursor is-hidden';
const cursorLabel = document.createElement('span');
cursorLabel.className = 'cursor-label';
cursor.appendChild(cursorLabel);
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

const LERP = 0.22;

function animateCursor() {
  curX += (mouseX - curX) * LERP;
  curY += (mouseY - curY) * LERP;
  cursor.style.left = curX + 'px';
  cursor.style.top = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.classList.remove('is-hidden');
});
document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
document.addEventListener('mouseenter', () => cursor.classList.remove('is-hidden'));

/* ─── CONTEXT DETECTION ──────────────────────────────────────────────── */

const html = document.documentElement;

function clearContext() {
  html.classList.remove('cursor--text', 'cursor--btn', 'cursor--chip', 'cursor--active');
  cursor.style.removeProperty('--cursor-btn-w');
  cursor.style.removeProperty('--cursor-btn-h');
  cursorLabel.textContent = '';
}

function setBtnCursor(el) {
  html.classList.add('cursor--btn');
  // Walk up to the nearest interactive ancestor so we measure
  // the actual clickable footprint, not a child text node.
  const target = el.closest('button, a, [role="button"], [data-cursor="btn"]') || el;
  const rect = target.getBoundingClientRect();
  cursor.style.setProperty('--cursor-btn-w', `${rect.width}px`);
  cursor.style.setProperty('--cursor-btn-h', `${rect.height}px`);
}

function setContext(el) {
  clearContext();
  if (!el || el === document.body || el === html) return;

  const tag  = el.tagName?.toLowerCase();
  const role = el.getAttribute('role');

  // Buttons — morph cursor into element footprint, then fade out
  if (tag === 'button' || role === 'button' || el.classList.contains('btn') || el.dataset.cursor === 'btn') {
    setBtnCursor(el);
    return;
  }

  // Links — same morph behaviour: cursor becomes the link's footprint
  if (tag === 'a' || el.classList.contains('link')) {
    setBtnCursor(el);
    return;
  }

  if (tag === 'img' || tag === 'figure' || el.dataset.cursor === 'expand') {
    html.classList.add('cursor--chip');
    cursorLabel.textContent = el.dataset.cursorLabel || 'expand';
    return;
  }

  if (tag === 'input' || tag === 'textarea' || el.isContentEditable ||
      ['p','h1','h2','h3','h4','h5','h6','li','blockquote','span','em','strong','time','cite'].includes(tag)) {
    html.classList.add('cursor--text');
  }
}

document.addEventListener('mouseover', e => setContext(e.target));
document.addEventListener('mouseout',  () => clearContext());
document.addEventListener('mousedown', () => html.classList.add('cursor--active'));
document.addEventListener('mouseup',   () => html.classList.remove('cursor--active'));

document.addEventListener('focusin', e => {
  const el = e.target;
  if (!el || el === document.body) return;
  const tag = el.tagName?.toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable) {
    html.classList.add('cursor--focused');
  }
});
document.addEventListener('focusout', () => {
  html.classList.remove('cursor--focused');
});

/* ─── GRAVITY ────────────────────────────────────────────────────────── */

const GRAVITY_RADIUS   = 80;
const GRAVITY_STRENGTH = 0.25;

function applyGravity(el) {
  document.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < GRAVITY_RADIUS) {
      const pull = (1 - dist / GRAVITY_RADIUS) * GRAVITY_STRENGTH;
      el.style.setProperty('--gravity-x', `${dx * pull}px`);
      el.style.setProperty('--gravity-y', `${dy * pull}px`);
    } else {
      el.style.setProperty('--gravity-x', '0px');
      el.style.setProperty('--gravity-y', '0px');
    }
  });
}

document.querySelectorAll('[data-gravity], .btn, a.link').forEach(applyGravity);

/* ─── THEME ──────────────────────────────────────────────────────────── */

export function initTheme() {
  const stored = localStorage.getItem('shinoda-theme');
  if (stored) document.documentElement.setAttribute('data-theme', stored);
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const osDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const next = current === 'dark' ? 'light' : current === 'light' ? 'dark' : osDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('shinoda-theme', next);
  return next;
}

export function getTheme() {
  return document.documentElement.getAttribute('data-theme')
    || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

initTheme();
