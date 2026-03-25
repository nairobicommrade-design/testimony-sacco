// ================================================================
// TESTIMONY SACCO — Main JavaScript
// ================================================================

// ── Mobile Menu ──────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

if (hamburger) {
  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
}
if (mobileClose) {
  mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
}
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Active nav link ───────────────────────────────────────────────
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

// ── Scroll animations ─────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .news-card, .why-item, .contact-card, .value-card, .board-card, .testi-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.visible, .card, .news-card, .why-item, .contact-card').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.08) + 's';
  });
});

// Add visible class to trigger animation
const visObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }, 80);
      visObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .news-card, .why-item, .contact-card, .value-card, .board-card, .testi-card').forEach((el, i) => {
  el.style.transitionDelay = (i % 4 * 0.1) + 's';
  visObserver.observe(el);
});

// ── Counter animation ─────────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ── News filter ───────────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.news-card').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? 'block' : 'none';
    });
  });
});

// ── Contact form ──────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type=submit]');
    btn.disabled = true;
    btn.innerHTML = '<span class="loader"></span> Sending...';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      showAlert(contactForm, 'success', '✅ Message sent! We will get back to you within 24 hours.');
      contactForm.reset();
    }, 1500);
  });
}

function showAlert(parent, type, msg) {
  const existing = parent.querySelector('.alert');
  if (existing) existing.remove();
  const div = document.createElement('div');
  div.className = 'alert alert-' + type;
  div.textContent = msg;
  parent.insertBefore(div, parent.firstChild);
  setTimeout(() => div.remove(), 5000);
}

// ── Authentication (localStorage-based for demo) ──────────────────
const AUTH_KEY = 'sacco_auth';

function getSaccoUser() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch { return null; }
}

function setSaccoUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

function clearSaccoUser() {
  localStorage.removeItem(AUTH_KEY);
}

function requireAuth(role) {
  const user = getSaccoUser();
  if (!user) { window.location.href = '../login.html'; return null; }
  if (role && user.role !== role && user.role !== 'admin') {
    window.location.href = '../login.html'; return null;
  }
  return user;
}

// ── Login page logic ──────────────────────────────────────────────
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const mn = document.getElementById('memberNo').value.trim().toUpperCase();
    const pw = document.getElementById('password').value;
    const btn = loginForm.querySelector('button[type=submit]');

    btn.disabled = true;
    btn.innerHTML = '<span class="loader"></span> Verifying...';

    // Simulate verification — in production connects to Google Sheets Web App
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Sign In';

      // Demo accounts
      const accounts = {
        'ADMIN': { password: 'admin123', role: 'admin', name: 'Administrator' },
        'HM018': { password: 'sacco123', role: 'member', name: 'Micah Kiptanui Yego' },
        'HM031': { password: 'sacco123', role: 'member', name: 'Joseph Sweta Serebeya' },
        'HM042': { password: 'sacco123', role: 'member', name: 'Alice Chepkemoi Kiboi' },
        'HM122': { password: 'sacco123', role: 'member', name: 'David Kibet S A Chumba' },
        'CHAIRMAN': { password: 'chair123', role: 'chairman', name: 'Chairman' },
        'TREASURER': { password: 'treas123', role: 'treasurer', name: 'Treasurer' },
        'SECRETARY': { password: 'secr123', role: 'secretary', name: 'Secretary' },
      };

      const acct = accounts[mn];
      if (!acct || acct.password !== pw) {
        showAlert(loginForm, 'error', '❌ Invalid Member Number or Password.');
        return;
      }

      setSaccoUser({ mn, role: acct.role, name: acct.name });

      if (acct.role === 'admin') window.location.href = 'admin/panel.html';
      else window.location.href = 'member/dashboard.html';
    }, 1000);
  });
}

// ── Logout ────────────────────────────────────────────────────────
document.querySelectorAll('[data-logout]').forEach(btn => {
  btn.addEventListener('click', () => {
    clearSaccoUser();
    window.location.href = '../login.html';
  });
});

// ── Member dashboard ──────────────────────────────────────────────
if (document.getElementById('memberDash')) {
  const user = getSaccoUser();
  if (!user) { window.location.href = '../login.html'; }
  else {
    document.getElementById('dashName').textContent = user.name;
    document.getElementById('dashRole').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    document.getElementById('dashMn').textContent = user.mn;

    // In production this fetches from Google Sheets Web App
    // For now showing demo data
    loadMemberData(user.mn);
  }
}

function loadMemberData(mn) {
  // Demo data — replace with actual Google Sheets API call in production
  const demoData = {
    'HM018': { savings: 45000, loanBal: 120000, shares: 15, status: 'Active', contribs: 12 },
    'HM031': { savings: 28000, loanBal: 0, shares: 8, status: 'Active', contribs: 8 },
    'HM042': { savings: 62000, loanBal: 85000, shares: 22, status: 'Active', contribs: 15 },
    'HM122': { savings: 15000, loanBal: 45000, shares: 5, status: 'Active', contribs: 4 },
  };
  const d = demoData[mn] || { savings: 0, loanBal: 0, shares: 0, status: 'Active', contribs: 0 };

  const fmt = n => 'KES ' + Number(n).toLocaleString();
  const el = id => document.getElementById(id);

  if (el('savBal'))  el('savBal').textContent  = fmt(d.savings);
  if (el('loanBal')) el('loanBal').textContent = d.loanBal > 0 ? fmt(d.loanBal) : '—';
  if (el('shares'))  el('shares').textContent  = d.shares + ' shares';
  if (el('contribs'))el('contribs').textContent= d.contribs + ' months';
  if (el('memStatus')) {
    el('memStatus').className = 'badge badge-' + (d.status === 'Active' ? 'green' : 'red');
    el('memStatus').textContent = d.status;
  }
}

// ── Admin panel ───────────────────────────────────────────────────
if (document.getElementById('adminPanel')) {
  const user = getSaccoUser();
  if (!user || (user.role !== 'admin' && user.role !== 'chairman' && user.role !== 'treasurer')) {
    window.location.href = '../login.html';
  } else {
    document.getElementById('adminName').textContent = user.name;
    document.getElementById('adminRole').textContent = user.role;
  }

  // Admin sidebar navigation
  document.querySelectorAll('.admin-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.admin-nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const section = link.dataset.section;
      document.querySelectorAll('.admin-section[data-section]').forEach(s => {
        s.style.display = s.dataset.section === section ? 'block' : 'none';
      });
    });
  });
}

// ── News form (admin) ─────────────────────────────────────────────
const newsForm = document.getElementById('newsForm');
if (newsForm) {
  newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsForm.querySelector('button[type=submit]');
    btn.disabled = true;
    btn.innerHTML = '<span class="loader"></span> Publishing...';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Publish News';
      showAlert(newsForm, 'success', '✅ News published successfully!');
      newsForm.reset();
    }, 1200);
  });
}

// ── Smooth scroll for anchor links ───────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

console.log('%c✦ TESTIMONY SACCO %c v1.0', 'background:#1F3864;color:#C9A84C;font-weight:bold;padding:4px 8px;border-radius:4px', 'color:#666');
