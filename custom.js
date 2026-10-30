/* ============================================================
   BLANK. — custom.js
   Custom Studio berbasis FOTO produk asli:
   • Pilih produk  : thumbnail foto asli
   • Warna produk  : varian foto hasil generate (shading kain asli)
   • Area desain   : pas di objek, desain di luar area otomatis
                     terpotong (clipping) di layar & hasil unduhan
   ============================================================ */

/* ---------- State ---------- */
const S = {
  tpl: 'tee',
  colorKey: 'putih',
  colorName: 'Putih',
  size: '',
  tool: 'select',
  sel: null,
  brush: { color: '#2B2118', size: 8 },
};
let hasStrokes = false;
let undoStack = [];
let drag = null;
const preloadCache = {};

/* ---------- Elemen ---------- */
const stage = document.getElementById('stage');
const scaler = document.getElementById('scaler');
const tplImg = document.getElementById('tplImg');
const printbox = document.getElementById('printbox');
const clipzone = document.getElementById('clipzone');
const objLayer = document.getElementById('objLayer');
const drawCanvas = document.getElementById('drawCanvas');
const dctx = drawCanvas.getContext('2d');

const HND_HTML =
  '<div class="hnd hnd-rot" data-h="rot">⟳</div>' +
  '<div class="hnd hnd-del" data-h="del">✕</div>' +
  '<div class="hnd hnd-resize" data-h="resize">◢</div>';

const BRUSH_COLORS = ['#2B2118', '#ffffff', '#790D16', '#E5D3AF', '#5F7E96', '#202024', '#2e7d5b', '#efb9c6'];
const FEE_OBJ = 15000;
const FEE_DRAW = 25000;
const EMOJI_FONT = "'Segoe UI Emoji','Segoe UI Symbol','Apple Color Emoji','Noto Color Emoji',sans-serif";

/* ---------- Util ---------- */
function print() { return TEMPLATES[S.tpl].print; }

function variantSrc(tpl, key) {
  const t = TEMPLATES[tpl];
  const color = String(key || t.def || 'putih').replace(/[^a-z]/gi, '').toLowerCase() || 'putih';
  const tplSlug = String(tpl || 'tee').replace(/[^a-z]/gi, '').toLowerCase() || 'tee';
  return t.dir + '/' + tplSlug + '-' + color + '.jpg';
}

function preloadVariants(tpl) {
  colorsFor(tpl).forEach(([key]) => {
    if (preloadCache[key]) return;
    const im = new Image();
    im.src = variantSrc(tpl, key);
    preloadCache[key] = im;
  });
}

function stagePos(e) {
  const r = stage.getBoundingClientRect();
  const k = r.width / 460;
  return { x: (e.clientX - r.left) / k, y: (e.clientY - r.top) / k, k: k };
}

/* Koordinat objek = relatif terhadap area desain (clipzone) */
function clampCenter(el) {
  const p = print();
  const w = el.offsetWidth, h = el.offsetHeight;
  let cx = el.offsetLeft + w / 2, cy = el.offsetTop + h / 2;
  cx = Math.min(Math.max(cx, 12), p.w - 12);
  cy = Math.min(Math.max(cy, 12), p.h - 12);
  el.style.left = (cx - w / 2) + 'px';
  el.style.top = (cy - h / 2) + 'px';
}

function currentPrice() {
  let total = TEMPLATES[S.tpl].price;
  total += objLayer.querySelectorAll('.obj').length * FEE_OBJ;
  if (hasStrokes) total += FEE_DRAW;
  return total;
}

function price() {
  document.getElementById('sumProd').textContent =
    TEMPLATES[S.tpl].name + ' · ' + S.size + ' · ' + S.colorName;
  document.getElementById('sumPrice').textContent = rupiah(currentPrice());
}

/* ---------- Build UI ---------- */
function buildTplGrid() {
  const g = document.getElementById('tplGrid');
  g.innerHTML = Object.keys(TEMPLATES).map(id =>
    `<button class="tpl" data-tpl="${id}" type="button" title="${TEMPLATES[id].name} — mulai ${rupiah(TEMPLATES[id].price)}">
      <span class="tplart"><img src="${TEMPLATES[id].dir}/${id}-thumb.jpg" alt="${TEMPLATES[id].name}" loading="lazy" draggable="false"></span>
      <span class="tplname">${TEMPLATES[id].name}</span>
      <span class="tplprice">${rupiah(TEMPLATES[id].price)}</span>
    </button>`
  ).join('');
  g.addEventListener('click', e => {
    const b = e.target.closest('.tpl');
    if (b) setTemplate(b.dataset.tpl);
  });
}

function buildSwatches() {
  const g = document.getElementById('colorSwatches');
  const cur = S.colorKey;
  g.innerHTML = colorsFor(S.tpl).map(([key, name, hex]) =>
    `<button class="sw ${key === cur ? 'active' : ''}" data-key="${key}" data-name="${name}" title="${name}" style="background:${hex}"></button>`
  ).join('');
  document.getElementById('colorName').textContent = S.colorName;
}

function buildSizes() {
  const g = document.getElementById('sizeRow');
  const sizes = TEMPLATES[S.tpl].sizes;
  g.innerHTML = sizes.map(s => `<button class="size" data-s="${s}">${s}</button>`).join('');
  if (!sizes.includes(S.size)) S.size = sizes[0];
  g.querySelectorAll('.size').forEach(x => x.classList.toggle('active', x.dataset.s === S.size));
}

function buildBrush() {
  const g = document.getElementById('brushColors');
  g.innerHTML = BRUSH_COLORS.map(c =>
    `<button class="sw" data-c="${c}" style="background:${c}"></button>`
  ).join('');
  g.children[0].classList.add('active');
  g.addEventListener('click', e => {
    const b = e.target.closest('.sw');
    if (!b) return;
    S.brush.color = b.dataset.c;
    g.querySelectorAll('.sw').forEach(x => x.classList.toggle('active', x === b));
  });
  const sz = document.getElementById('brushSize');
  sz.addEventListener('input', () => {
    S.brush.size = +sz.value;
    document.getElementById('brushSizeVal').textContent = sz.value + ' px';
  });
}

/* ---------- Template & warna ---------- */
function applyPrintLayout() {
  const p = print();
  [printbox, clipzone].forEach(el => {
    el.style.left = p.x + 'px';
    el.style.top = p.y + 'px';
    el.style.width = p.w + 'px';
    el.style.height = p.h + 'px';
  });
  drawCanvas.style.width = p.w + 'px';
  drawCanvas.style.height = p.h + 'px';
  drawCanvas.width = p.w * 2;
  drawCanvas.height = p.h * 2;
  dctx.setTransform(2, 0, 0, 2, 0, 0);
  dctx.lineCap = 'round';
  dctx.lineJoin = 'round';
}

function setTemplate(id) {
  S.tpl = id;
  const t = TEMPLATES[id];
  // ganti produk -> kembali ke warna bawaan produk (foto aslinya)
  S.colorKey = t.def;
  S.colorName = (colorsFor(id).find(c => c[0] === t.def) || ['', 'Putih'])[1];
  tplImg.src = variantSrc(id, S.colorKey);
  tplImg.alt = t.name;
  applyPrintLayout();
  undoStack = [];
  hasStrokes = false;
  objLayer.querySelectorAll('.obj').forEach(el => el.remove());
  deselect();
  buildSwatches();
  buildSizes();
  document.querySelectorAll('.tpl').forEach(b => b.classList.toggle('active', b.dataset.tpl === id));
  preloadVariants(id);
  price();
}

function setColor(key, name) {
  S.colorKey = key;
  S.colorName = name || 'Custom';
  tplImg.src = variantSrc(S.tpl, key);
  document.querySelectorAll('#colorSwatches .sw').forEach(b =>
    b.classList.toggle('active', b.dataset.key === key));
  document.getElementById('colorName').textContent = S.colorName;
  price();
}

/* ---------- Tools ---------- */
function setTool(tool) {
  S.tool = tool;
  document.querySelectorAll('.tool').forEach(b => b.classList.toggle('active', b.dataset.tool === tool));
  stage.classList.toggle('drawing', tool === 'draw');
  document.getElementById('imgPanel').hidden = tool !== 'image';
  document.getElementById('textPanel').hidden = tool !== 'text';
  document.getElementById('emojiPanel').hidden = tool !== 'emoji';
  document.getElementById('drawPanel').hidden = tool !== 'draw';
  if (tool !== 'select') deselect();
}
document.getElementById('toolBtns').addEventListener('click', e => {
  const b = e.target.closest('.tool');
  if (b) setTool(b.dataset.tool);
});

/* ---------- Objek: gambar ---------- */
function addImage(src) {
  const p = print();
  const w0 = Math.round(Math.min(p.w * 0.55, p.h * 0.9));
  const wrapper = document.createElement('div');
  wrapper.className = 'obj';
  wrapper.dataset.kind = 'image';
  wrapper.dataset.rot = '0';
  wrapper.dataset.opacity = '1';
  wrapper.dataset.flip = '0';
  wrapper.dataset.ow = w0;
  const img = document.createElement('img');
  img.className = 'oimg';
  img.src = src;
  img.alt = 'Desain';
  img.draggable = false;
  wrapper.appendChild(img);
  wrapper.insertAdjacentHTML('beforeend', HND_HTML);
  wrapper.style.left = Math.round((p.w - w0) / 2) + 'px';
  wrapper.style.top = Math.round((p.h - w0) / 2) + 'px';
  wrapper.style.width = w0 + 'px';
  objLayer.appendChild(wrapper);
  img.onload = function () {
    const h = Math.round(w0 * (img.naturalHeight / img.naturalWidth));
    wrapper.style.height = h + 'px';
    wrapper.dataset.oh = h;
    clampCenter(wrapper);
    select(wrapper);
    price();
  };
  img.onerror = function () { wrapper.remove(); toast('Gambar gagal dimuat'); };
}

/* ---------- Objek: emoji ---------- */
function applyEmojiStyle(w) {
  const e = w.querySelector('.eobj');
  e.style.fontSize = w.dataset.size + 'px';
  e.style.lineHeight = '1';
}

function addEmoji(char) {
  const p = print();
  const defSize = +document.getElementById('emojiSize').value || 48;
  const s0 = Math.min(defSize, p.h);
  const wrapper = document.createElement('div');
  wrapper.className = 'obj';
  wrapper.dataset.kind = 'emoji';
  wrapper.dataset.rot = '0';
  wrapper.dataset.size = s0;
  const e = document.createElement('div');
  e.className = 'eobj';
  e.textContent = char;
  wrapper.appendChild(e);
  applyEmojiStyle(wrapper);
  wrapper.insertAdjacentHTML('beforeend', HND_HTML);
  objLayer.appendChild(wrapper);
  wrapper.style.left = (p.w / 2 - s0 / 2) + 'px';
  wrapper.style.top = (p.h / 2 - s0 / 2) + 'px';
  clampCenter(wrapper);
  select(wrapper);
  price();
}

/* ---------- Objek: teks ---------- */
function applyTextStyle(w) {
  const t = w.querySelector('.tobj');
  t.style.fontFamily = w.dataset.font;
  t.style.fontSize = w.dataset.size + 'px';
  t.style.color = w.dataset.color;
  t.style.fontWeight = w.dataset.bold === '1' ? '800' : '400';
  t.style.fontStyle = w.dataset.italic === '1' ? 'italic' : 'normal';
}

function addText() {
  const p = print();
  const wrapper = document.createElement('div');
  wrapper.className = 'obj';
  wrapper.dataset.kind = 'text';
  wrapper.dataset.rot = '0';
  wrapper.dataset.font = "'Jost', sans-serif";
  wrapper.dataset.size = '32';
  wrapper.dataset.color = '#2B2118';
  wrapper.dataset.bold = '1';
  wrapper.dataset.italic = '0';
  const t = document.createElement('div');
  t.className = 'tobj';
  t.textContent = 'TULIS DI SINI';
  wrapper.appendChild(t);
  applyTextStyle(wrapper);
  wrapper.insertAdjacentHTML('beforeend', HND_HTML);
  objLayer.appendChild(wrapper);
  wrapper.style.left = (p.w / 2 - wrapper.offsetWidth / 2) + 'px';
  wrapper.style.top = (p.h / 2 - wrapper.offsetHeight / 2) + 'px';
  clampCenter(wrapper);
  select(wrapper);
  price();
  toast('Teks ditambahkan — klik dua kali untuk mengedit');
}
document.getElementById('addTextBtn').addEventListener('click', addText);

/* ---------- Seleksi & properti ---------- */
const objPanel = document.getElementById('objPanel');
const textProps = document.getElementById('textProps');
const imageProps = document.getElementById('imageProps');
const emojiProps = document.getElementById('emojiProps');

function select(w) {
  if (S.sel && S.sel !== w) S.sel.classList.remove('selected');
  S.sel = w;
  w.classList.add('selected');
  updateProps();
}
function deselect() {
  if (S.sel) S.sel.classList.remove('selected');
  S.sel = null;
  updateProps();
}
function updateProps() {
  if (!S.sel) { objPanel.hidden = true; return; }
  objPanel.hidden = false;
  const kind = S.sel.dataset.kind;
  const isText = kind === 'text';
  textProps.hidden = !isText;
  emojiProps.hidden = kind !== 'emoji';
  imageProps.hidden = isText || kind === 'emoji';
  if (kind === 'emoji') {
    document.getElementById('emojiObjSize').value = S.sel.dataset.size;
    document.getElementById('emojiObjSizeVal').textContent = S.sel.dataset.size + ' px';
  }
  if (isText) {
    document.getElementById('fontSel').value = S.sel.dataset.font;
    document.getElementById('fontSize').value = S.sel.dataset.size;
    document.getElementById('fontSizeVal').textContent = S.sel.dataset.size + ' px';
    document.getElementById('btnBold').classList.toggle('active', S.sel.dataset.bold === '1');
    document.getElementById('btnItalic').classList.toggle('active', S.sel.dataset.italic === '1');
    document.getElementById('textColor').value = S.sel.dataset.color;
  } else {
    const op = Math.round((+S.sel.dataset.opacity || 1) * 100);
    document.getElementById('imgOpacity').value = op;
    document.getElementById('opacityVal').textContent = op + '%';
  }
}

/* Font & style teks */
document.getElementById('fontSel').addEventListener('change', e => {
  if (S.sel && S.sel.dataset.kind === 'text') {
    S.sel.dataset.font = e.target.value;
    applyTextStyle(S.sel);
  }
});
document.getElementById('fontSize').addEventListener('input', e => {
  if (S.sel && S.sel.dataset.kind === 'text') {
    S.sel.dataset.size = e.target.value;
    document.getElementById('fontSizeVal').textContent = e.target.value + ' px';
    applyTextStyle(S.sel);
  }
});
document.getElementById('btnBold').addEventListener('click', e => {
  if (S.sel && S.sel.dataset.kind === 'text') {
    S.sel.dataset.bold = S.sel.dataset.bold === '1' ? '0' : '1';
    e.currentTarget.classList.toggle('active', S.sel.dataset.bold === '1');
    applyTextStyle(S.sel);
  }
});
document.getElementById('btnItalic').addEventListener('click', e => {
  if (S.sel && S.sel.dataset.kind === 'text') {
    S.sel.dataset.italic = S.sel.dataset.italic === '1' ? '0' : '1';
    e.currentTarget.classList.toggle('active', S.sel.dataset.italic === '1');
    applyTextStyle(S.sel);
  }
});
document.getElementById('emojiSize').addEventListener('input', e => {
  document.getElementById('emojiSizeVal').textContent = e.target.value + ' px';
});
document.getElementById('emojiObjSize').addEventListener('input', e => {
  if (S.sel && S.sel.dataset.kind === 'emoji') {
    S.sel.dataset.size = e.target.value;
    document.getElementById('emojiObjSizeVal').textContent = e.target.value + ' px';
    applyEmojiStyle(S.sel);
    clampCenter(S.sel);
  }
});
document.getElementById('btnColorPick').addEventListener('click', () => {
  document.getElementById('textColor').click();
});
document.getElementById('textColor').addEventListener('input', e => {
  if (S.sel && S.sel.dataset.kind === 'text') {
    S.sel.dataset.color = e.target.value;
    applyTextStyle(S.sel);
  }
});

/* Properti gambar */
document.getElementById('imgOpacity').addEventListener('input', e => {
  if (S.sel && S.sel.dataset.kind === 'image') {
    S.sel.dataset.opacity = e.target.value / 100;
    S.sel.style.opacity = e.target.value / 100;
    document.getElementById('opacityVal').textContent = e.target.value + '%';
  }
});
document.getElementById('btnFlip').addEventListener('click', () => {
  if (S.sel && S.sel.dataset.kind === 'image') {
    S.sel.dataset.flip = S.sel.dataset.flip === '1' ? '0' : '1';
    S.sel.querySelector('.oimg').style.transform =
      S.sel.dataset.flip === '1' ? 'scaleX(-1)' : 'none';
  }
});
document.getElementById('btnResetSize').addEventListener('click', () => {
  if (S.sel && S.sel.dataset.kind === 'image') {
    S.sel.style.width = S.sel.dataset.ow + 'px';
    S.sel.style.height = S.sel.dataset.oh + 'px';
    clampCenter(S.sel);
  }
});

/* Aksi objek */
function delSel() {
  if (!S.sel) return;
  S.sel.remove();
  S.sel = null;
  updateProps();
  price();
}
function dupSel() {
  if (!S.sel) return;
  const c = S.sel.cloneNode(true);
  c.classList.remove('selected');
  if (c.dataset.kind === 'text') c.querySelector('.tobj').contentEditable = 'false';
  c.style.left = (S.sel.offsetLeft + 18) + 'px';
  c.style.top = (S.sel.offsetTop + 18) + 'px';
  objLayer.appendChild(c);
  clampCenter(c);
  select(c);
  price();
}
function layerSel(dir) {
  const el = S.sel;
  if (!el) return;
  if (dir > 0 && el.nextElementSibling) el.parentNode.insertBefore(el.nextElementSibling, el);
  else if (dir < 0 && el.previousElementSibling) el.parentNode.insertBefore(el, el.previousElementSibling);
}
document.getElementById('btnDel').addEventListener('click', delSel);
document.getElementById('btnDup').addEventListener('click', dupSel);
document.getElementById('btnLayerUp').addEventListener('click', () => layerSel(1));
document.getElementById('btnLayerDown').addEventListener('click', () => layerSel(-1));

/* ---------- Interaksi pointer: drag / resize / rotasi ---------- */
objLayer.addEventListener('pointerdown', function (e) {
  if (e.target.isContentEditable) return;
  const hnd = e.target.closest('.hnd');
  const wrapper = e.target.closest('.obj');
  if (!wrapper) { deselect(); return; }
  e.preventDefault();
  if (hnd && hnd.dataset.h === 'del') { if (S.sel === wrapper) { delSel(); } else { wrapper.remove(); } return; }
  if (S.sel !== wrapper) select(wrapper);
  const p = stagePos(e);
  drag = {
    mode: hnd ? hnd.dataset.h : 'move',
    el: wrapper,
    sx: p.x, sy: p.y,
    ol: wrapper.offsetLeft, ot: wrapper.offsetTop,
    ow: wrapper.offsetWidth, oh: wrapper.offsetHeight,
    oa: parseFloat(wrapper.dataset.rot || '0'),
    ofs: parseFloat(wrapper.dataset.size || '32'),
  };
  wrapper.setPointerCapture(e.pointerId);
});

objLayer.addEventListener('pointermove', function (e) {
  if (!drag) return;
  const p = stagePos(e);
  const dx = p.x - drag.sx, dy = p.y - drag.sy;
  const el = drag.el;

  if (drag.mode === 'move') {
    el.style.left = (drag.ol + dx) + 'px';
    el.style.top = (drag.ot + dy) + 'px';
    clampCenter(el);
  } else if (drag.mode === 'resize') {
    const a = -drag.oa * Math.PI / 180;
    const lx = dx * Math.cos(a) + dy * Math.sin(a);
    const ly = -dx * Math.sin(a) + dy * Math.cos(a);
    if (el.dataset.kind === 'image') {
      const f = Math.max(0.15, (drag.ow + lx) / drag.ow);
      el.style.width = Math.max(24, drag.ow * f) + 'px';
      el.style.height = Math.max(24, drag.oh * f) + 'px';
    } else {
      const f = Math.max(0.2, (drag.ow + lx) / drag.ow);
      const fs = Math.min(140, Math.max(10, Math.round(drag.ofs * f)));
      el.dataset.size = fs;
      if (el.dataset.kind === 'emoji') {
        applyEmojiStyle(el);
        document.getElementById('emojiObjSize').value = fs;
        document.getElementById('emojiObjSizeVal').textContent = fs + ' px';
      } else {
        applyTextStyle(el);
        syncTextPropValues(el);
      }
    }
  } else if (drag.mode === 'rot') {
    const cx = el.offsetLeft + el.offsetWidth / 2;
    const cy = el.offsetTop + el.offsetHeight / 2;
    let ang = Math.atan2(p.y - cy, p.x - cx) * 180 / Math.PI + 90;
    const snap = Math.round(ang / 90) * 90;
    if (Math.abs(ang - snap) < 7) ang = snap;
    ang = (ang % 360 + 360) % 360;
    el.dataset.rot = ang;
    el.style.transform = 'rotate(' + ang + 'deg)';
  }
});

function syncTextPropValues(el) {
  document.getElementById('fontSize').value = el.dataset.size;
  document.getElementById('fontSizeVal').textContent = el.dataset.size + ' px';
}

function endDrag() { drag = null; }
objLayer.addEventListener('pointerup', endDrag);
objLayer.addEventListener('pointercancel', endDrag);

/* Edit teks langsung (klik dua kali) */
objLayer.addEventListener('dblclick', function (e) {
  const w = e.target.closest('.obj');
  if (!w || w.dataset.kind !== 'text') return;
  const t = w.querySelector('.tobj');
  t.contentEditable = 'true';
  t.focus();
  const range = document.createRange();
  range.selectNodeContents(t);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
});
objLayer.addEventListener('focusout', function (e) {
  const t = e.target;
  if (t.classList && t.classList.contains('tobj')) {
    t.contentEditable = 'false';
    if (!t.innerText.trim()) t.innerText = 'TEKS';
    if (S.sel && S.sel.contains(t)) clampCenter(S.sel);
  }
});

/* ---------- Mode coretan ---------- */
function pushUndo() {
  try {
    undoStack.push(dctx.getImageData(0, 0, drawCanvas.width, drawCanvas.height));
    if (undoStack.length > 15) undoStack.shift();
  } catch (err) { /* abaikan */ }
}
drawCanvas.addEventListener('pointerdown', function (e) {
  if (S.tool !== 'draw') return;
  e.preventDefault();
  pushUndo();
  const p = stagePos(e);
  dctx.beginPath();
  dctx.moveTo(p.x - print().x, p.y - print().y);
  dctx.strokeStyle = S.brush.color;
  dctx.lineWidth = S.brush.size;
  drag = { mode: 'draw' };
  drawCanvas.setPointerCapture(e.pointerId);
});
drawCanvas.addEventListener('pointermove', function (e) {
  if (!drag || drag.mode !== 'draw') return;
  const p = stagePos(e);
  dctx.lineTo(p.x - print().x, p.y - print().y);
  dctx.stroke();
  dctx.beginPath();
  dctx.moveTo(p.x - print().x, p.y - print().y);
});
drawCanvas.addEventListener('pointerup', function () {
  if (drag && drag.mode === 'draw') { hasStrokes = true; price(); }
  endDrag();
});
document.getElementById('undoDraw').addEventListener('click', function () {
  const prev = undoStack.pop();
  if (prev) dctx.putImageData(prev, 0, 0);
  else toast('Tidak ada yang bisa diurungkan');
});
document.getElementById('clearDraw').addEventListener('click', function () {
  pushUndo();
  dctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  hasStrokes = false;
  price();
  toast('Coretan dihapus');
});

/* ---------- Unggah gambar ---------- */
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
uploadZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', function () {
  const f = this.files[0];
  if (!f) return;
  if (!f.type.startsWith('image/')) { toast('File harus berupa gambar'); return; }
  if (f.size > 5 * 1024 * 1024) { toast('Ukuran maksimal 5 MB'); return; }
  const reader = new FileReader();
  reader.onload = ev => addImage(ev.target.result);
  reader.readAsDataURL(f);
  this.value = '';
});

/* ---------- Keyboard ---------- */
window.addEventListener('keydown', function (e) {
  const ae = document.activeElement;
  const editing = ae && (ae.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(ae.tagName));
  if (editing) return;
  if ((e.key === 'Delete' || e.key === 'Backspace') && S.sel) { e.preventDefault(); delSel(); }
  else if (e.key === 'Escape') deselect();
  else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') { e.preventDefault(); dupSel(); }
});

/* ---------- Skala stage responsif ---------- */
function scaleStage() {
  const avail = scaler.clientWidth - 8;
  const k = Math.min(1, avail / 460);
  stage.style.transform = 'scale(' + k + ')';
  scaler.style.height = (552 * k + 8) + 'px';
}
window.addEventListener('resize', scaleStage);

/* ---------- Ekspor PNG ---------- */
function drawObject(ctx, el, SS, p) {
  const w = el.offsetWidth, h = el.offsetHeight;
  const cx = p.x + el.offsetLeft + w / 2, cy = p.y + el.offsetTop + h / 2;
  const rot = (parseFloat(el.dataset.rot || '0')) * Math.PI / 180;
  ctx.save();
  ctx.translate(cx * SS, cy * SS);
  ctx.rotate(rot);
  if (el.dataset.kind === 'image') {
    const im = el.querySelector('img');
    ctx.globalAlpha = parseFloat(el.dataset.opacity || '1');
    ctx.scale(el.dataset.flip === '1' ? -1 : 1, 1);
    try { ctx.drawImage(im, -w / 2 * SS, -h / 2 * SS, w * SS, h * SS); } catch (err) { /* lewati */ }
  } else if (el.dataset.kind === 'emoji') {
    const e = el.querySelector('.eobj');
    const fs = parseFloat(el.dataset.size || '48');
    ctx.font = Math.round(fs * SS) + 'px ' + EMOJI_FONT;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    try { ctx.fillText(e.textContent, 0, fs * SS * 0.04); } catch (err) { /* lewati */ }
  } else {
    const t = el.querySelector('.tobj');
    const fs = parseFloat(el.dataset.size || '32');
    const fam = el.dataset.font || "'Jost', sans-serif";
    const bold = el.dataset.bold === '1' ? '800' : '400';
    const ital = el.dataset.italic === '1' ? 'italic ' : '';
    ctx.font = ital + bold + ' ' + Math.round(fs * SS) + 'px ' + fam;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = el.dataset.color || '#2B2118';
    const lines = t.innerText.split('\n');
    const lh = fs * 1.15 * SS;
    const total = lines.length * lh;
    lines.forEach(function (ln, i) {
      ctx.fillText(ln, 0, -total / 2 + lh * (i + 0.5));
    });
  }
  ctx.restore();
}

async function exportPNG() {
  try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (err) { /* lanjut */ }
  const SS = 2;
  const p = print();
  const c = document.createElement('canvas');
  c.width = 460 * SS;
  c.height = 552 * SS;
  const ctx = c.getContext('2d');

  // 1) foto produk (varian warna terpilih)
  try { ctx.drawImage(tplImg, 0, 0, c.width, c.height); } catch (err) { /* lanjut */ }

  // 2) desain DIGAMBARKAN HANYA DI DALAM AREA DESAIN (terpotong rapi)
  ctx.save();
  ctx.beginPath();
  ctx.rect(p.x * SS, p.y * SS, p.w * SS, p.h * SS);
  ctx.clip();
  ctx.drawImage(drawCanvas, 0, 0, drawCanvas.width, drawCanvas.height, p.x * SS, p.y * SS, p.w * SS, p.h * SS);
  objLayer.querySelectorAll('.obj').forEach(function (el) { drawObject(ctx, el, SS, p); });
  ctx.restore();

  const a = document.createElement('a');
  a.download = 'desain-blank-' + S.tpl + '-' + S.colorKey + '-' + Date.now() + '.png';
  a.href = c.toDataURL('image/png');
  a.click();
  toast('Desain terunduh — kirim ke WhatsApp kami untuk diproduksi');
}
document.getElementById('btnDownload').addEventListener('click', exportPNG);

/* ---------- Pesan WA ---------- */
document.getElementById('btnOrder').addEventListener('click', function () {
  const t = TEMPLATES[S.tpl];
  const msg = 'Halo BLANK! Saya mau pesan custom:\n' +
    '• Produk: ' + t.name + '\n' +
    '• Warna: ' + S.colorName + '\n' +
    '• Ukuran: ' + S.size + '\n' +
    '• Estimasi: ' + rupiah(currentPrice()) + '\n\n' +
    'Desain saya lampirkan di chat ini (hasil unduhan PNG / screenshot).';
  window.open('https://wa.me/' + BRAND.wa + '?text=' + encodeURIComponent(msg), '_blank');
});

/* ---------- Init ---------- */
buildTplGrid();
buildBrush();
initEmojiPicker({ mount: '#emojiPanel', onPick: addEmoji });

document.getElementById('colorSwatches').addEventListener('click', e => {
  const b = e.target.closest('.sw');
  if (b) setColor(b.dataset.key, b.dataset.name);
});

document.getElementById('sizeRow').addEventListener('click', e => {
  const b = e.target.closest('.size');
  if (!b) return;
  S.size = b.dataset.s;
  document.querySelectorAll('#sizeRow .size').forEach(x => x.classList.toggle('active', x === b));
  price();
});

(function initFromQuery() {
  const qp = new URLSearchParams(location.search);
  const p = qp.get('product');
  const c = qp.get('color');
  const start = p && TEMPLATES[p] ? p : 'tee';
  if (c) {
    const key = HEX2KEY[String(c).toLowerCase()] || (TEMPLATES[start].def === c ? c : null);
    if (key) {
      const known = colorsFor(start).find(x => x[0] === key);
      if (known) { S.colorKey = key; S.colorName = known[1]; }
    }
  }
  setTemplate(start);
  price();
})();

scaleStage();
