# Testimony Staff Savings & Credit Co-operative Society Ltd
## Official Website

**Registered:** CS/4621/2019 | **Location:** Eldoret, Kenya | **Tel:** 053-2062714

---

## 🚀 Quick Start — GitHub Pages

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com) → New repository
2. Name: `testimony-sacco` (or `testimonysacco.github.io` for custom subdomain)
3. Set to **Public**
4. Click **Create repository**

### Step 2: Upload Files
1. Click **uploading an existing file**
2. Drag ALL these files/folders into the upload area:
   - `index.html`
   - `about.html`
   - `services.html`
   - `news.html`
   - `contact.html`
   - `login.html`
   - `assets/` (entire folder)
   - `member/` (entire folder)
   - `admin/` (entire folder)
3. Click **Commit changes**

### Step 3: Enable GitHub Pages
1. Go to repository **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** | Folder: **/ (root)**
4. Click **Save**
5. Wait 2–3 minutes → your site is live at:
   `https://YOUR-USERNAME.github.io/testimony-sacco/`

---

## 🌐 Site Structure

```
testimony-sacco/
├── index.html          ← Home page (public)
├── about.html          ← About Us (public)
├── services.html       ← Services (public)
├── news.html           ← News & Announcements (public)
├── contact.html        ← Contact + Membership form (public)
├── login.html          ← Login for all roles
├── member/
│   └── dashboard.html  ← Member portal (after login)
├── admin/
│   └── panel.html      ← Admin panel (admin/officer login)
└── assets/
    ├── css/style.css   ← All styles
    └── js/app.js       ← All JavaScript
```

---

## 🔐 Demo Login Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | `ADMIN` | `admin123` |
| Chairman | `CHAIRMAN` | `chair123` |
| Treasurer | `TREASURER` | `treas123` |
| Secretary | `SECRETARY` | `secr123` |
| Member | `HM018` | `sacco123` |
| Member | `HM042` | `sacco123` |
| Member | `HM122` | `sacco123` |

> ⚠️ **Before going live:** Change all passwords and connect to Google Sheets API

---

## 🔗 Connecting to Google Sheets (Production)

When ready to show live member data:

1. Deploy the Google Apps Script as a **Web App**
2. Update `assets/js/app.js` → `loadMemberData()` function:
   ```javascript
   const response = await fetch('YOUR_WEB_APP_URL?action=getMemberData&mn=' + mn);
   const data = await response.json();
   ```
3. The Web App reads from the Master Tracker and returns JSON

---

## 🏠 Moving to Hostinger

1. Download all files from GitHub
2. Log into Hostinger → File Manager
3. Upload all files to `public_html/`
4. Point your domain to Hostinger nameservers
5. Done — same files, custom domain!

---

## 📞 Contact

- **Chairman:** 0714 510 786
- **Treasurer:** 0726 237 882  
- **Secretary:** 0740 315 983
- **Office:** P.O. Box 2134–30100, Eldoret | Tel: 053-2062714

---

*Built with ❤️ for the Testimony Sacco community*
