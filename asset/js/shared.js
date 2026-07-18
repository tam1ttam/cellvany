// CELLVANY Shared JavaScript
// Handles: cart, wishlist, search, auth, header/footer, product rendering

const CELLVANY = (() => {
  const DATA_URL = '/asset/data/data.json';
  const VLOG_URL = '/asset/data/vlog.json';
  const WISHLIST_URL = '/asset/data/wishlist.json';
  const LS_CART = 'cellvany_cart';
  const LS_WISHLIST = 'cellvany_wishlist';
  const LS_USER = 'cellvany_user';

  let products = [];
  let revealObserverInstance;
  let blogs = [];
  let currentUser = null;

  const SHARED_CSS = `
/* ===== CELLVANY shared product-card styles & micro-animations ===== */
.cv-card {
  font-size: 14px;
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
  transition: transform .3s, box-shadow .3s;
}
.cv-card:hover { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,.15); }
.cv-card .product-image {
  position: relative;
  flex-shrink: 0;
  height: 250px;
  background: linear-gradient(135deg, #d5f4e6 0%, #a9dfbf 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  cursor: pointer;
  overflow: hidden;
}
.cv-card .product-label {
  position: absolute !important;
  top: 10px;
  left: 10px;
  max-width: calc(100% - 20px);
  background: #333 !important;
  color: #fff !important;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px !important;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cv-card .product-info { display: flex !important; flex-direction: column !important; flex: 1 1 auto !important; padding: 15px; }
.cv-card .product-name {
  font-size: 15px; font-weight: 600; color: #333; text-align: justify; margin-bottom: 8px; cursor: pointer;
  display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; min-height: 40px;
}
.cv-card .product-đánh-giá { color: #ffc107; font-size: 13px; margin-bottom: 8px; }
.cv-card .product-giá { display: flex; gap: 10px; align-items: center; margin-bottom: 10px; }
.cv-card .giá-current { font-size: 16px; font-weight: bold; color: #333; }
.cv-card .product-actions { display: flex !important; gap: 8px; margin-top: auto !important; }
.cv-card .product-actions button:first-child {
  flex: 1; padding: 8px; background: #333 !important; color: #fff !important; border: none; border-radius: 5px;
  cursor: pointer; font-weight: 600; font-size: 13px; transition: background .25s, transform .15s;
}
.cv-card .product-actions button:first-child:hover { background: #27ae60 !important; }
.cv-card .wishlist-btn {
  width: 38px; flex: none !important; padding: 8px; background: #fff; color: #333; border: 1px solid #ddd;
  border-radius: 5px; cursor: pointer; font-size: 14px; transition: all .25s;
}
.cv-card .wishlist-btn.active { background: #e74c3c !important; color: #fff !important; border-color: #e74c3c !important; }

@keyframes cvPop         { 0%{transform:scale(1)} 35%{transform:scale(1.35)} 60%{transform:scale(.9)} 100%{transform:scale(1)} }
@keyframes cvAddedRing   { 0%{box-shadow:0 0 0 0 rgba(39,174,96,.55)} 100%{box-shadow:0 0 0 14px rgba(39,174,96,0)} }
@keyframes cvBadgeBump   { 0%{transform:scale(1)} 30%{transform:scale(1.6)} 60%{transform:scale(.85)} 100%{transform:scale(1)} }
@keyframes cvFadeOutCard { to { opacity:0; transform:scale(.85); } }
.cv-anim-added { animation: cvAddedRing .55s ease-out; }
.cv-pop        { animation: cvPop .4s ease; }
.cv-bump       { animation: cvBadgeBump .4s ease; display:inline-block; }
.cv-removing   { animation: cvFadeOutCard .3s ease forwards; }

/* ===== HEADER RESPONSIVE ===== */
#cellvany-header {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 12px 0;
  box-shadow: 0 1px 0 rgba(0,0,0,.07), 0 4px 20px rgba(0,0,0,.06);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: box-shadow .3s;
}
#cellvany-header .header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}
#cellvany-header .logo {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; line-height: 1; cursor: pointer;
  transition: opacity .2s;
}
#cellvany-header .logo:hover { opacity: .8; }
#cellvany-header .logo img { height: 48px; width: auto; object-fit: contain; display: block; margin-bottom: -3px; }
#cellvany-header .logo-text { font-size: 13px; font-weight: 700; color: #27ae60; letter-spacing: .5px; }

/* Nav links */
#cellvany-header nav ul { list-style: none; display: flex; gap: 4px; margin: 0; padding: 0; }
#cellvany-header nav a {
  text-decoration: none; color: #444; font-size: 14px; font-weight: 500;
  padding: 6px 12px; border-radius: 8px;
  transition: color .2s, background .2s;
  position: relative;
}
#cellvany-header nav a::after {
  content: '';
  position: absolute;
  bottom: 2px; left: 12px; right: 12px;
  height: 2px; background: #27ae60; border-radius: 1px;
  transform: scaleX(0); transform-origin: center;
  transition: transform .25s ease;
}
#cellvany-header nav a:hover { color: #27ae60; background: rgba(39,174,96,.06); }
#cellvany-header nav a:hover::after { transform: scaleX(1); }

/* Icon group */
#cellvany-header .header-icons { display: flex; gap: 4px; align-items: center; }

/* Icon buttons — clean pill style */
#cellvany-header .cv-icon-btn {
  background: none; border: none; cursor: pointer;
  width: 38px; height: 38px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; color: #444;
  transition: background .2s, transform .15s;
  position: relative;
}
#cellvany-header .cv-icon-btn:hover { background: rgba(39,174,96,.08); transform: translateY(-1px); }
#cellvany-header .cv-icon-btn:active { transform: scale(.92); }

/* Badge trên icon */
#cellvany-header .cv-icon-btn .cv-badge {
  position: absolute; top: 3px; right: 3px;
  background: #e74c3c; color: #fff;
  font-size: 9px; font-weight: 700;
  min-width: 16px; height: 16px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  padding: 0 3px; line-height: 1;
  border: 1.5px solid #fff;
}

/* Nút Đăng Nhập */
#cellvany-header .cv-login-btn {
  font-size: 13px; font-weight: 600; color: #27ae60;
  background: transparent; border: 1.5px solid #27ae60;
  padding: 6px 16px; border-radius: 20px; cursor: pointer;
  white-space: nowrap;
  transition: background .2s, color .2s, transform .15s, box-shadow .2s;
}
#cellvany-header .cv-login-btn:hover {
  background: #27ae60; color: #fff;
  box-shadow: 0 4px 12px rgba(39,174,96,.3);
  transform: translateY(-1px);
}

/* Nút Mua Ngay — gradient đẹp hơn */
#cellvany-header .buy-now-btn {
  background: linear-gradient(135deg, #27ae60 0%, #1e8449 100%);
  color: white; padding: 8px 20px;
  border: none; border-radius: 20px; cursor: pointer;
  font-weight: 600; font-size: 13px; letter-spacing: .3px;
  box-shadow: 0 2px 8px rgba(39,174,96,.3);
  transition: transform .2s, box-shadow .2s, filter .2s;
  white-space: nowrap;
}
#cellvany-header .buy-now-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(39,174,96,.4);
  filter: brightness(1.05);
}
#cellvany-header .buy-now-btn:active { transform: scale(.96); }

/* Hamburger */
#cv-hamburger {
  display: none; flex-direction: column; justify-content: center;
  gap: 5px; background: none; border: none; cursor: pointer; padding: 6px;
  border-radius: 8px; transition: background .2s;
}
#cv-hamburger:hover { background: rgba(39,174,96,.08); }
#cv-hamburger span {
  display: block; width: 22px; height: 2px;
  background: #333; border-radius: 2px; transition: all .3s;
}
#cv-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
#cv-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
#cv-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile drawer */
#cv-mobile-nav {
  display: none; flex-direction: column;
  background: rgba(255,255,255,.97);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0,0,0,.06);
  max-height: 0; overflow: hidden;
  transition: max-height .35s cubic-bezier(.4,0,.2,1);
}
#cv-mobile-nav.open { max-height: 540px; }
#cv-mobile-nav a {
  display: block; padding: 13px 24px;
  color: #333; text-decoration: none; font-size: 15px; font-weight: 500;
  border-bottom: 1px solid rgba(0,0,0,.04);
  transition: color .2s, background .2s, padding-left .2s;
}
#cv-mobile-nav a:hover { color: #27ae60; background: rgba(39,174,96,.04); padding-left: 30px; }
#cv-mobile-nav .mobile-icons {
  display: flex; align-items: center; gap: 8px;
  padding: 14px 24px 20px; flex-wrap: wrap;
}
#cv-mobile-nav .mobile-icons button {
  background: none; border: none; cursor: pointer; font-size: 22px;
  position: relative; color: #333; width: 40px; height: 40px;
  border-radius: 10px; display: flex; align-items: center; justify-content: center;
  transition: background .2s;
}
#cv-mobile-nav .mobile-icons button:hover { background: rgba(39,174,96,.08); }
#cv-mobile-nav .mobile-icons .cv-login-btn {
  font-size: 13px; font-weight: 600; color: #27ae60;
  background: transparent; border: 1.5px solid #27ae60;
  padding: 6px 14px; border-radius: 20px; cursor: pointer; width: auto; height: auto;
}
#cv-mobile-nav .mobile-icons .buy-now-btn {
  background: linear-gradient(135deg, #27ae60 0%, #1e8449 100%);
  color: white; padding: 8px 16px; border: none; border-radius: 20px;
  cursor: pointer; font-weight: 600; font-size: 13px; margin-left: auto;
  width: auto; height: auto;
  box-shadow: 0 2px 8px rgba(39,174,96,.3);
}
@media (max-width: 900px) {
  #cellvany-header nav,
  #cellvany-header .header-icons { display: none !important; }
  #cv-hamburger { display: flex !important; }
  #cv-mobile-nav { display: flex !important; }
}
@media (max-width: 480px) {
  #cellvany-header .header-container { padding: 0 14px; }
  #cellvany-header .logo img { height: 40px; }
}

/* ===== BREADCRUMB / PAGE BANNER - floating elements ===== */
@keyframes cvFloat1 { 0%,100%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(6px,-10px) rotate(8deg)} 66%{transform:translate(-4px,6px) rotate(-5deg)} }
@keyframes cvFloat2 { 0%,100%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(-8px,8px) rotate(-10deg)} 66%{transform:translate(5px,-5px) rotate(6deg)} }
@keyframes cvFloat3 { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(4px,-12px) rotate(12deg)} }
@keyframes cvFloat4 { 0%,100%{transform:translate(0,0) rotate(0deg)} 40%{transform:translate(-6px,8px) rotate(-8deg)} 80%{transform:translate(8px,-4px) rotate(5deg)} }
@keyframes cvFloat5 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-5px,-8px) scale(1.08)} }
@keyframes cvBcFadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

.breadcrumb {
  position: relative;
  padding: 70px 20px 65px;
  text-align: center;
  overflow: hidden;
  background: linear-gradient(135deg, #d5f4e6 0%, #b8ecd0 50%, #a9dfbf 100%);
}

/* Chữ CELLVANY lớn ở giữa */
.breadcrumb::before {
  content: 'CELLVANY';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(70px, 14vw, 160px);
  font-weight: 900;
  color: rgba(39,174,96, 0.08);
  letter-spacing: 0.06em;
  pointer-events: none;
  white-space: nowrap;
  z-index: 0;
  line-height: 1;
}

/* Các icon bay xung quanh — inject bằng JS */
.cv-bc-icon {
  display: none !important;
}
.cv-bc-icon:nth-child(1)  { animation: cvFloat1 5.5s ease-in-out infinite; }
.cv-bc-icon:nth-child(2)  { animation: cvFloat2 6.2s ease-in-out infinite; animation-delay:-.8s; }
.cv-bc-icon:nth-child(3)  { animation: cvFloat3 4.8s ease-in-out infinite; animation-delay:-1.5s; }
.cv-bc-icon:nth-child(4)  { animation: cvFloat4 7.0s ease-in-out infinite; animation-delay:-.4s; }
.cv-bc-icon:nth-child(5)  { animation: cvFloat5 5.2s ease-in-out infinite; animation-delay:-2s; }
.cv-bc-icon:nth-child(6)  { animation: cvFloat1 6.5s ease-in-out infinite; animation-delay:-1s; }
.cv-bc-icon:nth-child(7)  { animation: cvFloat2 5.8s ease-in-out infinite; animation-delay:-2.5s; }
.cv-bc-icon:nth-child(8)  { animation: cvFloat3 6.8s ease-in-out infinite; animation-delay:-.6s; }
.cv-bc-icon:nth-child(9)  { animation: cvFloat4 5.0s ease-in-out infinite; animation-delay:-1.8s; }
.cv-bc-icon:nth-child(10) { animation: cvFloat5 7.2s ease-in-out infinite; animation-delay:-3s; }

/* Nội dung chữ tiêu đề nằm trên */
.breadcrumb > *:not(.cv-bc-icon) {
  position: relative;
  z-index: 1;
  animation: cvBcFadeIn .6s ease both;
}
.breadcrumb-nav { animation-delay: .15s !important; }
.breadcrumb h1 { font-size: 40px; margin-bottom: 15px; color: #1a1a1a; }
.breadcrumb-nav { color: #555; font-size: 18px; font-weight: 500; }
.breadcrumb-nav a { color: #27ae60; text-decoration: none; }

/* ===== WISHLIST / CART BUTTONS - SVG icons + animations ===== */
.cv-card .wishlist-btn {
  width: 38px; flex: none !important;
  padding: 0; background: #fff; border: 1px solid #ddd;
  border-radius: 5px; cursor: pointer; font-size: 14px;
  transition: all .25s;
  display: flex; align-items: center; justify-content: center;
}
.cv-card .wishlist-btn svg { width:18px; height:18px; transition: transform .3s, fill .3s; }
.cv-card .wishlist-btn:not(.active) svg { fill: none; stroke: #555; stroke-width: 2; }
.cv-card .wishlist-btn.active { background:#e74c3c !important; border-color:#e74c3c !important; }
.cv-card .wishlist-btn.active svg { fill: #fff; stroke: #fff; }

@keyframes heartPop {
  0%   { transform: scale(1); }
  30%  { transform: scale(1.5); }
  60%  { transform: scale(.85); }
  80%  { transform: scale(1.15); }
  100% { transform: scale(1); }
}
@keyframes cartBounce {
  0%   { transform: translateY(0); }
  30%  { transform: translateY(-6px); }
  60%  { transform: translateY(2px); }
  80%  { transform: translateY(-3px); }
  100% { transform: translateY(0); }
}
@keyframes ripple {
  0%   { box-shadow: 0 0 0 0 rgba(231,76,60,.4); }
  100% { box-shadow: 0 0 0 12px rgba(231,76,60,0); }
}
@keyframes cartRipple {
  0%   { box-shadow: 0 0 0 0 rgba(39,174,96,.4); }
  100% { box-shadow: 0 0 0 12px rgba(39,174,96,0); }
}
.cv-heart-pop svg  { animation: heartPop .5s cubic-bezier(.36,.07,.19,.97); }
.cv-heart-pop      { animation: ripple .5s ease-out; }
.cv-cart-bounce    { animation: cartBounce .4s ease; cartRipple .5s ease-out; }

/* Header badge pulse */
@keyframes badgePulse {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.7); }
  70%  { transform: scale(.8); }
  100% { transform: scale(1); }
}
.cv-badge-pulse { animation: badgePulse .45s cubic-bezier(.36,.07,.19,.97); }

/* ===== CATEGORY CARDS - spotlight hover effect ===== */
.category-grid:hover .category-card {
  opacity: 0.35;
  filter: blur(1px);
  transform: scale(0.97);
}
.category-grid:hover .category-card:hover {
  opacity: 1 !important;
  filter: blur(0) !important;
  transform: scale(1.04) !important;
  box-shadow: 0 12px 40px rgba(39,174,96,.25);
  z-index: 2;
}
.category-card {
  transition: opacity .35s ease, filter .35s ease, transform .35s ease, box-shadow .35s ease;
  position: relative;
  overflow: hidden;
}
/* Background image overlay */
.category-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity .4s ease;
}
.category-card:hover::before { opacity: 0.18; }
.category-card.cat-pregnant::before  { background-image: url('asset/img/san_pham_cho_me_mang_bau.jpeg'); }
.category-card.cat-postpartum::before { background-image: url('asset/img/San_pham_cho_me_bim_sua.jpeg'); }
.category-card.cat-skincare::before  { background-image: url('asset/img/serum_cap_am_duong_sang_mo_tham.jpeg'); }

/* ===== ABOUT - ve-chung-toi-section animation ===== */
@keyframes fadeSlideLeft {
  from { opacity:0; transform: translateX(-40px); }
  to   { opacity:1; transform: translateX(0); }
}
@keyframes fadeSlideRight {
  from { opacity:0; transform: translateX(40px); }
  to   { opacity:1; transform: translateX(0); }
}
@keyframes fadeSlideUp {
  from { opacity:0; transform: translateY(30px); }
  to   { opacity:1; transform: translateY(0); }
}
.cv-anim-left  { animation: fadeSlideLeft  .7s ease both; }
.cv-anim-right { animation: fadeSlideRight .7s ease both; }
.cv-anim-up    { animation: fadeSlideUp    .6s ease both; }
.cv-anim-up-2  { animation: fadeSlideUp    .7s ease both; animation-delay:.15s; }
.cv-anim-up-3  { animation: fadeSlideUp    .8s ease both; animation-delay:.3s; }

/* ===== SCROLL REVEAL - chung cho mọi file ===== */
.cv-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .65s ease, transform .65s ease;
}
.cv-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.cv-reveal-left {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity .65s ease, transform .65s ease;
}
.cv-reveal-left.visible { opacity:1; transform:translateX(0); }
.cv-reveal-right {
  opacity: 0;
  transform: translateX(30px);
  transition: opacity .65s ease, transform .65s ease;
}
.cv-reveal-right.visible { opacity:1; transform:translateX(0); }
`;

  function injectStyles() {
    if (document.getElementById('cellvany-shared-styles')) return;
    const style = document.createElement('style');
    style.id = 'cellvany-shared-styles';
    style.textContent = SHARED_CSS;
    document.head.appendChild(style);
  }

  // ─── Storage helpers ───────────────────────────────────────────────
  function getCart() { try { return JSON.parse(localStorage.getItem(LS_CART)) || []; } catch { return []; } }
  function saveCart(cart) { localStorage.setItem(LS_CART, JSON.stringify(cart)); updateCartBadge(); }
  function getWishlist() { try { return JSON.parse(localStorage.getItem(LS_WISHLIST)) || []; } catch { return []; } }
  function saveWishlist(list) { localStorage.setItem(LS_WISHLIST, JSON.stringify(list)); updateWishlistBadge(); }
  function getUser() { try { return JSON.parse(localStorage.getItem(LS_USER)); } catch { return null; } }
  function saveUser(user) { localStorage.setItem(LS_USER, JSON.stringify(user)); currentUser = user; updateUserUI(); }

  // ─── Data loading ──────────────────────────────────────────────────
  async function loadData() {
    const [pRes, vRes] = await Promise.all([
      fetch(DATA_URL).then(r => r.json()).catch(() => ({ products: [], categories: [], stages: [] })),
      fetch(VLOG_URL).then(r => r.json()).catch(() => ({ blogs: [] }))
    ]);
    products = pRes.products || [];
    // Chuẩn hóa cách diễn đạt cũ trong dữ liệu blog trước khi hiển thị.
    blogs = (vRes.blogs || []).map(blog => {
      const normalized = JSON.stringify(blog)
        .replace(/ph\u1ee5c h\u1ed3i/gi, 'chăm sóc');
      return JSON.parse(normalized);
    });
    return { products, blogs, categories: pRes.categories || [], stages: pRes.stages || [] };
  }

  // ─── Cart operations ───────────────────────────────────────────────
  function addToCart(productId, qty = 1) {
    const cart = getCart();
    const existing = cart.find(i => i.productId === productId);
    if (existing) { existing.qty += qty; } else { cart.push({ productId, qty }); }
    saveCart(cart);
    return cart;
  }
  function removeFromCart(productId) { saveCart(getCart().filter(i => i.productId !== productId)); }
  function updateCartQty(productId, qty) {
    const cart = getCart();
    const item = cart.find(i => i.productId === productId);
    if (item) { item.qty = Math.max(1, qty); }
    saveCart(cart);
  }
  function cartTotal() { return getCart().reduce((s, i) => { const p = products.find(x => x.id === i.productId); return s + (p ? p.price * i.qty : 0); }, 0); }
  function cartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }

  // ─── Wishlist operations ───────────────────────────────────────────
  function toggleWishlist(productId) {
    const list = getWishlist();
    const idx = list.indexOf(productId);
    if (idx > -1) { list.splice(idx, 1); } else { list.push(productId); }
    saveWishlist(list);
    return list;
  }
  function isWishlisted(productId) { return getWishlist().includes(productId); }

  // ─── Animation helpers ──────────────────────────────────────────────
  function restartAnim(el, className) {
    if (!el) return;
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
  }
  function bumpBadge(type) {
    const sel = type === 'cart' ? '[data-cart-count]' : '[data-wishlist-count]';
    document.querySelectorAll(sel).forEach(el => restartAnim(el, 'cv-bump'));
  }

  function handleAddToCart(productId, btnEl, qty = 1) {
    addToCart(productId, qty);
    // Cart button bounce
    if (btnEl) {
      btnEl.classList.remove('cv-cart-bounce');
      void btnEl.offsetWidth;
      btnEl.classList.add('cv-cart-bounce');
      setTimeout(() => btnEl.classList.remove('cv-cart-bounce'), 500);
    }
    // Header cart badge pulse
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.classList.remove('cv-badge-pulse');
      void el.offsetWidth;
      el.classList.add('cv-badge-pulse');
      setTimeout(() => el.classList.remove('cv-badge-pulse'), 500);
    });
    bumpBadge('cart');
  }

  function handleWishlistClick(productId, btnEl) {
    const list = toggleWishlist(productId);
    const isIn = list.includes(productId);
    if (btnEl) {
      btnEl.classList.toggle('active', isIn);
      // Update SVG fill/stroke
      const svg = btnEl.querySelector('svg');
      if (svg) {
        svg.style.fill = isIn ? '#fff' : 'none';
        svg.style.stroke = isIn ? '#fff' : '#555';
      }
      // Heart pop animation
      btnEl.classList.remove('cv-heart-pop');
      void btnEl.offsetWidth;
      btnEl.classList.add('cv-heart-pop');
      setTimeout(() => btnEl.classList.remove('cv-heart-pop'), 600);
    }
    // Header wishlist badge pulse
    document.querySelectorAll('[data-wishlist-count]').forEach(el => {
      el.classList.remove('cv-badge-pulse');
      void el.offsetWidth;
      el.classList.add('cv-badge-pulse');
      setTimeout(() => el.classList.remove('cv-badge-pulse'), 500);
    });
    bumpBadge('wishlist');
    const grid = document.getElementById('wishlist-grid');
    const card = btnEl ? btnEl.closest('[data-product-id]') : null;
    if (grid && card && grid.contains(card) && !isIn) {
      setTimeout(() => {
        card.classList.add('cv-removing');
        setTimeout(() => {
          card.remove();
          if (!grid.querySelector('[data-product-id]')) {
            grid.innerHTML = '<div class="empty-wishlist"><div class="icon">💔</div><h2>Chưa Có Sản Phẩm Yêu Thích</h2><p>Hãy khám phá cửa hàng và thêm sản phẩm vào danh sách yêu thích!</p><a href="shop.html">Khám Phá Ngay</a></div>';
          }
        }, 280);
      }, 250);
    }
  }

  // ─── Search ────────────────────────────────────────────────────────
  function searchProducts(query) {
    const q = query.toLowerCase().trim();
    if (!q) return products;
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.ingredients.toLowerCase().includes(q)
    );
  }
  function filterProducts({ query = '', category = '', stage = '', sort = '' } = {}) {
    let result = searchProducts(query);
    if (category) result = result.filter(p => p.categoryEn === category || p.category === category);
    if (stage) result = result.filter(p => p.stageEn === stage || p.stage === stage);
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    if (sort === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    return result;
  }
  function paginate(items, page = 1, perPage = 9) {
    const total = Math.ceil(items.length / perPage);
    const start = (page - 1) * perPage;
    return { items: items.slice(start, start + perPage), page, total, totalItems: items.length };
  }

  // ─── Auth ──────────────────────────────────────────────────────────
  function loginWith(provider) {
    const mockUser = {
      name: provider === 'google' ? 'Người Dùng Google' : 'Người Dùng Facebook',
      email: provider === 'google' ? 'user@gmail.com' : 'user@facebook.com',
      avatar: provider === 'google'
        ? 'https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=fff'
        : 'https://ui-avatars.com/api/?name=Facebook+User&background=1877F2&color=fff',
      provider
    };
    saveUser(mockUser);
    return mockUser;
  }
  function logout() { localStorage.removeItem(LS_USER); currentUser = null; updateUserUI(); }

  // ─── UI Updaters ───────────────────────────────────────────────────
  function updateCartBadge() {
    document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = cartCount());
  }
  function updateWishlistBadge() {
    document.querySelectorAll('[data-wishlist-count]').forEach(el => el.textContent = getWishlist().length);
  }
  function updateUserUI() {
    document.querySelectorAll('[data-user-avatar]').forEach(img => {
      if (currentUser) { img.src = currentUser.avatar; img.alt = currentUser.name; img.style.display = ''; }
      else { img.style.display = 'none'; }
    });
    document.querySelectorAll('[data-user-name]').forEach(el => {
      el.textContent = currentUser ? currentUser.name : '';
    });
    document.querySelectorAll('[data-login-btn]').forEach(btn => {
      btn.style.display = currentUser ? 'none' : '';
    });
    document.querySelectorAll('[data-logout-btn]').forEach(btn => {
      btn.style.display = currentUser ? '' : 'none';
    });
  }
  function updateAllBadges() { updateCartBadge(); updateWishlistBadge(); updateUserUI(); }

  // ─── Shared header/footer injection ────────────────────────────────
  function injectHeader() {
    const existing = document.getElementById('cellvany-header');
    if (existing) return;
    const user = getUser();
    const header = document.createElement('header');
    header.id = 'cellvany-header';
    header.innerHTML = `
      <div class="header-container">
        <a class="logo" href="/index.html" aria-label="Cellvany - Trang chủ" style="text-decoration:none">
          <img src="/asset/logo.png" alt="CELLVANY Logo" onerror="this.style.display='none'">
          <span class="logo-text">CELLVANY</span>
        </a>
        <nav>
          <ul>
            <li><a href="/index.html">Trang Chủ</a></li>
            <li><a href="/about.html">Về Chúng Tôi</a></li>
            <li><a href="/shop.html">Cửa Hàng</a></li>
            <li><a href="/blog.html">Blog</a></li>
            <li><a href="/contact.html">Liên Hệ</a></li>
          </ul>
        </nav>
        <div class="header-icons">
          <!-- Search -->
          <button class="cv-icon-btn" onclick="CELLVANY.toggleSearch()" title="Tìm kiếm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <!-- User / Auth -->
          
          <!-- Wishlist -->
          <button class="cv-icon-btn" onclick="location.href='/wishlist.html'" title="Yêu thích">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span class="cv-badge" data-wishlist-count>0</span>
          </button>
          <!-- Cart -->
          <button class="cv-icon-btn" onclick="location.href='/cart.html'" title="Giỏ hàng">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span class="cv-badge" data-cart-count>0</span>
          </button>
          <button class="buy-now-btn" onclick="location.href='/shop.html'">Mua Ngay</button>
        </div>

        <!-- Hamburger (mobile only) -->
        <button id="cv-hamburger" onclick="CELLVANY.toggleMobileNav()" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>

      <!-- Mobile drawer -->
      <div id="cv-mobile-nav">
        <a href="/index.html">Trang Chủ</a>
        <a href="/about.html">Về Chúng Tôi</a>
        <a href="/shop.html">Cửa Hàng</a>
        <a href="/blog.html">Blog</a>
        <a href="/contact.html">Liên Hệ</a>
        <div class="mobile-icons">
          <button onclick="CELLVANY.toggleSearch()" title="Tìm kiếm" style="position:relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <button onclick="location.href='/wishlist.html'" style="position:relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span data-wishlist-count style="position:absolute;top:-4px;right:-4px;background:#e74c3c;color:#fff;font-size:9px;padding:1px 4px;border-radius:8px;border:1.5px solid #fff">0</span>
          </button>
          <button onclick="location.href='/cart.html'" style="position:relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span data-cart-count style="position:absolute;top:-4px;right:-4px;background:#e74c3c;color:#fff;font-size:9px;padding:1px 4px;border-radius:8px;border:1.5px solid #fff">0</span>
          </button>
          
          <button class="buy-now-btn" onclick="location.href='/shop.html'">Mua Ngay</button>
        </div>
      </div>

      <!-- Search bar -->
      <div id="cellvany-search-bar" style="display:none;background:#f5f5f5;padding:10px 20px;border-bottom:1px solid #ddd">
        <div style="max-width:1200px;margin:0 auto;display:flex;gap:10px">
          <input type="text" id="global-search" placeholder="Tìm kiếm sản phẩm..." style="flex:1;padding:8px 12px;border:1px solid #ddd;border-radius:5px">
          <button onclick="CELLVANY.toggleSearch()" style="padding:8px 12px;border:1px solid #ddd;background:#fff;border-radius:5px;cursor:pointer">✕</button>
          <button onclick="CELLVANY.doGlobalSearch()" style="padding:8px 16px;background:#27ae60;color:#fff;border:none;border-radius:5px;cursor:pointer;font-weight:600">Tìm</button>
        </div>
      </div>

      <!-- Auth modal -->
      
    `;
    document.body.prepend(header);
  }

  function injectFooter() {
    const existing = document.getElementById('cellvany-footer');
    if (existing) return;
    const footer = document.createElement('footer');
    footer.id = 'cellvany-footer';
    footer.innerHTML = `
      <div class="footer-content">
        <div class="footer-container" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:30px;max-width:1200px;margin:0 auto;text-align:left">
          <div>
            <h4 style="color:#fff;margin-bottom:15px;font-size:16px">CELLVANY</h4>
            <p style="color:#999;font-size:14px;line-height:1.8">Mỹ phẩm thuần chay, an toàn cho mẹ bỉm sữa và em bé. Thiên nhiên gìn giữ, tình yêu thương lan tỏa.</p>
          </div>
          <div>
            <h4 style="color:#fff;margin-bottom:15px;font-size:16px">Liên Hệ</h4>
            <p style="color:#999;font-size:14px;line-height:1.8">📍 TP. Hồ Chí Minh, Việt Nam<br>📧 info@cellvany.vn<br>💼 Thứ 2 - Thứ 6: 9:00 - 18:00</p>
          </div>
          <div>
            <h4 style="color:#fff;margin-bottom:15px;font-size:16px">Liên Kết</h4>
            <p style="color:#999;font-size:14px;line-height:1.8">
              <a href="/index.html" style="color:#27ae60;text-decoration:none">Trang Chủ</a><br>
              <a href="/about.html" style="color:#27ae60;text-decoration:none">Về Chúng Tôi</a><br>
              <a href="/shop.html" style="color:#27ae60;text-decoration:none">Cửa Hàng</a><br>
              <a href="/blog.html" style="color:#27ae60;text-decoration:none">Blog</a><br>
              <a href="/contact.html" style="color:#27ae60;text-decoration:none">Liên Hệ</a>
            </p>
          </div>
          <div>
            <h4 style="color:#fff;margin-bottom:15px;font-size:16px">Bản Đồ</h4>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.562384398457!2d106.680!3d10.762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ1JzEwLjAiTiAxMDbCsDMwJzAwLjAiRQ!5e0!3m2!1svi!2s!4v1700000000000"
              width="100%" height="200" style="border:0;border-radius:8px" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade" title="CELLVANY Location">
            </iframe>
          </div>
        </div>
        <div class="footer-bottom" style="text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #333;color:#999;font-size:13px">
          © 2024 CELLVANY. Bảo Lưu Mọi Quyền. | <a href="#" style="color:#27ae60">Điều Khoản Dịch Vụ</a> | <a href="#" style="color:#27ae60">Chính Sách Bảo Mật</a>
        </div>
      </div>
    `;
    document.body.appendChild(footer);
  }

  // ─── Product card HTML ─────────────────────────────────────────────
  // SVG icons
  const HEART_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
  const CART_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;

  function productCardHTML(p) {
    const inWish = isWishlisted(p.id);
    const stars = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
    return `
      <div class="product-card cv-card" data-product-id="${p.id}">
        <a class="product-image" href="${p.seoUrl || `/product.html?id=${p.id}`}" aria-label="Xem sản phẩm ${p.name}" style="text-decoration:none;color:inherit">
          <span class="product-label" ${p.badge ? `style="background:${p.badge === 'New' ? '#27ae60' : '#333'}"` : ''}>${p.badge || p.category}</span>
          ${p.image ? `<img src="${p.image.startsWith('/') ? p.image : '/' + p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span style="font-size:40px;display:none;position:absolute">🧴</span>` : '<span style="font-size:40px">🧴</span>'}
        </a>
        <div class="product-info">
          <a class="product-name" href="${p.seoUrl || `/product.html?id=${p.id}`}" style="display:block;text-decoration:none;color:inherit">${p.name}</a>
          <div class="product-đánh-giá">${stars} <span style="color:#999;font-size:11px">(${p.reviews})</span></div>
          <div class="product-giá">
            <span class="giá-current">${p.priceDisplay}</span>
          </div>
          <div class="product-actions">
            <button
              onclick="CELLVANY.handleAddToCart(${p.id}, this)"
              style="flex:1;padding:8px;background:#333;color:#fff;border:none;border-radius:5px;cursor:pointer;font-weight:600;font-size:13px;display:flex;align-items:center;justify-content:center;gap:6px;transition:background .25s">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;flex-shrink:0"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Thêm Vào Giỏ
            </button>
            <button class="wishlist-btn ${inWish ? 'active' : ''}" onclick="CELLVANY.handleWishlistClick(${p.id}, this)">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="${inWish ? 'fill:#fff;stroke:#fff' : 'fill:none;stroke:#555'};stroke-width:2;width:18px;height:18px;transition:all .3s"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // function renderProductGrid(containerSelector = '.product-grid', items = null) {
  //   const container = document.querySelector(containerSelector);
  //   if (!container) return;
  //   const data = items || products;
  //   container.innerHTML = data.map(p => {
  //     const html = productCardHTML(p);
  //     // Wrap mỗi card trong cv-reveal
  //     return html.replace('<div class="product-card cv-card"', '<div class="product-card cv-card cv-reveal"');
  //   }).join('');
  //   updateAllBadges();
  //   // Trigger scroll reveal cho cards mới render
  //   setTimeout(() => {
  //     if (typeof revealObserverInstance !== 'undefined') {
  //       document.querySelectorAll('.cv-reveal:not(.visible)').forEach(el => revealObserverInstance.observe(el));
  //     }
  //   }, 50);
  // }

  function renderProductGrid(containerSelector = '.product-grid', items = null) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const data = items || products;
    container.innerHTML = data.map(p => productCardHTML(p)).join('');
    updateAllBadges();
  }

  // ─── Search toggle & global search ─────────────────────────────────
  function toggleSearch() {
    const bar = document.getElementById('cellvany-search-bar');
    if (!bar) return;
    const visible = bar.style.display !== 'none';
    bar.style.display = visible ? 'none' : 'block';
    if (!visible) setTimeout(() => document.getElementById('global-search')?.focus(), 50);
  }
  function doGlobalSearch() {
    const q = document.getElementById('global-search')?.value || '';
    if (q) location.href = `/shop.html?search=${encodeURIComponent(q)}`;
  }

  function toggleMobileNav() {
    const nav = document.getElementById('cv-mobile-nav');
    const btn = document.getElementById('cv-hamburger');
    if (!nav) return;
    nav.classList.toggle('open');
    btn.classList.toggle('open');
  }

  function showAuthModal() {
    document.getElementById('cellvany-auth-modal').style.display = 'flex';
  }

  // ─── Initialize ────────────────────────────────────────────────────
  async function init() {
    injectStyles();
    injectHeader();
    injectFooter();
    await loadData();
    currentUser = getUser();
    updateAllBadges();

    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' && document.activeElement?.id === 'global-search') doGlobalSearch();
    });



    // Xóa các icon trang trí còn sót lại nếu trang được mở từ bản cache cũ.
    document.querySelectorAll('.cv-bc-icon').forEach(el => el.remove());

    // ── Scroll Reveal ──────────────────────────────────────────────
    revealObserverInstance = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    function initReveal() {
      document.querySelectorAll('.cv-reveal, .cv-reveal-left, .cv-reveal-right').forEach(el => {
        revealObserverInstance.observe(el);
      });
    }
    // Chạy ngay + chạy lại sau khi content động được render
    initReveal();
    setTimeout(initReveal, 600);
  }

  return {
    loadData, addToCart, removeFromCart, updateCartQty, getCart, cartTotal, cartCount,
    toggleWishlist, isWishlisted, getWishlist, saveWishlist,
    handleAddToCart, handleWishlistClick, bumpBadge,
    searchProducts, filterProducts, paginate,
    loginWith, logout, getUser, saveUser,
    updateCartBadge, updateWishlistBadge, updateUserUI, updateAllBadges,
    injectStyles, injectHeader, injectFooter, productCardHTML, renderProductGrid,
    toggleSearch, doGlobalSearch, showAuthModal, toggleMobileNav, init,
    get products() { return products; }, get blogs() { return blogs; }, get currentUser() { return currentUser; }
  };
})();

document.addEventListener('DOMContentLoaded', () => CELLVANY.init());
