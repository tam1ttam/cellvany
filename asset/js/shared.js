// CELLVANY Shared JavaScript
// Handles: cart, wishlist, search, auth, header/footer, product rendering

const CELLVANY = (() => {
  const DATA_URL = 'asset/data/data.json';
  const VLOG_URL = 'asset/data/vlog.json';
  const WISHLIST_URL = 'asset/data/wishlist.json';
  const LS_CART = 'cellvany_cart';
  const LS_WISHLIST = 'cellvany_wishlist';
  const LS_USER = 'cellvany_user';

  let products = [];
  let blogs = [];
  let currentUser = null;

  // ─── Shared stylesheet injection ───────────────────────────────────
  // Nhúng CSS dùng chung TRỰC TIẾP (inline <style>, không qua file .css
  // riêng) để tuyệt đối không bị lỗi do thiếu/sai đường dẫn file CSS.
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
    blogs = vRes.blogs || [];
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
    // force reflow để animation chạy lại được khi bấm liên tục
    void el.offsetWidth;
    el.classList.add(className);
  }
  function bumpBadge(type) {
    const sel = type === 'cart' ? '[data-cart-count]' : '[data-wishlist-count]';
    document.querySelectorAll(sel).forEach(el => restartAnim(el, 'cv-bump'));
  }

  // Gọi khi bấm "Thêm Vào Giỏ" ở bất kỳ đâu (card sản phẩm, trang chi tiết...)
  function handleAddToCart(productId, btnEl, qty = 1) {
    addToCart(productId, qty);
    restartAnim(btnEl, 'cv-anim-added');
    bumpBadge('cart');
  }

  // Gọi khi bấm tim yêu thích ở bất kỳ đâu (card sản phẩm, trang chi tiết, trang wishlist)
  function handleWishlistClick(productId, btnEl) {
    const list = toggleWishlist(productId);
    const isIn = list.includes(productId);

    if (btnEl) {
      btnEl.classList.toggle('active', isIn);
      // chỉ đổi icon ❤️/🤍, giữ nguyên chữ phía sau nếu có (ví dụ "❤️ Yêu Thích")
      btnEl.innerHTML = btnEl.innerHTML.replace(/❤️|🤍/, isIn ? '❤️' : '🤍');
      restartAnim(btnEl, 'cv-pop');
    }
    bumpBadge('wishlist');

    // Nếu đang ở trang wishlist.html và vừa bỏ yêu thích -> mờ dần rồi xoá card
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
        <div class="logo">
          <img src="asset/logo.png" alt="CELLVANY Logo" onerror="this.style.display='none'">
          <span class="logo-text">CELLVANY</span>
        </div>
        <nav>
          <ul>
            <li><a href="index.html">Trang Chủ</a></li>
            <li><a href="about.html">Về Chúng Tôi</a></li>
            <li><a href="shop.html">Cửa Hàng</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contact.html">Liên Hệ</a></li>
          </ul>
        </nav>
        <div class="header-icons">
          <button onclick="CELLVANY.toggleSearch()" title="Tìm kiếm">🔍</button>
          <div style="position:relative;display:flex;align-items:center;gap:6px">
            <img data-user-avatar src="${user ? user.avatar : ''}" alt="avatar"
                 style="width:32px;height:32px;border-radius:50%;cursor:pointer;display:${user ? '' : 'none'}"
                 onerror="this.style.display='none'">
            <button data-login-btn onclick="CELLVANY.showAuthModal()"
                    style="display:${user ? 'none' : ''};font-size:13px;font-weight:600;color:#27ae60;background:#fff;border:1px solid #27ae60;padding:7px 16px;border-radius:20px;cursor:pointer;white-space:nowrap;transition:background .2s,color .2s"
                    onmouseover="this.style.background='#27ae60';this.style.color='#fff'"
                    onmouseout="this.style.background='#fff';this.style.color='#27ae60'">Đăng Nhập</button>
            <button data-logout-btn onclick="CELLVANY.logout()"
                    style="display:${user ? '' : 'none'};font-size:13px;font-weight:600;color:#e74c3c;background:#fff;border:1px solid #e74c3c;padding:7px 16px;border-radius:20px;cursor:pointer;white-space:nowrap">Đăng Xuất</button>
            <span data-user-name style="font-size:12px;color:#27ae60;font-weight:600;margin-left:2px"></span>
          </div>
          <button onclick="location.href='wishlist.html'" title="Danh sách ưa thích" style="position:relative">
            ❤️ <span data-wishlist-count style="position:absolute;top:-8px;right:-8px;background:#e74c3c;color:#fff;font-size:10px;padding:1px 5px;border-radius:10px">0</span>
          </button>
          <button onclick="location.href='cart.html'" title="Giỏ hàng" style="position:relative">
            🛒 <span data-cart-count style="position:absolute;top:-8px;right:-8px;background:#e74c3c;color:#fff;font-size:10px;padding:1px 5px;border-radius:10px">0</span>
          </button>
          <button class="buy-now-btn" onclick="location.href='shop.html'">Mua Ngay</button>
        </div>
      </div>
      <div id="cellvany-search-bar" style="display:none;background:#f5f5f5;padding:10px 20px;border-bottom:1px solid #ddd">
        <div style="max-width:1200px;margin:0 auto;display:flex;gap:10px">
          <input type="text" id="global-search" placeholder="Tìm kiếm sản phẩm..." style="flex:1;padding:8px 12px;border:1px solid #ddd;border-radius:5px">
          <button onclick="CELLVANY.toggleSearch()" style="padding:8px 12px;border:1px solid #ddd;background:#fff;border-radius:5px;cursor:pointer">✕</button>
          <button onclick="CELLVANY.doGlobalSearch()" style="padding:8px 16px;background:#27ae60;color:#fff;border:none;border-radius:5px;cursor:pointer;font-weight:600">Tìm</button>
        </div>
      </div>
      <div id="cellvany-auth-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;align-items:center;justify-content:center">
        <div style="background:#fff;border-radius:12px;padding:30px;max-width:360px;width:90%;text-align:center">
          <h3 style="margin-bottom:20px">Đăng Nhập</h3>
          <button onclick="CELLVANY.loginWith('google')" style="display:flex;align-items:center;gap:10px;width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;background:#fff;cursor:pointer;margin-bottom:10px;font-size:14px">
            <img src="https://ui-avatars.com/api/?name=G&background=4285F4&color=fff" style="width:24px;height:24px;border-radius:50%"> Đăng nhập với Google
          </button>
          <button onclick="CELLVANY.loginWith('facebook')" style="display:flex;align-items:center;gap:10px;width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;background:#fff;cursor:pointer;font-size:14px">
            <img src="https://ui-avatars.com/api/?name=f&background=1877F2&color=fff" style="width:24px;height:24px;border-radius:50%"> Đăng nhập với Facebook
          </button>
          <button onclick="document.getElementById('cellvany-auth-modal').style.display='none'" style="margin-top:15px;background:none;border:none;color:#999;cursor:pointer;font-size:13px">Đóng</button>
        </div>
      </div>
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
              <a href="index.html" style="color:#27ae60;text-decoration:none">Trang Chủ</a><br>
              <a href="about.html" style="color:#27ae60;text-decoration:none">Về Chúng Tôi</a><br>
              <a href="shop.html" style="color:#27ae60;text-decoration:none">Cửa Hàng</a><br>
              <a href="blog.html" style="color:#27ae60;text-decoration:none">Blog</a><br>
              <a href="contact.html" style="color:#27ae60;text-decoration:none">Liên Hệ</a>
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
  function productCardHTML(p) {
    const inWish = isWishlisted(p.id);
    const stars = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
    return `
      <div class="product-card cv-card" data-product-id="${p.id}">
        <div class="product-image" onclick="location.href='product.html?id=${p.id}'">
          <span class="product-label" ${p.badge ? `style="background:${p.badge === 'New' ? '#27ae60' : '#333'}"` : ''}>${p.badge || p.category}</span>
          ${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span style="font-size:40px;display:none;position:absolute">🧴</span>` : '<span style="font-size:40px">🧴</span>'}
        </div>
        <div class="product-info">
          <div class="product-name" onclick="location.href='product.html?id=${p.id}'">${p.name}</div>
          <div class="product-đánh-giá">${stars} <span style="color:#999;font-size:11px">(${p.reviews})</span></div>
          <div class="product-giá">
            <span class="giá-current">${p.priceDisplay}</span>
          </div>
          <div class="product-actions">
            <button onclick="CELLVANY.handleAddToCart(${p.id}, this)">Thêm Vào Giỏ</button>
            <button class="wishlist-btn ${inWish ? 'active' : ''}" onclick="CELLVANY.handleWishlistClick(${p.id}, this)">${inWish ? '❤️' : '🤍'}</button>
          </div>
        </div>
      </div>
    `;
  }

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
    if (q) location.href = `shop.html?search=${encodeURIComponent(q)}`;
  }

  // ─── Show auth modal ───────────────────────────────────────────────
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

    // Global search on Enter
    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' && document.activeElement?.id === 'global-search') doGlobalSearch();
    });

    // Close auth modal on outside click
    document.getElementById('cellvany-auth-modal')?.addEventListener('click', e => {
      if (e.target.id === 'cellvany-auth-modal') e.target.style.display = 'none';
    });
  }

  return {
    loadData, addToCart, removeFromCart, updateCartQty, getCart, cartTotal, cartCount,
    toggleWishlist, isWishlisted, getWishlist, saveWishlist,
    handleAddToCart, handleWishlistClick, bumpBadge,
    searchProducts, filterProducts, paginate,
    loginWith, logout, getUser, saveUser,
    updateCartBadge, updateWishlistBadge, updateUserUI, updateAllBadges,
    injectStyles, injectHeader, injectFooter, productCardHTML, renderProductGrid,
    toggleSearch, doGlobalSearch, showAuthModal, init,
    get products() { return products; }, get blogs() { return blogs; }, get currentUser() { return currentUser; }
  };
})();

document.addEventListener('DOMContentLoaded', () => CELLVANY.init());