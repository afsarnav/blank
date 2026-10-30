/* ============================================================
   BLANK. — emoji.js
   Pemilih emoji Unicode (mengikuti Windows Emoji per sistem).
   Enam kategori: Smiley & Hewan, Orang, Objek & Perayaan,
   Makanan & Tanaman, Transportasi & Tempat, Simbol.
   Format data: 'emoji|kata kunci (Indonesia + Inggris)'
   ============================================================ */

const EMOJI_FONT_STACK = "'Segoe UI Emoji','Segoe UI Symbol','Apple Color Emoji','Noto Color Emoji',sans-serif";

const EMOJI_CATS = [
  {
    id: 'smiley', name: 'Smiley & Hewan', icon: '😀',
    items: [
      '😀|senyum grin happy bahagia', '😁|senyum beam gigi grin', '😂|tawa air lol laugh', '🤣|tawa rolling rofl lucu',
      '😊|senyum blush malu manis', '😇|malaikat innocent angel halo', '🙂|senyum slight smile', '😉|kedip wink',
      '😍|mata hati love cinta', '🥰|hearts cinta sayang love', '😘|cium kiss manja', '😜|kedip lidah silly wink tongue',
      '🤪|gila zany konyol', '😝|lidah playful tongue', '🤗|peluk hug hangat', '🤔|berpikir think mikir',
      '🤨|alis raised skeptis', '😐|datar netral poker', '😎|kacamata cool sip', '🥳|pesta party ulang tahun',
      '😢|nangis menangis cry sedih', '😭|nangis hebat loud cry bawaan', '😡|marah rage angry', '🤯|meledak kepala mind blown',
      '😱|takut ketakutan scream', '😴|tidur sleeping zzz', '🤠|koboi cowboy topi', '🥺|memohon pleading minta',
      '😷|masker sakit mask', '🤡|badut clown sirkus', '👻|hantu ghost boo', '💀|tengkorak skull doom',
      '👽|alien ufo luar angkasa', '🤖|robot bot ai', '🐶|anjing dog puppy', '🐱|kucing cat meong',
      '🐭|tikus mouse', '🐹|hamster', '🐰|kelinci rabbit bunny', '🦊|rubah fox',
      '🐻|beruang bear', '🐼|panda', '🐨|koala', '🐯|harimau tiger',
      '🦁|singa lion', '🐮|sapi cow', '🐷|babi pig', '🐸|katak frog',
      '🐵|monyet monkey', '🐔|ayam chicken', '🐧|penguin', '🐦|burung bird',
      '🦆|bebek duck', '🦉|burung hantu owl', '🦄|unicorn', '🐝|lebah bee',
      '🦋|kupu-kupu butterfly', '🐢|kura-kura turtle', '🐍|ular snake', '🐙|gurita octopus',
      '🦕|dinosaurus dino', '🦖|trex dinosaurus', '🐳|paus whale', '🐬|lumba-lumba dolphin',
    ],
  },
  {
    id: 'people', name: 'Orang', icon: '👋',
    items: [
      '👋|lambaikan wave tangan halo', '🤚|tangan raised back hand', '✋|tangan stop high five', '🖖|vulcan star trek',
      '👌|ok bagus sempurna', '🤌|italian pinch chef', '✌️|peace v menang dua', '🤞|silang jari luck doa',
      '🤟|love you ily tangan', '🤘|rock metal horns', '🤙|call me shaka', '👈|kiri left point',
      '👉|kanan right point', '👆|atas up point', '👇|bawah down point', '☝️|indeks index satu',
      '👍|jempol thumbs up suka setuju', '👎|thumbs down jelek tidak', '✊|tinju fist power', '👊|pukul punch fist bump',
      '👏|tepuk tangan clap apresiasi', '🙌|angkat tangan hallelujah raise', '👐|tangan terbuka open', '🤲|telapak palma doa',
      '🤝|jabat tangan deal sepakat', '🙏|terima kasih thanks please tolong', '✍️|menulis write tangan', '💅|kuku manis nail',
      '🤳|selfie', '💪|kekuatan otot muscle kuat', '🦾|lengan mekanik prosthetic', '🧠|otak brain pintar',
      '👶|bayi baby', '🧒|anak child', '👦|bocah laki boy', '👧|bocah perempuan girl',
      '🧑|orang person', '👨|pria laki-laki man', '👩|wanita perempuan woman', '🧓|lansia tua grandparent',
      '👴|kakek old man', '👵|nenek old woman', '👮|polisi police', '🕵️|detektif spy',
      '💁|informasi concierge', '🤦|wajah tangan facepalm', '🙆|ok gesture woman', '🙅|tidak gesture no',
      '🤷|bahu shrug entah', '🙍|marah frown pouting', '💃|menari dance wanita', '🕺|menari dance pria',
      '🚶|jalan kaki walk', '🏃|lari run lari kencang', '🧘|yoga meditasi lotus', '🧎|berlutut kneel',
      '🤱|menyusui breastfeeding', '👫|pasangan couple hold hands',
    ],
  },
  {
    id: 'objects', name: 'Objek & Perayaan', icon: '🎉',
    items: [
      '🎉|pesta party konfeti merayakan', '🎊|konfeti celebration festival', '🎈|balon balloon ulang tahun', '🎁|hadiah gift kado present',
      '🎀|pita ribbon busur', '🪅|pinata pesta', '🪄|tongkat sihir magic wand', '🎂|kue ulang tahun birthday cake',
      '🍰|kue potong cake shortcake', '🧨|petasan firecracker dinamit', '🎆|kembang api fireworks tahun baru', '🎇|kembang api sparkler',
      '✨|kilau sparkle bintang shine', '💥|ledakan boom collision', '🎺|terompet trumpet jazz', '🥁|drum rebana band',
      '🎸|gitar rock musik', '🎧|headphone musik earphone', '🎤|mikrofon karaoke mic', '🎼|not musik score lagu',
      '🏆|trophy juara piala menang', '🥇|medali emas gold first', '🎯|target dart sasaran tepat', '🎮|game controller joystick',
      '🕹️|joystick arcade game', '🎲|dadu dice gamble', '🧩|puzzle teka-teki potongan', '💡|ide lampu bulb light',
      '📱|hp ponsel phone smartphone', '💻|laptop komputer pc coding', '📷|kamera camera foto', '🔋|baterai battery daya',
      '🔌|colokan plug listrik', '🔦|senter flashlight lampu', '🕯️|lilin candle terang', '🧸|boneka beruang teddy mainan',
      '🪩|disko bola mirror ball pesta', '👑|mahkota crown raja ratu', '🎒|tas ransel backpack sekolah', '⚽|bola sepak soccer football',
      '🏀|bola basket basketball', '🏈|football amerika', '⚾|baseball', '🎾|tenis tennis ball',
      '🏐|volley voli', '🏉|rugby', '🥏|frisbee ultimat', '🎱|biliar billiard pool 8',
      '🏓|pingpong tenis meja', '🏸|badminton bulu tangkis', '🪀|yoyo mainan', '🪁|layang-layang kite',
      '🥊|tinju boxing sarung', '🔔|lonceng bell bel',
    ],
  },
  {
    id: 'foods', name: 'Makanan & Tanaman', icon: '🍕',
    items: [
      '🍎|apel merah apple', '🍏|apel hijau green apple', '🍐|pir pear', '🍊|jeruk mandarin orange tangerine',
      '🍋|lemon sitrus', '🍌|pisang banana', '🍉|semangka watermelon', '🍇|anggur grapes',
      '🍓|stroberi strawberry', '🫐|blueberry beri', '🍒|ceri cherry', '🍑|persik peach',
      '🥭|mangga mango', '🍍|nanas pineapple', '🥥|kelapa coconut', '🥝|kiwi',
      '🍅|tomato tomat', '🥑|alpukat avocado', '🥦|brokoli sayur', '🥕|wortel carrot',
      '🌽|jagung corn', '🌶️|cabai chili pedas', '🥒|timun cucumber', '🥬|sayur hijau lettuce',
      '🧄|bawang putih garlic', '🧅|bawang onion', '🍄|jamur mushroom', '🥜|kacang peanut',
      '🍞|roti bread', '🥐|croissant roti croissant', '🥖|baguette roti panjang', '🧀|keju cheese',
      '🥚|telur egg', '🍳|telur dadar masak cooking', '🥞|pancake martabak', '🧇|waffle',
      '🥓|bacon daging asap', '🍔|burger hambuger cepat saji', '🍟|kentang goreng fries', '🍕|pizza',
      '🌭|hotdog sosis roti', '🥪|sandwich roti isi', '🌮|taco meksiko', '🍜|mie ramen kuah mi',
      '🍝|spaghetti pasta mi', '🍣|sushi jepang', '🍱|bekal bento kotak', '🍦|es krim cone ice cream',
      '🍩|donat donut', '🍪|kue kering biskuit cookie', '🍫|cokelat chocolate', '🍿|popcorn film',
      '☕|kopi coffee espresso', '🍵|teh matcha green', '🧋|boba bubble tea pearl', '🥤|soft drink gelas sedotan',
      '🌵|kaktus cactus gurun', '🌲|pinus evergreen pohon', '🌳|pohon tree rindang', '🌴|palem kelapa tropis',
      '🌱|kecambah bibit sprout', '🌿|ranting daun herb', '☘️|shamrock semanggi irlandia', '🍀|daun semanggi hoki lucky clover',
      '🍂|daun gugur autumn fall', '🍁|daun maple kanada', '🌷|tulip bunga', '🌹|mawar rose bunga cinta',
      '🌺|hibiscus bunga tropis', '🌸|sakura bunga cherry blossom', '🌼|bunga margasari daisy', '🌻|bunga matahari sunflower',
      '💐|buket bouquet bunga rangkaian',
    ],
  },
  {
    id: 'transport', name: 'Transportasi & Tempat', icon: '🚗',
    items: [
      '🚗|mobil car sedan', '🚕|taksi taksi kuning', '🚙|suv jeep mobil', '🚌|bus besar',
      '🚎|trolleybus bus listrik', '🏎️|balap racing mobil f1', '🚓|polisi mobil patrol', '🚑|ambulans rumah sakit',
      '🚒|pemadam kebakaran truck', '🚐|minibus van angkot', '🚚|truk pengiriman delivery', '🚛|truk kontainer besar',
      '🚜|traktur traktor tani', '🛵|vespa motor becak skuter', '🏍️|motor sepeda motor racing', '🚲|sepeda bicycle sepeda',
      '🛴|skuter kick scooter', '🚨|sirene lampu polisi darurat', '🚂|kereta lokomotif uap train', '🚃|gerbong kereta',
      '🚄|shinkansen cepat kereta', '🚅|kereta cepat bullet train', '🚝|monorel monorail', '✈️|pesawat airplane terbang flight',
      '🛫|lepas landas takeoff bandara', '🛬|mendarat landing datang', '🛩️|pesawat kecil aviator', '🚀|roket luar angkasa launch',
      '🛸|ufo flying saucer alien', '🚁|helikopter helicopter', '⛵|perahu layar sailing', '🚤|speedboat perahu cepat',
      '🛳️|kapal pesiar cruise', '🚢|kapal laut ship', '🏗️|konstruksi crane bangunan', '🏠|rumah home kosan',
      '🏡|rumah taman garden house', '🏢|gedung kantor office', '🏣|kantor pos pos indonesia', '🏥|rumah sakit hospital klinik',
      '🏦|bank gedung keuangan', '🏨|hotel menginap', '🏫|sekolah school', '🏭|pabrik factory industri',
      '🏰|kastil istana kota castle', '🕌|masjid muslim mosque', '🗼|menara tokyo landmark', '🗽|patung liberty amerika',
      '⛪|gereja kristen church', '🏔️|gunung bersalju mountain', '🌋|gunung berapi vulkano', '🏝️|pulau pantai tropis island',
      '🗺️|peta dunia map travel', '🧭|kompas arah navigasi',
    ],
  },
  {
    id: 'symbols', name: 'Simbol', icon: '❤️',
    items: [
      '❤️|hati merah love cinta red heart', '🧡|hati oranye love', '💛|hati kuning love', '💚|hati hijau love',
      '💙|hati biru love', '💜|hati ungu love', '🖤|hati hitam black', '🤍|hati putih white',
      '🤎|hati cokelat brown', '💔|hati patah broken sedih putus', '❣️|hati seru tanda', '💕|dua hati love couple',
      '💞|hati berputar revolve', '💓|hati berdetak beating', '💗|hati tumbuh growing', '💖|hati berkilau sparkling',
      '💘|hati panah cupid valentine', '💝|hati pita hadiah', '💯|seratus hundred skor sempurna', '💢|marah anger',
      '💥|ledakan boom benturan', '💫|pusing bintang dizzy star', '💦|keringat tetes air splash', '💨|angin gas cepat dash',
      '🕳️|lubang hole', '💣|bom bomb meledak', '💬|bicara chat speech bubble komentar', '💭|pikiran thought balloon',
      '🔥|api hot populer lit fire', '⭐|bintang star', '🌟|bintang bersinar glowing star', '✨|kilauan sparkle berkilau',
      '⚡|petir listrik lightning cepat volt', '☄️|komet comet', '🧿|mata nazar biru amulet', '✅|centang benar check selesai',
      '❌|silang salah cross gagal', '❗|seru penting perhatian', '❓|tanya pertanyaan question', '💤|zzz tidur mimpi',
      '♻️|recycle daur ulang lingkungan', '🔞|18 plus dewasa larangan', '⚠️|peringatan warning hati-hati', '🚫|larangan dilarang no',
      '⛔|dilarang masuk stop', '✳️|asterisk bintang delapan', '✴️|bintang delapan eight', '💠|polt diamond kancing',
      '🔸|belah ketupat oranye kecil', '🔹|belah ketupat biru kecil', '🔺|segitiga naik merah', '🔻|segitiga turun merah',
      '🔱|trisula trident', '♠️|sekop spade kartu', '♥️|hati kartu hearts', '♦️|wajik diamond kartu',
      '♣️|keriting clubs kartu', '🔔|lonceng bell bel dering', '🔕|lonceng dicoret senyap mute', '🎵|not musik nada lagu',
      '🎶|not musik melodi lagu', '✖️|kali kali times x', '➕|tambah plus', '➖|kurang minus',
      '➗|bagi divided', '♾️|tak terhingga infinity selamanya', '💲|dollar uang harga',
    ],
  },
];

/* ---------------- Komponen picker ----------------
   initEmojiPicker({ mount, onPick })
   - Tab kategori + grid + pencarian + indikator terpilih
   - onPick(char) dipanggil saat emoji dipilih
-------------------------------------------------- */
function initEmojiPicker(opts) {
  const root = document.querySelector(opts.mount);
  if (!root) return;
  const onPick = opts.onPick || function () {};

  const tabsEl = root.querySelector('#emojiTabs');
  const gridEl = root.querySelector('#emojiGrid');
  const searchEl = root.querySelector('#emojiSearch');
  const infoEl = root.querySelector('#emojiPickedInfo');
  if (!tabsEl || !gridEl) return;

  let activeCat = EMOJI_CATS[0].id;

  function cellHTML(pair, catId) {
    const ch = pair.split('|')[0];
    const kw = pair.split('|')[1] || '';
    return `<button type="button" class="emcell" data-emoji="${ch}" data-kw="${kw.toLowerCase()}" data-cat="${catId}" title="${kw.split(' ')[0] || ch}">${ch}</button>`;
  }

  function renderTabs() {
    tabsEl.innerHTML = EMOJI_CATS.map(c =>
      `<button type="button" class="emtab ${c.id === activeCat ? 'active' : ''}" data-cat="${c.id}" title="${c.name}">${c.icon}</button>`
    ).join('');
  }

  function renderGrid(q) {
    const query = (q || '').trim().toLowerCase();
    let html = '';
    if (query) {
      let found = 0;
      EMOJI_CATS.forEach(c => {
        c.items.forEach(pair => {
          const kw = (pair.split('|')[1] || '').toLowerCase();
          if (kw.includes(query) && found < 90) { html += cellHTML(pair, c.id); found++; }
        });
      });
      if (!found) html = `<div class="emempty">Tidak ada emoji untuk “${query}”. Coba kata lain, mis. <i>senyum, kucing, pizza, roket, hati</i>.</div>`;
    } else {
      const cat = EMOJI_CATS.find(c => c.id === activeCat) || EMOJI_CATS[0];
      html = cat.items.map(pair => cellHTML(pair, cat.id)).join('');
    }
    gridEl.innerHTML = html;
    gridEl.scrollTop = 0;
  }

  tabsEl.addEventListener('click', e => {
    const b = e.target.closest('.emtab');
    if (!b) return;
    activeCat = b.dataset.cat;
    searchEl.value = '';
    renderTabs();
    renderGrid('');
  });

  gridEl.addEventListener('click', e => {
    const b = e.target.closest('.emcell');
    if (!b) return;
    gridEl.querySelectorAll('.emcell.picked').forEach(x => x.classList.remove('picked'));
    b.classList.add('picked');
    if (infoEl) {
      infoEl.hidden = false;
      infoEl.innerHTML = `<span class="emprev">${b.dataset.emoji}</span> Emoji terpilih — klik lagi untuk menambah lainnya`;
    }
    onPick(b.dataset.emoji);
  });

  let searchTimer = null;
  searchEl.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => renderGrid(searchEl.value), 120);
  });

  renderTabs();
  renderGrid('');
}
