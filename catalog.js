/* ============================================================
   BLANK. — catalog.js
   Katalog produk dari database (via /api/products):
   render, pencarian, filter jenis, mode kelola (tambah/edit/hapus).
   ============================================================ */

const Catalog = {
  products: [],
  search: '',
  jenis: 'Semua',
  admin: false,
  editingId: null,   // null = mode tambah
  pendingFile: null, // file gambar baru yang dipilih di form
  removedExistingImage: false,
  loading: false,
};

/* ---------- Data ---------- */
async function fetchProducts() {
  Catalog.loading = true;
  renderCatalog();
  try {
    const res = await fetch('/api/products?_=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    Catalog.products = Array.isArray(data.products) ? data.products : [];
  } catch (err) {
    // Fallback bila API tak tersedia (mis. dibuka tanpa server)
    Catalog.products = PRODUCTS.map(p => ({
      id: p.id, nama: p.name, deskripsi: p.desc,
      jenis_barang: p.cat, harga: p.price, gambar: '', _static: true,
    }));
    toast('Tidak dapat terhubung ke server — menampilkan katalog bawaan');
  }
  Catalog.loading = false;
  renderCatalog();
}

/* ---------- Render ---------- */
function jenisList() {
  const set = [];
  Catalog.products.forEach(p => {
    const j = (p.jenis_barang || '').trim();
    if (j && !set.includes(j)) set.push(j);
  });
  return set.sort((a, b) => a.localeCompare(b, 'id'));
}

function filteredProducts() {
  const q = Catalog.search.trim().toLowerCase();
  return Catalog.products.filter(p => {
    const okJenis = Catalog.jenis === 'Semua' || p.jenis_barang === Catalog.jenis;
    const okSearch = !q || String(p.nama || '').toLowerCase().includes(q);
    return okJenis && okSearch;
  });
}

function renderFilterChips() {
  const row = document.getElementById('filterRow');
  const cats = ['Semua', ...jenisList()];
  row.innerHTML = cats.map(c =>
    `<button class="chip ${c === Catalog.jenis ? 'active' : ''}" data-cat="${escapeAttr(c)}">${escapeHtml(c)}</button>`
  ).join('');
}

function emptyStateHTML() {
  const filtered = Catalog.search || Catalog.jenis !== 'Semua';
  return `<div class="emptybox">
    <div class="emoji">🛍️</div>
    <h3>${filtered ? 'Tidak ada yang cocok' : 'Katalog masih kosong'}</h3>
    <p>${filtered
      ? 'Coba kata kunci lain atau pilih filter jenis barang yang berbeda.'
      : 'Belum ada produk tersimpan di database. Aktifkan Mode Kelola lalu klik "+ Tambah Produk" untuk menambahkan produk pertamamu.'}</p>
  </div>`;
}

function renderCatalog() {
  const grid = document.getElementById('productGrid');
  const countEl = document.getElementById('countInfo');
  if (!grid) return;

  renderFilterChips();
  const list = filteredProducts();
  if (countEl) {
    countEl.textContent = Catalog.loading
      ? 'Memuat katalog…'
      : `${list.length} dari ${Catalog.products.length} produk`;
  }

  if (Catalog.loading) {
    grid.innerHTML = `<div class="emptybox"><div class="emoji">⏳</div><h3>Memuat katalog dari database…</h3></div>`;
    return;
  }
  grid.innerHTML = list.length
    ? list.map(p => dbProductCard(p, Catalog.admin && !p._static)).join('')
    : emptyStateHTML();
}

/* ---------- Modal form ---------- */
function openForm(product) {
  Catalog.editingId = product ? product.id : null;
  Catalog.pendingFile = null;
  Catalog.removedExistingImage = false;

  const f = document.getElementById('productForm');
  f.reset();
  clearFormErrors();

  document.getElementById('formTitle').textContent = product ? 'Edit Produk' : 'Tambah Produk';
  document.getElementById('btnSaveText').textContent = product ? 'Simpan Perubahan' : 'Simpan Produk';
  document.getElementById('fNama').value = product ? product.nama : '';
  document.getElementById('fDeskripsi').value = product ? (product.deskripsi || '') : '';
  document.getElementById('fJenis').value = product ? product.jenis_barang : '';
  document.getElementById('fHarga').value = product ? product.harga : '';
  document.getElementById('fFile').value = '';

  // Datalist jenis dari data yang ada
  document.getElementById('jenisOptions').innerHTML =
    jenisList().map(j => `<option value="${escapeAttr(j)}">`).join('');

  renderPreview(product && product.gambar ? product.gambar : null);
  document.getElementById('modalBackdrop').classList.add('show');
  setTimeout(() => document.getElementById('fNama').focus(), 60);
}

function closeForm() {
  document.getElementById('modalBackdrop').classList.remove('show');
  Catalog.editingId = null;
  Catalog.pendingFile = null;
}

function clearFormErrors() {
  document.getElementById('formErr').classList.remove('show');
  document.querySelectorAll('#productForm .field').forEach(el => el.classList.remove('invalid'));
}

function fieldError(id, msg) {
  const input = document.getElementById(id);
  const field = input.closest('.field');
  if (field) {
    field.classList.add('invalid');
    const err = field.querySelector('.ferr');
    if (err) err.textContent = msg;
  }
}

function renderPreview(src) {
  const box = document.getElementById('imgPreview');
  if (src) {
    box.innerHTML = `<img src="${escapeAttr(src)}" alt="Preview gambar produk">
      ${Catalog.editingId ? '<div class="ph" style="padding:6px">Gambar saat ini — pilih file baru untuk mengganti</div>' : ''}`;
  } else {
    box.innerHTML = `<div class="ph">Preview gambar akan tampil di sini<br><small>Belum ada gambar — kartu memakai ilustrasi template</small></div>`;
  }
}

/* Validasi frontend form. Return true bila lolos. */
function validateForm() {
  clearFormErrors();
  const nama = document.getElementById('fNama').value.trim();
  const jenis = document.getElementById('fJenis').value.trim();
  const hargaRaw = document.getElementById('fHarga').value.trim();
  const deskripsi = document.getElementById('fDeskripsi').value.trim();
  let ok = true;
  const msgs = [];

  if (!nama) { fieldError('fNama', 'Nama produk wajib diisi'); msgs.push('Nama produk wajib diisi'); ok = false; }
  else if (nama.length > 120) { fieldError('fNama', 'Maksimal 120 karakter'); msgs.push('Nama produk maksimal 120 karakter'); ok = false; }

  if (!jenis) { fieldError('fJenis', 'Jenis barang wajib diisi'); msgs.push('Jenis barang wajib diisi'); ok = false; }
  else if (jenis.length > 60) { fieldError('fJenis', 'Maksimal 60 karakter'); msgs.push('Jenis barang maksimal 60 karakter'); ok = false; }

  const harga = Number(hargaRaw);
  if (!hargaRaw || !Number.isFinite(harga)) { fieldError('fHarga', 'Harga harus angka'); msgs.push('Harga harus berupa angka'); ok = false; }
  else if (!Number.isInteger(harga)) { fieldError('fHarga', 'Harga harus bilangan bulat'); msgs.push('Harga harus bilangan bulat (rupiah)'); ok = false; }
  else if (harga < 0) { fieldError('fHarga', 'Harga tidak boleh negatif'); msgs.push('Harga tidak boleh negatif'); ok = false; }
  else if (harga > 100000000) { fieldError('fHarga', 'Harga maksimal Rp 100.000.000'); msgs.push('Harga terlalu besar'); ok = false; }

  if (deskripsi.length > 2000) { fieldError('fDeskripsi', 'Maksimal 2000 karakter'); msgs.push('Deskripsi maksimal 2000 karakter'); ok = false; }

  if (Catalog.pendingFile) {
    const name = Catalog.pendingFile.name.toLowerCase();
    const typeOk = ['image/jpeg', 'image/png'].includes(Catalog.pendingFile.type);
    const extOk = /\.(jpg|jpeg|png)$/.test(name);
    if (!typeOk || !extOk) { fieldError('fFile', 'Format harus .jpg, .jpeg, atau .png'); msgs.push('Format gambar harus .jpg, .jpeg, atau .png'); ok = false; }
    else if (Catalog.pendingFile.size > 5 * 1024 * 1024) { fieldError('fFile', 'Ukuran maksimal 5 MB'); msgs.push('Ukuran gambar maksimal 5 MB'); ok = false; }
  }

  if (!ok) {
    const box = document.getElementById('formErr');
    box.textContent = msgs[0];
    box.classList.add('show');
  }
  return ok;
}

/* ---------- Simpan (create/update) ---------- */
async function submitForm(e) {
  e.preventDefault();
  if (!validateForm()) return;

  const btn = document.getElementById('btnSave');
  btn.disabled = true;
  document.getElementById('btnSaveText').textContent = 'Menyimpan…';

  try {
    const fd = new FormData();
    fd.append('nama', document.getElementById('fNama').value.trim());
    fd.append('deskripsi', document.getElementById('fDeskripsi').value.trim());
    fd.append('jenis_barang', document.getElementById('fJenis').value.trim());
    fd.append('harga', document.getElementById('fHarga').value.trim());
    if (Catalog.pendingFile) fd.append('gambar', Catalog.pendingFile);

    const editing = Catalog.editingId != null;
    const res = await fetch(editing ? '/api/products/' + Catalog.editingId : '/api/products', {
      method: editing ? 'PUT' : 'POST',
      body: fd,
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const box = document.getElementById('formErr');
      box.textContent = data.error || 'Terjadi kesalahan saat menyimpan produk.';
      box.classList.add('show');
      return;
    }

    closeForm();
    await fetchProducts();
    toast(editing ? 'Perubahan produk tersimpan' : 'Produk baru berhasil ditambahkan');
  } catch (err) {
    const box = document.getElementById('formErr');
    box.textContent = 'Tidak dapat terhubung ke server. Periksa koneksi lalu coba lagi.';
    box.classList.add('show');
  } finally {
    btn.disabled = false;
    document.getElementById('btnSaveText').textContent =
      Catalog.editingId != null ? 'Simpan Perubahan' : 'Simpan Produk';
  }
}

/* ---------- Hapus ---------- */
async function deleteProduct(id) {
  const p = Catalog.products.find(x => x.id == id);
  const label = p ? `“${p.nama}”` : 'produk ini';
  if (!confirm(`Hapus ${label} dari katalog?\n\nTindakan ini juga akan menghapus gambar produknya dan tidak dapat dibatalkan.`)) return;
  try {
    const res = await fetch('/api/products/' + id, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast(data.error || 'Produk gagal dihapus');
      return;
    }
    await fetchProducts();
    toast('Produk dihapus dari katalog');
  } catch (err) {
    toast('Tidak dapat terhubung ke server');
  }
}

/* ---------- Binding UI ---------- */
function initCatalog() {
  document.getElementById('searchInput').addEventListener('input', function () {
    Catalog.search = this.value;
    renderCatalog();
  });

  document.getElementById('filterRow').addEventListener('click', function (e) {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    Catalog.jenis = chip.dataset.cat;
    renderCatalog();
  });

  document.getElementById('adminToggle').addEventListener('click', function () {
    Catalog.admin = !Catalog.admin;
    this.classList.toggle('active', Catalog.admin);
    document.getElementById('addBtn').hidden = !Catalog.admin;
    renderCatalog();
  });

  document.getElementById('addBtn').addEventListener('click', () => openForm(null));

  document.getElementById('productGrid').addEventListener('click', function (e) {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    if (btn.dataset.act === 'edit') {
      const p = Catalog.products.find(x => x.id == btn.dataset.id);
      if (p) openForm(p);
    } else if (btn.dataset.act === 'del') {
      deleteProduct(btn.dataset.id);
    }
  });

  document.getElementById('fFile').addEventListener('change', function () {
    const f = this.files[0];
    if (!f) return;
    Catalog.pendingFile = f;
    if (!['image/jpeg', 'image/png'].includes(f.type) || !/\.(jpg|jpeg|png)$/i.test(f.name)) {
      fieldError('fFile', 'Format harus .jpg, .jpeg, atau .png');
      document.getElementById('formErr').textContent = 'Format gambar harus .jpg, .jpeg, atau .png';
      document.getElementById('formErr').classList.add('show');
      Catalog.pendingFile = null;
      this.value = '';
      renderPreview(null);
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      fieldError('fFile', 'Ukuran maksimal 5 MB');
      document.getElementById('formErr').textContent = 'Ukuran gambar maksimal 5 MB';
      document.getElementById('formErr').classList.add('show');
      Catalog.pendingFile = null;
      this.value = '';
      renderPreview(null);
      return;
    }
    clearFormErrors();
    const reader = new FileReader();
    reader.onload = ev => renderPreview(ev.target.result);
    reader.readAsDataURL(f);
  });

  document.getElementById('productForm').addEventListener('submit', submitForm);
  document.getElementById('btnCancel').addEventListener('click', closeForm);
  document.getElementById('modalX').addEventListener('click', closeForm);
  document.getElementById('modalBackdrop').addEventListener('click', function (e) {
    if (e.target === this) closeForm();
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeForm();
  });

  fetchProducts();
}

document.addEventListener('DOMContentLoaded', initCatalog);
