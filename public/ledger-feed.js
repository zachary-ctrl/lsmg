// ============================================================
// LSMG LEDGER - LIVE RSS FEED
// Add this script to your Culture Ledger page (before </body>)
// ============================================================

async function loadLedgerFeed(category = 'All') {
  const container = document.getElementById('news-feed') || document.querySelector('[data-news-feed]');
  if (!container) return;

  container.innerHTML = '<p style="text-align:center;opacity:0.6;">Loading stories...</p>';

  try {
    const res = await fetch('/api/news');
    const articles = await res.json();

    const filtered = category === 'All'
      ? articles
      : articles.filter(a => a.category === category);

    if (filtered.length === 0) {
      container.innerHTML = '<p style="text-align:center;opacity:0.6;">No stories found.</p>';
      return;
    }

    container.innerHTML = filtered.map(a => `
      <a href="${a.link}" target="_blank" rel="noopener" class="ledger-article" style="
        display:block; text-decoration:none; color:inherit;
        padding:20px 0; border-bottom:1px solid rgba(255,255,255,0.1);
      ">
        <div style="display:flex; gap:16px; align-items:flex-start;">
          ${a.image ? `<img src="${a.image}" alt="" style="width:120px;height:80px;object-fit:cover;border-radius:6px;flex-shrink:0;" onerror="this.style.display='none'">` : ''}
          <div>
            <h3 style="margin:0 0 6px 0;font-size:1.05rem;">${a.title}</h3>
            <span style="font-size:0.8rem;opacity:0.5;">${a.source} · ${a.category} · ${new Date(a.date).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })}</span>
            <p style="margin:8px 0 0;font-size:0.9rem;opacity:0.7;">${a.snippet || ''}</p>
          </div>
        </div>
      </a>
    `).join('');
  } catch (e) {
    container.innerHTML = '<p style="text-align:center;opacity:0.5;">Unable to load stories. Refresh to try again.</p>';
  }
}

// Auto-refresh every 3 minutes
loadLedgerFeed();
setInterval(() => loadLedgerFeed(), 180000);

// Hook up category filter tabs (if they exist)
document.querySelectorAll('[data-category]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-category]').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    loadLedgerFeed(tab.dataset.category);
  });
});
