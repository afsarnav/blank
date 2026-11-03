/* ============================================================
   BLANK. — store.js
   Data produk (FOTO ASLI + varian warna), motif, dan helper
   lintas-iframe. Foto produk asli: img/products/{tpl}/{warna}.jpg
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

/* ---------------- MOTIF (viewBox 0 0 100 100) ----------------
   PANORAMA '26 — satu keluarga gaya: outline tinta #2B2118,
   sudut membulat, isi warna brand (burgundy, champagne, powder
   blue, cream, sage). Lanskap & hidup sehari-hari Bandung. */
const MOTIFS = {
  fajar:   '<path d="M28 60 A22 22 0 0 1 72 60 Z" fill="#E5D3AF" stroke="#2B2118" stroke-width="5" stroke-linejoin="round"/><path d="M8 60 H92" stroke="#2B2118" stroke-width="5" stroke-linecap="round"/><path d="M50 26 V14 M25 36 L17 28 M75 36 L83 28" stroke="#2B2118" stroke-width="5" stroke-linecap="round"/>',
  senja:   '<path d="M30 48 A20 20 0 0 1 70 48" fill="#790D16" stroke="#2B2118" stroke-width="5" stroke-linecap="round"/><path d="M10 48 H90" stroke="#2B2118" stroke-width="5" stroke-linecap="round"/><path d="M22 62 H44 M56 62 H78 M34 76 H66" stroke="#AEC4D4" stroke-width="5" stroke-linecap="round"/>',
  bulan:   '<path d="M64 10 A42 42 0 1 0 90 58 A34 34 0 0 1 64 10 Z" fill="#E5D3AF" stroke="#2B2118" stroke-width="5" stroke-linejoin="round"/><path d="M80 14 l2.6 5.6 5.6 2.6 -5.6 2.6 -2.6 5.6 -2.6 -5.6 -5.6 -2.6 5.6 -2.6 Z" fill="#AEC4D4" stroke="#2B2118" stroke-width="2.5" stroke-linejoin="round"/>',
  hujan:   '<path d="M32 50 A13 13 0 0 1 34 26 A17 17 0 0 1 66 22 A13 13 0 0 1 68 50 Z" fill="#F5EFE1" stroke="#2B2118" stroke-width="5" stroke-linejoin="round"/><path d="M34 60 L30 72 M50 60 L46 72 M66 60 L62 72" stroke="#AEC4D4" stroke-width="5" stroke-linecap="round"/>',
  petir:   '<path d="M32 48 A13 13 0 0 1 34 24 A17 17 0 0 1 66 20 A13 13 0 0 1 68 48 Z" fill="#F5EFE1" stroke="#2B2118" stroke-width="5" stroke-linejoin="round"/><path d="M54 44 L38 66 H50 L44 90 L66 58 H54 L60 44 Z" fill="#E5D3AF" stroke="#2B2118" stroke-width="4" stroke-linejoin="round"/>',
  gunung:  '<path d="M6 80 L36 28 L54 56 L66 40 L94 80 Z" fill="#AEC4D4" stroke="#2B2118" stroke-width="5" stroke-linejoin="round"/><path d="M28 46 L36 32 L44 46" fill="none" stroke="#F5EFE1" stroke-width="4" stroke-linecap="round"/><circle cx="78" cy="22" r="9" fill="#E5D3AF" stroke="#2B2118" stroke-width="4"/>',
  sawah:   '<circle cx="76" cy="20" r="10" fill="#E5D3AF" stroke="#2B2118" stroke-width="4"/><g fill="none" stroke="#2B2118" stroke-width="5" stroke-linecap="round"><path d="M8 42 Q50 30 92 42"/><path d="M12 58 Q50 46 88 58"/><path d="M16 74 Q50 62 84 74"/></g>',
  ombak:   '<circle cx="78" cy="20" r="9" fill="#E5D3AF" stroke="#2B2118" stroke-width="4"/><path d="M8 46 Q20 30 32 46 T56 46 T80 46" fill="none" stroke="#AEC4D4" stroke-width="5" stroke-linecap="round"/><path d="M20 68 Q32 52 44 68 T68 68" fill="none" stroke="#2B2118" stroke-width="5" stroke-linecap="round"/>',
  sungai:  '<path d="M36 8 C66 22 28 40 56 54 C82 67 50 82 38 92" fill="none" stroke="#2B2118" stroke-width="14" stroke-linecap="round"/><path d="M36 8 C66 22 28 40 56 54 C82 67 50 82 38 92" fill="none" stroke="#AEC4D4" stroke-width="7" stroke-linecap="round"/>',
  daun:    '<path d="M50 90 C22 68 22 30 50 10 C78 30 78 68 50 90 Z" fill="#a8b89a" stroke="#2B2118" stroke-width="5" stroke-linejoin="round"/><path d="M50 22 V78 M50 40 L37 30 M50 40 L63 30 M50 58 L35 46 M50 58 L65 46" stroke="#2B2118" stroke-width="4" fill="none" stroke-linecap="round"/>',
  kopi:    '<path d="M24 44 H68 L64 72 A10 10 0 0 1 54 80 H38 A10 10 0 0 1 28 72 Z" fill="#F5EFE1" stroke="#2B2118" stroke-width="5" stroke-linejoin="round"/><path d="M68 50 H74 A9 9 0 0 1 74 68 H65" fill="none" stroke="#2B2118" stroke-width="5"/><path d="M38 32 Q43 25 38 18 M54 32 Q59 25 54 18" stroke="#790D16" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M18 90 H82" stroke="#2B2118" stroke-width="5" stroke-linecap="round"/>',
  kota:    '<g fill="#2B2118"><rect x="10" y="48" width="15" height="34"/><rect x="29" y="30" width="17" height="52"/><rect x="50" y="42" width="13" height="40"/><rect x="67" y="22" width="17" height="60"/></g><g fill="#E5D3AF"><rect x="33" y="38" width="4" height="5"/><rect x="41" y="38" width="4" height="5"/><rect x="33" y="50" width="4" height="5"/><rect x="41" y="50" width="4" height="5"/><rect x="71" y="32" width="4" height="5"/><rect x="79" y="32" width="4" height="5"/><rect x="71" y="44" width="4" height="5"/><rect x="79" y="44" width="4" height="5"/></g><circle cx="20" cy="20" r="9" fill="#AEC4D4" stroke="#2B2118" stroke-width="4"/>',
  hati:    '<path d="M50 86 C26 66 12 52 12 37 A18 18 0 0 1 50 30 A18 18 0 0 1 88 37 C88 52 74 66 50 86 Z" fill="#790D16" stroke="#2B2118" stroke-width="5" stroke-linejoin="round"/><path d="M27 38 A10 10 0 0 1 37 28" stroke="#E5D3AF" stroke-width="4" fill="none" stroke-linecap="round"/>',
  bola:    '<circle cx="50" cy="50" r="38" fill="#F5EFE1" stroke="#2B2118" stroke-width="5"/><path d="M50 34 L65 45 L59 63 H41 L35 45 Z" fill="#2B2118"/><path d="M50 34 V20 M65 45 L80 40 M59 63 L69 77 M41 63 L31 77 M35 45 L20 40" stroke="#2B2118" stroke-width="4" stroke-linecap="round"/>',
  sepuluh: '<text x="50" y="72" font-size="64" font-weight="800" font-family="Archivo Black, sans-serif" text-anchor="middle" fill="#E5D3AF" stroke="#2B2118" stroke-width="3" paint-order="stroke">10</text>',
  logo:    '<rect x="18" y="18" width="64" height="64" rx="14" fill="#790D16"/><path d="M36 62 L50 34 L64 62" stroke="#E5D3AF" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
};

/* ---------------- PALET WARNA (varian foto) ----------------
   Tiap varian = file img/products/{tpl}/{key}.jpg hasil generate
   dari foto asli (shading kain dipertahankan). */
const PALETTE = [
  ['putih',  'Putih',     '#f2f1ec'],
  ['hitam',  'Hitam',     '#202024'],
  ['abu',    'Abu Misty', '#b9bdc6'],
  ['merah',  'Merah',     '#c0392b'],
  ['marun',  'Marun',     '#7b2433'],
  ['kuning', 'Kuning',    '#f0c33c'],
  ['hijau',  'Hijau',     '#2e7d5b'],
  ['sage',   'Sage',      '#a8b89a'],
  ['biru',   'Biru',      '#3f6fa8'],
  ['pink',   'Pink',      '#efb9c6'],
];
/* Warna khusus = foto asli produk (denim/heather) */
const EXTRA_COLORS = {
  denim:   ['denim',   'Biru Denim', '#4a6f9b'],
  heather: ['heather', 'Abu Heather', '#c9cbd1'],
};
const HEX2KEY = Object.fromEntries(
  PALETTE.concat(Object.values(EXTRA_COLORS)).map(p => [p[2].toLowerCase(), p[0]]));

/* ---------------- TEMPLATE PRODUK (FOTO ASLI) ----------------
   Stage studio = 460x552, foto kanvas 1380x1656 (3x pas).
   print = area desain (koordinat stage) hasil deteksi otomatis
   dari pipeline gambar; 100% piksel di dalam objek. */
const TEMPLATES = {
  tee: {
    name: 'Kaos', price: 75000, dir: 'img/products/tee', def: 'putih',
    print: { x: 152, y: 148, w: 154, h: 157 },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    desc: 'Katun combed 30s, sablon plastisol premium yang awet.',
  },
  sweat: {
    name: 'Sweater Crewneck', price: 185000, dir: 'img/products/sweat', def: 'denim',
    print: { x: 137, y: 126, w: 186, h: 157 },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    desc: 'Fleece 280 gsm tanpa kapuce, potongan klasik rapi.',
  },
  hoodie: {
    name: 'Hoodie', price: 215000, dir: 'img/products/hoodie', def: 'heather',
    print: { x: 147, y: 157, w: 163, h: 126 },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    desc: 'Fleece 320 gsm, tebal dan hangat, jacquard rapat.',
  },
  socks: {
    name: 'Kaos Kaki', price: 35000, dir: 'img/products/socks', def: 'putih',
    print: { x: 232, y: 116, w: 86, h: 86 },
    sizes: ['38-41', '42-45'],
    desc: 'Katun stretch, full print, nyaman dipakai harian.',
  },
  hat: {
    name: 'Topi', price: 85000, dir: 'img/products/hat', def: 'putih',
    print: { x: 166, y: 152, w: 125, h: 136 },
    sizes: ['All Size'],
    desc: 'Struktur 6 panel, bordir 3D tersedia untuk logo.',
  },
  tote: {
    name: 'Totebag', price: 65000, dir: 'img/products/tote', def: 'putih',
    print: { x: 86, y: 98, w: 287, h: 270 },
    sizes: ['All Size'],
    desc: 'Canvas 12 oz kuat, sablon satu sisi jumbo.',
  },
};

function colorsFor(tplId) {
  const t = TEMPLATES[tplId];
  if (!t) return [];
  const list = PALETTE.slice();
  if (tplId === 'sweat') list.unshift(EXTRA_COLORS.denim);
  if (tplId === 'hoodie') list.unshift(EXTRA_COLORS.heather);
  return list;
}

/* Pemetaan jenis barang (dari database) ke template foto */
function tplForJenis(jenis) {
  const j = String(jenis || '').toLowerCase();
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
  let inner = `<img class="pviz-img" src="${t.dir}/${safeKey}.jpg" alt="${t.name}" loading="lazy"
     onerror="this.onerror=null;this.src='${t.dir}/${t.def}.jpg'">`;
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

/* ---------------- DATA PRODUK ----------------
   Tema PANORAMA '26: lanskap & hidup sehari-hari Bandung. */
const PRODUCTS = [
  { id: 'tee',    name: 'Kaos Fajar Custom',       cat: 'Atasan',   price: 75000,  tpl: 'tee',    color: '#f2f1ec', motif: 'fajar',   desc: 'Katun combed 30s dengan sablon matahari fajar, plastisol premium.', featured: true, badge: 'Terlaris' },
  { id: 'teeov',  name: 'Kaos Oversize Monsun',    cat: 'Atasan',   price: 95000,  tpl: 'tee',    color: '#202024', motif: 'petir',   desc: 'Combed 24s potongan boxy dengan grafis petir, ideal sablon jumbo.', featured: true, badge: 'Baru' },
  { id: 'crew',   name: 'Sweater Dataran Custom',  cat: 'Atasan',   price: 185000, tpl: 'sweat',  color: '#4a6f9b', motif: 'gunung',  desc: 'Fleece 280 gsm dengan motiv pegunungan, potongan klasik rapi.', featured: true },
  { id: 'hoodie', name: 'Hoodie Senja Custom',     cat: 'Atasan',   price: 215000, tpl: 'hoodie', color: '#c9cbd1', motif: 'bulan',   desc: 'Fleece 320 gsm tebal dan hangat dengan motiv bulan sabit.', featured: true },
  { id: 'topi',   name: 'Topi Kota Custom',        cat: 'Aksesori', price: 85000,  tpl: 'hat',    color: '#f2f1ec', motif: 'kota',    desc: 'Struktur 6 panel dengan siluet kota, bordir 3D tersedia.' },
  { id: 'socks',  name: 'Kaos Kaki Hujan Custom',  cat: 'Kaki',     price: 35000,  tpl: 'socks',  color: '#f2f1ec', motif: 'hujan',   desc: 'Katun stretch dengan motiv gerimis, nyaman dipakai harian.' },
  { id: 'tote',   name: 'Totebag Sawah Custom',    cat: 'Aksesori', price: 65000,  tpl: 'tote',   color: '#f2f1ec', motif: 'sawah',   desc: 'Canvas 12 oz kuat dengan motiv undakan sawah, sablon jumbo.' },
  { id: 'jersey', name: 'Jersey Lapangan Custom',  cat: 'Olahraga', price: 120000, tpl: 'tee',    color: '#c0392b', motif: 'sepuluh', desc: 'Bahan drifit adem, bebas tambah nama & nomor punggung.', badge: 'Tim' },
  { id: 'couple', name: 'Paket Couple Kasih',      cat: 'Atasan',   price: 140000, tpl: 'tee',    color: '#efb9c6', motif: 'hati',    desc: 'Isi 2 kaos couple dengan desain serasi pilihanmu.' },
  { id: 'kopi',   name: 'Kaos Kopi Senja Custom',  cat: 'Atasan',   price: 85000,  tpl: 'tee',    color: '#7b2433', motif: 'kopi',    desc: 'Untuk penikmat kopi senja: combed 30s, sablon cangkir hangat.' },
];
const CATS = ['Semua', 'Atasan', 'Aksesori', 'Kaki', 'Olahraga'];

/* ---------------- DATA KOLEKSI ----------------
   PANORAMA '26 — enam seri satu tema: fajar, monsun, dataran,
   senja, kota, dan lapangan. Semua motiv satu keluarga gaya. */
const COLLECTIONS = [
  {
    id: 'fajar', name: 'Seri Fajar',
    desc: 'Matahari terbit di atas garis horizon: motif fajar dengan aksen champagne hangat. Untuk kamu yang menangkap pagi sebelum kota terjaga.',
    tags: ['#fajar', '#pagi', '#panorama26'],
    items: [
      { name: 'Kaos Fajar Emas',   tpl: 'tee',  color: '#f2f1ec', motif: 'fajar', price: 85000 },
      { name: 'Topi Fajar Kuning', tpl: 'hat',  color: '#f0c33c', motif: 'fajar', price: 95000 },
      { name: 'Totebag Pagi',      tpl: 'tote', color: '#f2f1ec', motif: 'fajar', price: 75000 },
    ],
  },
  {
    id: 'monsun', name: 'Seri Monsun',
    desc: 'Musim hujan Bandung: awan, gerimis, dan petir digambar satu gaya garis. Kaos dan hoodie yang nyaman dari rumah sampai studio.',
    tags: ['#monsun', '#hujan', '#panorama26'],
    items: [
      { name: 'Hoodie Gerimis',      tpl: 'hoodie', color: '#c9cbd1', motif: 'hujan', price: 225000 },
      { name: 'Kaos Petir Malam',    tpl: 'tee',    color: '#202024', motif: 'petir', price: 95000 },
      { name: 'Kaos Kaki Gerimis',   tpl: 'socks',  color: '#f2f1ec', motif: 'hujan', price: 40000 },
    ],
  },
  {
    id: 'dataran', name: 'Seri Dataran',
    desc: 'Pegunungan Parahyangan dan undakan sawah: sage, denim, dan garis kontur yang tenang. Padanan tepat untuk perjalanan pagi ke Lembang.',
    tags: ['#dataran', '#gunung', '#panorama26'],
    items: [
      { name: 'Sweater Lereng',   tpl: 'sweat', color: '#4a6f9b', motif: 'gunung', price: 195000 },
      { name: 'Kaos Sawah Sage',  tpl: 'tee',   color: '#a8b89a', motif: 'sawah',  price: 85000 },
      { name: 'Totebag Panen',    tpl: 'tote',  color: '#f2f1ec', motif: 'sawah',  price: 75000 },
    ],
  },
  {
    id: 'senja', name: 'Seri Senja',
    desc: 'Langit jingga saat matahari turun: marun, bulan sabit, dan pantulan di air. Koleksi hangat untuk sore di beranda sambil ngopi.',
    tags: ['#senja', '#sore', '#panorama26'],
    items: [
      { name: 'Kaos Senja Marun', tpl: 'tee',   color: '#7b2433', motif: 'senja', price: 85000 },
      { name: 'Sweater Bulan',    tpl: 'sweat', color: '#4a6f9b', motif: 'bulan', price: 195000 },
      { name: 'Topi Bulan Sabit', tpl: 'hat',   color: '#f2f1ec', motif: 'bulan', price: 95000 },
    ],
  },
  {
    id: 'kota', name: 'Seri Kota',
    desc: 'Siluet gedung dan lampu jendela Bandung di malam hari: monokrom tinta dengan aksen champagne. Untuk yang betah keliling kota.',
    tags: ['#kota', '#urban', '#panorama26'],
    items: [
      { name: 'Kaos Kota Hitam',   tpl: 'tee',    color: '#202024', motif: 'kota', price: 85000 },
      { name: 'Hoodie Malam Kota', tpl: 'hoodie', color: '#c9cbd1', motif: 'kota', price: 225000 },
      { name: 'Totebag Kota',      tpl: 'tote',   color: '#f2f1ec', motif: 'kota', price: 75000 },
    ],
  },
  {
    id: 'lapangan', name: 'Seri Lapangan',
    desc: 'Jersey dan perlengkapan tim untuk futsal sampai fun bike: nomor punggung bebas custom, bola dan garis lapangan satu gaya.',
    tags: ['#olahraga', '#tim', '#panorama26'],
    items: [
      { name: 'Jersey Nomor 10', tpl: 'tee',   color: '#c0392b', motif: 'sepuluh', price: 120000 },
      { name: 'Kaos Tendang',    tpl: 'tee',   color: '#f2f1ec', motif: 'bola',    price: 85000 },
      { name: 'Kaos Kaki Klub',  tpl: 'socks', color: '#202024', motif: 'bola',    price: 40000 },
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
