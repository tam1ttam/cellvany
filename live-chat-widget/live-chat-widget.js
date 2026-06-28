/**
 * Live Chat Widget — CELLVANY
 * Standalone vanilla JS, no dependencies.
 *
 * Usage:
 *   ChatWidget.init({ facebookUrl: 'https://m.me/your-page' })
 */
const ChatWidget = (() => {
  /* ---------- config ---------- */
  const DEFAULTS = {
    facebookUrl: 'https://www.facebook.com/Cellvany',
    fabLabel: 'Hỗ trợ',
    popoverTitle: 'Cần hỗ trợ?',
    popoverSubtitle: 'Đang online · đóng lúc 17:00',
    cardTitle: 'Nhắn Fanpage',
    cardSubtitle: 'Inbox Facebook Like3s',
    footerText: 'Hỗ trợ 08h–12h · 14h–17h · 19h–22h hằng ngày',
    activeRange: '14h–17h',
  };

  /* ---------- state ---------- */
  let cfg = { ...DEFAULTS };
  let open = false;
  let fabEl, popoverEl, overlayEl;

  /* ---------- helpers ---------- */
  const q = (sel, ctx = document) => ctx.querySelector(sel);
  const nowHour = () => new Date().getHours();
  const isActiveSlot = () => {
    const h = nowHour();
    return (h >= 8 && h < 12) || (h >= 14 && h < 17) || (h >= 19 && h < 22);
  };

  const highlightActiveRange = (text) => {
    if (!isActiveSlot()) return text;
    return text.replace(cfg.activeRange, `<strong style="color:#2563eb">${cfg.activeRange}</strong>`);
  };

  /* ---------- build DOM ---------- */
  const build = () => {
    /* overlay để bắt click-outside */
    overlayEl = document.createElement('div');
    overlayEl.id = 'chat-widget-overlay';
    Object.assign(overlayEl.style, {
      position: 'fixed', inset: '0', zIndex: '9998', display: 'none',
    });
    overlayEl.addEventListener('click', close);
    document.body.appendChild(overlayEl);

    /* popover */
    popoverEl = document.createElement('div');
    popoverEl.id = 'chat-widget-popover';
    popoverEl.setAttribute('role', 'dialog');
    popoverEl.setAttribute('aria-label', cfg.popoverTitle);
    Object.assign(popoverEl.style, {
      position: 'fixed',
      bottom: '80px',
      right: '24px',
      width: '300px',
      maxWidth: 'calc(100vw - 32px)',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 20px 60px rgba(0,0,0,.18), 0 0 0 1px rgba(0,0,0,.04)',
      zIndex: '9999',
      fontFamily: "'Inter', system-ui, sans-serif",
      opacity: '0',
      transform: 'translateY(8px)',
      transition: 'opacity 200ms ease-out, transform 200ms ease-out',
      pointerEvents: 'none',
      overflow: 'hidden',
    });

    popoverEl.innerHTML = `
      <!-- header -->
      <div style="
        background: linear-gradient(135deg, #1a4fd6 0%, #2563eb 100%);
        padding: 18px 16px 14px;
        color: #fff;
        position: relative;
      ">
        <button id="chat-widget-close" aria-label="Đóng" style="
          position: absolute; top: 10px; right: 10px;
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(255,255,255,.15); border: none; cursor: pointer;
          color: #fff; font-size: 16px; line-height: 1;
          display: flex; align-items: center; justify-content: center;
          transition: background 150ms;
        " onmouseenter="this.style.background='rgba(255,255,255,.28)'"
           onmouseleave="this.style.background='rgba(255,255,255,.15)'">✕</button>
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="
            width: 36px; height: 36px; border-radius: 50%;
            background: rgba(255,255,255,.18);
            display: flex; align-items: center; justify-content: center;
            font-size: 18px; flex-shrink: 0;
          ">🎧</div>
          <div>
            <div style="font-size:16px;font-weight:600;line-height:1.3">${cfg.popoverTitle}</div>
            <div style="font-size:12px;opacity:.88;margin-top:2px;display:flex;align-items:center;gap:6px;">
              <span style="width:7px;height:7px;border-radius:50%;background:#22c55e;display:inline-block"></span>
              ${cfg.popoverSubtitle}
            </div>
          </div>
        </div>
      </div>

      <!-- body: kênh liên hệ -->
      <div style="padding: 12px;">
        <a id="chat-widget-fb-link" href="${cfg.facebookUrl}" target="_blank" rel="noopener" style="
          display: flex; align-items: center; gap: 12px;
          background: #fff; border: 1px solid #e5e7eb; border-radius: 8px;
          padding: 12px 14px; text-decoration: none; transition: box-shadow 150ms;
        " onmouseenter="this.style.boxShadow='0 4px 12px rgba(0,0,0,.08)'"
           onmouseleave="this.style.boxShadow='none'">
          <div style="
            width: 36px; height: 36px; border-radius: 50%;
            background: #1877f2; flex-shrink: 0;
            display: flex; align-items: center; justify-content: center;
            color: #fff; font-size: 18px; font-weight: 700;
          ">f</div>
          <div>
            <div style="font-size:14px;font-weight:600;color:#111827;line-height:1.3">${cfg.cardTitle}</div>
            <div style="font-size:12px;color:#6b7280;margin-top:1px">${cfg.cardSubtitle}</div>
          </div>
        </a>
      </div>

      <!-- footer: giờ hỗ trợ -->
      <div style="
        padding: 10px 16px 14px; border-top: 1px solid #e5e7eb;
        display: flex; align-items: center; gap: 8px;
        font-size: 12px; color: #6b7280;
      ">
        <span style="font-size:14px">🕐</span>
        <span>${highlightActiveRange(cfg.footerText)}</span>
      </div>
    `;

    document.body.appendChild(popoverEl);

    /* FAB */
    fabEl = document.createElement('button');
    fabEl.id = 'chat-widget-fab';
    fabEl.setAttribute('aria-label', cfg.fabLabel);
    Object.assign(fabEl.style, {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: '9999',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 20px',
      background: '#1a4fd6',
      color: '#fff',
      border: 'none',
      borderRadius: '999px',
      fontFamily: "inherit",
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '1',
      cursor: 'pointer',
      boxShadow: '0 6px 20px rgba(26,79,214,.35)',
      transition: 'background 150ms, transform 100ms',
    });
    fabEl.innerHTML = `<span style="font-size:16px">🎧</span><span id="chat-fab-label">${cfg.fabLabel}</span>`;

    fabEl.addEventListener('mouseenter', () => { if (!open) fabEl.style.background = '#1740b0'; });
    fabEl.addEventListener('mouseleave', () => { if (!open) fabEl.style.background = '#1a4fd6'; });
    fabEl.addEventListener('mousedown', () => fabEl.style.transform = 'scale(0.95)');
    fabEl.addEventListener('mouseup',   () => fabEl.style.transform = 'scale(1)');
    fabEl.addEventListener('click', toggle);

    document.body.appendChild(fabEl);
  };

  /* ---------- open / close ---------- */
  const openPopover = () => {
    open = true;
    overlayEl.style.display = 'block';
    popoverEl.style.pointerEvents = 'auto';
    popoverEl.style.opacity = '1';
    popoverEl.style.transform = 'translateY(0)';
    fabEl.innerHTML = '✕';
    fabEl.style.background = '#111827';
    fabEl.setAttribute('aria-label', 'Đóng chat');
  };

  const closePopover = () => {
    open = false;
    overlayEl.style.display = 'none';
    popoverEl.style.opacity = '0';
    popoverEl.style.transform = 'translateY(8px)';
    popoverEl.style.pointerEvents = 'none';
    fabEl.innerHTML = `<span style="font-size:16px">🎧</span><span id="chat-fab-label">${cfg.fabLabel}</span>`;
    fabEl.style.background = '#1a4fd6';
    fabEl.setAttribute('aria-label', cfg.fabLabel);
  };

  const toggle = () => open ? closePopover() : openPopover();

  /* ---------- public API ---------- */
  const init = (userCfg = {}) => {
    cfg = { ...DEFAULTS, ...userCfg };
    if (document.getElementById('chat-widget-fab')) return; // already mounted
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => build());
    } else {
      build();
    }
  };

  const destroy = () => {
    closePopover();
    fabEl?.remove();
    popoverEl?.remove();
    overlayEl?.remove();
  };

  return { init, destroy, toggle, open: openPopover, close: closePopover };
})();

/* auto-init khi gọi trực tiếp (không cần build step) */
if (typeof window !== 'undefined') {
  window.ChatWidget = ChatWidget;
}
