/* ============================================================
   BLANK. — store.js
   Data produk (FOTO ASLI + varian warna), motif, dan helper
   lintas-iframe. Foto produk asli: img/products/{tpl}/{tpl}-{warna}.jpg
   dibuat dari foto yang diunggah (shading kain dipertahankan).
   ============================================================ */

const BRAND = {
  name: 'BLANK.',
  tag: 'Custom Apparel Studio',
  wa: '6281367836806',
  waPretty: '0813-6783-6806',
  ig: '@blank.studio',
  igUrl: 'https://instagram.com/blank.studio',
  tiktok: '@blank.studio',
  tiktokUrl: 'https://tiktok.com/@blank.studio',
  shopee: 'BLANK Studio',
  shopeeUrl: 'https://shopee.co.id/blank.studio',
  email: 'afsarnavid2@gmail.com',
  address: 'Komplek Geo Asri No. A-12, Jl. Raden Mochtar, Sindanglaya, Cimenyan, Bandung Regency, West Java 40195, Indonesia',
  addressShort: 'Geo Asri A-12, Jl. Raden Mochtar, Cimenyan, Bandung',
  hours: [
    ['Senin – Jumat', '09.00 – 18.00'],
    ['Sabtu', '09.00 – 16.00'],
    ['Minggu / Libur', 'Tutup (chat saja)'],
  ],
};

const rupiah = n => 'Rp ' + Number(n).toLocaleString('id-ID');

/* ---------------- MOTIF (viewBox 0 0 100 100) ---------------- */
const MOTIFS = {
  star: '<path d="M50 7 L61.5 37 L94 37 L67.5 56.5 L77.5 90 L50 70.5 L22.5 90 L32.5 56.5 L6 37 L38.5 37 Z" fill="#E5D3AF" stroke="#2B2118" stroke-width="5" stroke-linejoin="round"/>',
  petir: '<path d="M57 5 L23 55 L44 55 L37 95 L77 41 L54 41 Z" fill="#E5D3AF" stroke="#2B2118" stroke-width="5" stroke-linejoin="round"/>',
  api: '<path d="M50 5 C58 24 82 34 82 60 A32 32 0 0 1 18 60 C18 44 32 36 39 24 C42 34 50 38 50 5 Z" fill="#790D16" stroke="#2B2118" stroke-width="5" stroke-linejoin="round"/><path d="M50 52 C57 61 62 66 62 75 A12 12 0 0 1 38 75 C38 65 46 61 50 52 Z" fill="#E5D3AF"/>',
  hati: '<path d="M50 88 C22 66 9 51 9 33 A20.5 20.5 0 0 1 50 25 A20.5 20.5 0 0 1 91 33 C91 51 78 66 50 88 Z" fill="#790D16" stroke="#2B2118" stroke-width="5" stroke-linejoin="round"/><path d="M24 32 A9 9 0 0 1 34 24" stroke="#E5D3AF" stroke-width="5" fill="none" stroke-linecap="round"/>',
  smiley: '<circle cx="50" cy="50" r="42" fill="#E5D3AF" stroke="#2B2118" stroke-width="5"/><circle cx="36" cy="42" r="5" fill="#2B2118"/><circle cx="64" cy="42" r="5" fill="#2B2118"/><path d="M32 60 Q50 76 68 60" stroke="#2B2118" stroke-width="5" fill="none" stroke-linecap="round"/>',
  gunung: '<path d="M6 82 L38 30 L54 56 L66 40 L94 82 Z" fill="#AEC4D4" stroke="#2B2118" stroke-width="5" stroke-linejoin="round"/><circle cx="72" cy="24" r="9" fill="#E5D3AF" stroke="#2B2118" stroke-width="4"/>',
  bola: '<circle cx="50" cy="50" r="40" fill="#fff" stroke="#2B2118" stroke-width="5"/><path d="M50 22 L62 40 L82 40 L66 54 L72 74 L50 62 L28 74 L34 54 L18 40 L38 40 Z" fill="#2B2118"/>',
  gamepad: '<rect x="10" y="28" width="80" height="44" rx="20" fill="#2B2118" stroke="#790D16" stroke-width="5"/><circle cx="32" cy="50" r="11" fill="#E5D3AF" opacity=".9"/><circle cx="68" cy="44" r="4" fill="#AEC4D4"/><circle cx="76" cy="56" r="4" fill="#790D16"/>',
  kawung: '<g fill="none" stroke="#790D16" stroke-width="4" opacity=".75"><circle cx="30" cy="30" r="12"/><circle cx="70" cy="30" r="12"/><circle cx="30" cy="70" r="12"/><circle cx="70" cy="70" r="12"/><ellipse cx="50" cy="50" rx="9" ry="18"/></g>',
  bunga: '<g fill="#AEC4D4" stroke="#2B2118" stroke-width="4"><circle cx="50" cy="26" r="12"/><circle cx="70" cy="44" r="12"/><circle cx="62" cy="70" r="12"/><circle cx="38" cy="70" r="12"/><circle cx="30" cy="44" r="12"/></g><circle cx="50" cy="50" r="11" fill="#E5D3AF" stroke="#2B2118" stroke-width="4"/>',
  sepuluh: '<text x="50" y="72" font-size="64" font-weight="800" font-family="Archivo Black, sans-serif" text-anchor="middle" fill="#E5D3AF" stroke="#2B2118" stroke-width="3" paint-order="stroke">10</text>',
  logo: '<rect x="18" y="18" width="64" height="64" rx="14" fill="#790D16"/><path d="M36 62 L50 34 L64 62" stroke="#E5D3AF" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
};

/* ---------------- PALET WARNA (varian foto) ----------------
   Tiap varian = file img/products/{tpl}/{tpl}-{key}.jpg hasil generate
   dari foto asli (shading kain dipertahankan). */
const PALETTE = [
  ['putih',  'Putih',     '#f2f1ec'],
  ['hitam',  'Hitam',     '#202024'],
  ['abu',    'Abu Misty', '#b9bdc6'],
  ['merah',  'Merah',     '#c0392b'],
  ['marun',  'Marun',     '#7b2433'],
  ['oranye', 'Oranye',    '#e8702a'],
  ['kuning', 'Kuning',    '#f0c33c'],
  ['hijau',  'Hijau',     '#2e7d5b'],
  ['sage',   'Sage',      '#a8b89a'],
  ['biru',   'Biru',      '#3f6fa8'],
  ['navy',   'Navy',      '#24344d'],
  ['pink',   'Pink',      '#efb9c6'],
  ['ungu',   'Ungu',      '#7a4dd8'],
  ['krem',   'Krem',      '#e6d9bd'],
];

/* Warna khusus = foto asli produk (denim/heather/krem natural) */
const EXTRA_COLORS = {
  denim:   ['denim',   'Biru Denim',   '#4a6f9b'],
  heather: ['heather', 'Abu Heather',  '#c9cbd1'],
  kremnat: ['krem',    'Krem Natural', '#efe8d2'],
};

const HEX2KEY = Object.fromEntries([
  ...PALETTE.map(p => [p[2].toLowerCase(), p[0]]),
  ...Object.values(EXTRA_COLORS).map(([key, , hex]) => [hex.toLowerCase(), key]),
]);

/* ---------------- TEMPLATE PRODUK (FOTO ASLI) ----------------
   Stage studio = 460x552, foto kanvas 920x1104 (rasio pas).
   print = area desain (koordinat stage) yang sudah disesuaikan
   per produk agar pas menempel di objeknya (terverifikasi visual). */
const TEMPLATES = {
  tee: {
    name: 'Kaos', price: 75000, dir: 'img/products/tee', def: 'putih',
    print: { x: 150, y: 130, w: 170, h: 200 },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    desc: 'Katun combed 30s, sablon plastisol premium yang awet.',
  },
  sweat: {
    name: 'Sweater Crewneck', price: 185000, dir: 'img/products/sweat', def: 'denim',
    print: { x: 148, y: 116, w: 175, h: 215 },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    desc: 'Fleece 280 gsm tanpa kapuce, potongan klasik rapi.',
  },
  hoodie: {
    name: 'Hoodie', price: 215000, dir: 'img/products/hoodie', def: 'heather',
    print: { x: 155, y: 180, w: 150, h: 195 },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    desc: 'Fleece 320 gsm, tebal dan hangat, jacquard rapat.',
  },
  socks: {
    name: 'Kaos Kaki', price: 35000, dir: 'img/products/socks', def: 'putih',
    print: { x: 212, y: 70, w: 98, h: 150 },
    sizes: ['38-41', '42-45'],
    desc: 'Katun stretch, full print, nyaman dipakai harian.',
  },
  hat: {
    name: 'Topi', price: 85000, dir: 'img/products/hat', def: 'putih',
    print: { x: 138, y: 192, w: 160, h: 175 },
    sizes: ['All Size'],
    desc: 'Struktur 6 panel, bordir 3D tersedia untuk logo.',
  },
  tote: {
    name: 'Totebag', price: 65000, dir: 'img/products/tote', def: 'krem',
    print: { x: 95, y: 112, w: 280, h: 330 },
    sizes: ['All Size'],
    desc: 'Canvas 12 oz kuat, sablon satu sisi jumbo.',
  },
  sandal: {
    name: 'Sandal Slide', price: 45000, dir: 'img/products/sandal', def: 'putih',
    print: { x: 58, y: 40, w: 112, h: 64 },
    sizes: ['38-39', '40-41', '42-43', '44-45'],
    desc: 'Sandal slide sol empuk, strap bisa full print.',
  },
};

function colorsFor(tplId) {
  const t = TEMPLATES[tplId];
  if (!t) return [];
  const list = PALETTE.slice();
  if (tplId === 'sweat') list.unshift(EXTRA_COLORS.denim);
  if (tplId === 'hoodie') list.unshift(EXTRA_COLORS.heather);
  if (tplId === 'tote') list.unshift(EXTRA_COLORS.kremnat);
  return list;
}

/* Pemetaan jenis barang (dari database) ke template foto */
function tplForJenis(jenis) {
  const j = String(jenis || '').toLowerCase();
  if (/\b(sandal|sendal)\b|alas kaki/.test(j)) return 'sandal';
  if (/(hoodie|jaket|sweter|sweater|crewneck|crew)/.test(j)) return 'hoodie';
  if (/(kaki|\bsock)/.test(j)) return 'socks';
  if (/\b(topi|hat|kupluk|cap)\b/.test(j)) return 'hat';
  if (/\b(tote|tas|bag)\b/.test(j)) return 'tote';
  if (/kemeja/.test(j)) return 'sweat';
  return 'tee';
}

/* Gabungkan FOTO produk + motif menjadi visual produk jadi.
   Motif ditempel di area desain produk (print rect). */
function productVisual(tplId, color, motifId, scale = 0.7) {
  const t = TEMPLATES[tplId];
  if (!t) return '';
  const key = HEX2KEY[String(color || '').toLowerCase()] || color || t.def;
  const safeKey = String(key).replace(/[^a-z]/g, '') || t.def;
  const fileName = `${tplId}-${safeKey}.jpg`;
  const fallbackName = `${tplId}-${String(t.def || safeKey).replace(/[^a-z]/g, '')}.jpg`;
  let inner = `<img class="pviz-img" src="${t.dir}/${fileName}" alt="${t.name}" loading="lazy"
     onerror="this.onerror=null;this.src='${t.dir}/${fallbackName}'">`;
  if (motifId && MOTIFS[motifId]) {
    const p = t.print;
    const s = Math.min(p.w, p.h) * scale;
    const tx = p.x + (p.w - s) / 2;
    const ty = p.y + (p.h - s) / 2;
    inner += `<svg class="pviz-motif" viewBox="0 0 100 100" style="left:${(tx / 460 * 100).toFixed(2)}%;top:${(ty / 552 * 100).toFixed(2)}%;width:${(s / 460 * 100).toFixed(2)}%;height:${(s / 552 * 100).toFixed(2)}%">${MOTIFS[motifId]}</svg>`;
  }
  return `<span class="pviz">${inner}</span>`;
}

/* Alias kompatibilitas kode lama */
function svgProduct(tplId, color, motifId, scale = 0.7) {
  return productVisual(tplId, color, motifId, scale);
}

/* ---------------- DATA PRODUK ---------------- */
const PRODUCTS = [
  { id: 'tee',    name: 'Kaos Cotton Custom',      cat: 'Atasan',    price: 75000,  tpl: 'tee',    color: '#f2f1ec', motif: 'petir',   desc: 'Katun combed 30s, sablon plastisol premium yang awet.', featured: true, badge: 'Terlaris' },
  { id: 'teeov',  name: 'Kaos Oversize Custom',    cat: 'Atasan',    price: 95000,  tpl: 'tee',    color: '#202024', motif: 'star',    desc: 'Combed 24s potongan boxy, ideal untuk sablon jumbo.', featured: true, badge: 'Baru' },
  { id: 'crew',   name: 'Sweater Crewneck Custom', cat: 'Atasan',    price: 185000, tpl: 'sweat',  color: '#4a6f9b', motif: 'gunung',  desc: 'Fleece 280 gsm tanpa kapuce, potongan klasik rapi.', featured: true },
  { id: 'hoodie', name: 'Hoodie Fleece Custom',    cat: 'Atasan',    price: 215000, tpl: 'hoodie', color: '#c9cbd1', motif: 'gamepad', desc: 'Fleece 320 gsm, tebal dan hangat, jacquard rapat.', featured: true },
  { id: 'topi',   name: 'Topi Custom',             cat: 'Aksesori',  price: 85000,  tpl: 'hat',    color: '#f2f1ec', motif: 'star',    desc: 'Struktur 6 panel, bordir 3D tersedia untuk logo.' },
  { id: 'socks',  name: 'Kaos Kaki Custom',        cat: 'Kaki',      price: 35000,  tpl: 'socks',  color: '#f2f1ec', motif: 'api',     desc: 'Katun stretch, full print, nyaman dipakai harian.' },
  { id: 'tote',   name: 'Totebag Custom',          cat: 'Aksesori',  price: 65000,  tpl: 'tote',   color: '#efe8d2', motif: 'bunga',   desc: 'Canvas 12 oz kuat, sablon satu sisi jumbo.' },
  { id: 'sandal', name: 'Sandal Slide Custom',     cat: 'Alas Kaki', price: 45000,  tpl: 'sandal', color: '#f2f1ec', motif: 'smiley',  desc: 'Sandal slide sol empuk, strap bisa full print.' },
  { id: 'jersey', name: 'Jersey Tim Custom',       cat: 'Olahraga',  price: 120000, tpl: 'tee',    color: '#c0392b', motif: 'sepuluh', desc: 'Bahan drifit adem, bebas tambah nama & nomor punggung.', badge: 'Tim' },
  { id: 'couple', name: 'Paket Couple Custom',     cat: 'Atasan',    price: 140000, tpl: 'tee',    color: '#efb9c6', motif: 'hati',    desc: 'Isi 2 kaos couple dengan desain serasi pilihanmu.' },
  { id: 'gaming', name: 'Hoodie Gaming Custom',    cat: 'Atasan',    price: 225000, tpl: 'hoodie', color: '#202024', motif: 'gamepad', desc: 'Edisi gamer: bahan fleece + desain pixel art custom.' },
];
const CATS = ['Semua', 'Atasan', 'Kaki', 'Aksesori', 'Alas Kaki', 'Olahraga'];

/* ---------------- DATA KOLEKSI ---------------- */
const COLLECTIONS = [
  {
    id: 'nusantara', name: 'Nusantara Edition',
    desc: 'Sentuhan batik dan ornamen klasik Nusantara untuk tampilan yang hangat dan berkarakter. Cocok untuk event budaya, souvenir pernikahan, dan merch komunitas seni.',
    tags: ['#batik', '#etnik', '#souvenir'],
    items: [
      { name: 'Crewneck Kawung Navy', tpl: 'sweat', color: '#24344d', motif: 'kawung', price: 195000 },
      { name: 'Totebag Parang Krem',  tpl: 'tote',  color: '#e6d9bd', motif: 'kawung', price: 75000 },
      { name: 'Kaos Truntum Sand',    tpl: 'tee',   color: '#e6d9bd', motif: 'kawung', price: 85000 },
    ],
  },
  {
    id: 'street', name: 'Street Series',
    desc: 'Grafis berani bergaya jalanan: petir, bintang, dan tipografi tebal. Dirancang untuk kamu yang ingin kaos harian terlihat beda tanpa ribet.',
    tags: ['#streetwear', '#grafis', '#urban'],
    items: [
      { name: 'Kaos Bolt Hitam',    tpl: 'tee',   color: '#202024', motif: 'petir', price: 95000 },
      { name: 'Kaos Oversize Star', tpl: 'tee',   color: '#f2f1ec', motif: 'star',  price: 95000 },
      { name: 'Topi Flame Orange',  tpl: 'hat',   color: '#e8702a', motif: 'api',   price: 95000 },
    ],
  },
  {
    id: 'couple', name: 'Couple & Family',
    desc: 'Desain serasi untuk pasangan dan keluarga: dari kaos couple lucu sampai seragam liburan keluarga. Bisa satu desain, beda ukuran untuk tiap anggota.',
    tags: ['#couple', '#keluarga', '#lucu'],
    items: [
      { name: 'Kaos Couple Heart',   tpl: 'tee',   color: '#efb9c6', motif: 'hati',   price: 140000 },
      { name: 'Kaos Keluarga Happy', tpl: 'tee',   color: '#f2f1ec', motif: 'smiley', price: 150000 },
      { name: 'Kaos Kaki Couple',    tpl: 'socks', color: '#efb9c6', motif: 'hati',   price: 45000 },
    ],
  },
  {
    id: 'office', name: 'Office & Komunitas',
    desc: 'Seragam kantor, kaos divisi, dan merchandise komunitas dengan finishing rapi. Tersedia layanan bordir logo dan penyesuaian warna korporat.',
    tags: ['#seragam', '#kantor', '#komunitas'],
    items: [
      { name: 'Crewneck Divisi Navy', tpl: 'sweat', color: '#24344d', motif: 'logo', price: 195000 },
      { name: 'Kaos Korporat',        tpl: 'tee',   color: '#e6d9bd', motif: 'logo', price: 95000 },
      { name: 'Totebag Rapat',        tpl: 'tote',  color: '#b9bdc6', motif: 'logo', price: 75000 },
    ],
  },
  {
    id: 'gaming', name: 'Gaming Squad',
    desc: 'Tema pixel art dan gamepad untuk tim eSports atau squad kamu. Sangat cocok dipadukan dengan hoodies tebal untuk sesi mabar sampai malam.',
    tags: ['#gaming', '#esport', '#pixel'],
    items: [
      { name: 'Hoodie Gamer Pro',  tpl: 'hoodie', color: '#202024', motif: 'gamepad', price: 235000 },
      { name: 'Kaos Squad Pixel',  tpl: 'tee',    color: '#202024', motif: 'gamepad', price: 95000 },
      { name: 'Topi Speedrun',     tpl: 'hat',    color: '#7a4dd8', motif: 'petir',   price: 95000 },
    ],
  },
  {
    id: 'sport', name: 'Sport Club',
    desc: 'Jersey, kaos latihan, dan perlengkapan tim olahraga. Bebas tambah nomor punggung dan nama pemain di bagian belakang tanpa biaya desain.',
    tags: ['#olahraga', '#tim', '#jersey'],
    items: [
      { name: 'Jersey Striker 10', tpl: 'tee',   color: '#c0392b', motif: 'sepuluh', price: 120000 },
      { name: 'Kaos Latihan Ball', tpl: 'tee',   color: '#f2f1ec', motif: 'bola',    price: 85000 },
      { name: 'Kaos Kaki Klub',    tpl: 'socks', color: '#202024', motif: 'bola',    price: 45000 },
    ],
  },
];

/* ---------------- NAVIGASI ANTAR-IFRAME ---------------- */
function goPage(page, payload) {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: 'blank:nav', page: page, payload: payload || null }, '*');
  } else {
    location.href = 'index.html#' + page;
  }
}

/* Delegasi klik untuk semua elemen [data-go] */
document.addEventListener('click', function (e) {
  const el = e.target.closest('[data-go]');
  if (!el) return;
  e.preventDefault();
  const payload = {};
  if (el.dataset.product) payload.product = el.dataset.product;
  if (el.dataset.color) payload.color = el.dataset.color;
  goPage(el.dataset.go, Object.keys(payload).length ? payload : null);
});

/* ---------------- KOMPONEN RENDER ---------------- */
function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
const escapeAttr = escapeHtml;

/* Kartu produk dari baris database (id, nama, deskripsi, jenis_barang, harga, gambar) */
function dbProductCard(p, admin) {
  const tpl = tplForJenis((p.jenis_barang || '') + ' ' + (p.nama || ''));
  const img = p.gambar
    ? `<img src="${escapeAttr(p.gambar)}" alt="${escapeAttr(p.nama)}" class="dbimg" loading="lazy"
         onerror="this.onerror=null;this.closest('.pimg').classList.remove('hasimg');this.outerHTML=${escapeAttr(JSON.stringify(productVisual(tpl, '#f2f1ec', null, 0.62)))}">`
    : productVisual(tpl, '#f2f1ec', null, 0.62);
  return `<article class="pcard" data-id="${escapeAttr(p.id)}">
    <div class="pimg ${p.gambar ? 'hasimg' : ''}">${img}</div>
    <div class="pbody">
      <div class="pcat">${escapeHtml(p.jenis_barang)}</div>
      <h3 class="pname">${escapeHtml(p.nama)}</h3>
      <p class="pdesc">${escapeHtml(p.deskripsi || '')}</p>
      <div class="pfoot">
        <div class="pprice">${rupiah(p.harga)}<small>/ pcs</small></div>
        <button class="btn btn-primary btn-sm" data-go="custom" data-product="${escapeAttr(tpl)}">Custom</button>
      </div>
      ${admin ? `<div class="pactions">
        <button class="mini act-edit" data-act="edit" data-id="${escapeAttr(p.id)}">Edit</button>
        <button class="mini danger act-del" data-act="del" data-id="${escapeAttr(p.id)}">Hapus</button>
      </div>` : ''}
    </div>
  </article>`;
}

function productCard(p) {
  return `<article class="pcard">
    ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
    <div class="pimg">${productVisual(p.tpl, p.color, p.motif)}</div>
    <div class="pbody">
      <div class="pcat">${p.cat}</div>
      <h3 class="pname">${p.name}</h3>
      <p class="pdesc">${p.desc}</p>
      <div class="pfoot">
        <div class="pprice">${rupiah(p.price)}<small>/ pcs</small></div>
        <button class="btn btn-primary btn-sm" data-go="custom" data-product="${p.tpl}" data-color="${p.color}">Custom</button>
      </div>
    </div>
  </article>`;
}

function collectionCard(c, item) {
  return `<article class="pcard">
    <div class="pimg">${productVisual(item.tpl, item.color, item.motif)}</div>
    <div class="pbody">
      <div class="pcat">${c.name}</div>
      <h3 class="pname">${item.name}</h3>
      <div class="pfoot">
        <div class="pprice">${rupiah(item.price)}</div>
        <button class="btn btn-dark btn-sm" data-go="custom" data-product="${item.tpl}" data-color="${item.color}">Custom</button>
      </div>
    </div>
  </article>`;
}

/* Ikon sosial (stroke 1.7, 24 viewBox) */
const SOCIAL_ICONS = {
  ig: '<rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/>',
  tt: '<path d="M14.5 3v10.7a4.3 4.3 0 1 1-4.3-4.3"/><path d="M14.5 5.4c.8 2.1 2.5 3.5 5 3.7"/>',
  shopee: '<path d="M4 8h16l-1.3 11.2a2 2 0 0 1-2 1.8H7.3a2 2 0 0 1-2-1.8L4 8Z"/><path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8"/>',
  wa: '<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z"/><path d="M9 8.5c-.6 2.6 3 6.6 5.8 6.3.8-.1 1.5-.8 1.2-1.6-.2-.5-1.6-.8-2-.7-.6-1.6-1.4-2.2-1.7-2.9.2-.5-.1-1.4-.6-1.7-.7-.4-2.4-.2-2.7.6Z"/>',
};

function socialLink(kind, label) {
  const urls = { ig: BRAND.igUrl, tt: BRAND.tiktokUrl, shopee: BRAND.shopeeUrl };
  const names = { ig: 'Instagram', tt: 'TikTok', shopee: 'Shopee' };
  return `<a class="socialpill" href="${urls[kind]}" target="_blank" rel="noopener">
    <span class="sic"><svg viewBox="0 0 24 24">${SOCIAL_ICONS[kind]}</svg></span>
    <span><b>${names[kind]}</b><span>${label}</span></span>
  </a>`;
}

/* ---------------- FOOTER + BAR STANDALONE ---------------- */
function injectChrome() {
  // Bar kecil hanya jika halaman dibuka langsung tanpa shell iframe
  if (window.parent === window) {
    const bar = document.createElement('div');
    bar.className = 'solo-bar';
    bar.innerHTML = `<a class="brand" href="index.html">BLANK<span class="dot">.</span></a>
      <em>Buka versi penuh lewat index.html</em>`;
    document.body.prepend(bar);
  }
  const f = document.createElement('footer');
  f.className = 'site';
  f.innerHTML = `<div class="wrap">
    <div class="fgrid">
      <div>
        <span class="brand">BLANK<span class="dot">.</span></span>
        <p class="fabout">Studio custom apparel. Pilih produk, tambahkan desainmu, kami produksi — mulai 1 potong.</p>
        <div class="fsocial">
          <a href="${BRAND.igUrl}" target="_blank" rel="noopener" title="Instagram">IG</a>
          <a href="${BRAND.tiktokUrl}" target="_blank" rel="noopener" title="TikTok">TT</a>
          <a href="${BRAND.shopeeUrl}" target="_blank" rel="noopener" title="Shopee">SP</a>
        </div>
      </div>
      <div>
        <h4>Halaman</h4>
        <ul>
          <li><a data-go="home" href="#">Home</a></li>
          <li><a data-go="product" href="#">Produk</a></li>
          <li><a data-go="custom" href="#">Custom Studio</a></li>
          <li><a data-go="collection" href="#">Koleksi</a></li>
          <li><a data-go="contact" href="#">Kontak</a></li>
        </ul>
      </div>
      <div>
        <h4>Hubungi Kami</h4>
        <ul>
          <li>${BRAND.address}</li>
          <li><a href="https://wa.me/${BRAND.wa}" target="_blank" rel="noopener">WhatsApp ${BRAND.waPretty}</a></li>
          <li><a href="mailto:${BRAND.email}">${BRAND.email}</a></li>
          <li><a href="${BRAND.igUrl}" target="_blank" rel="noopener">${BRAND.ig}</a></li>
        </ul>
      </div>
    </div>
    <div class="fbottom">
      <span>© 2026 BLANK. Custom Apparel Studio — Bandung</span>
      <span>Simple. Elegant. Yours.</span>
    </div>
  </div>`;
  document.body.appendChild(f);
}
document.addEventListener('DOMContentLoaded', injectChrome);

/* ---------------- TOAST ---------------- */
let _toastTimer = null;
function toast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}
