# Testimony Sacco — Website v2 (Firebase Backend)

## 🚀 Setup Guide

### Step 1: Create Firebase Project (FREE)

1. Go to **https://console.firebase.google.com**
2. Click **"Add project"**
3. Name: `testimony-sacco`
4. Disable Google Analytics (not needed)
5. Click **"Create project"**

---

### Step 2: Enable Authentication

1. In Firebase console → **Authentication** → **Get started**
2. Click **Email/Password** → Enable → Save

---

### Step 3: Enable Firestore Database

1. **Firestore Database** → **Create database**
2. Choose **"Start in test mode"** (we'll secure it later)
3. Select region: `europe-west1` or `us-central1`
4. Click **Done**

---

### Step 4: Get Your Config Keys

1. Click the **gear icon** → **Project settings**
2. Scroll to **"Your apps"** → Click **`</>`** (web)
3. App nickname: `testimony-sacco-web`
4. Click **Register app**
5. Copy the `firebaseConfig` object

---

### Step 5: Update firebase-config.js

Open `assets/js/firebase-config.js` and replace:

```javascript
const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",           // ← paste your values
  authDomain:        "testimony-sacco.firebaseapp.com",
  projectId:         "testimony-sacco",
  storageBucket:     "testimony-sacco.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
```

---

### Step 6: Create First Admin Account

1. Go to Firebase console → **Authentication** → **Users** → **Add user**
2. Email: `admin@testimonysacco.com` (or your email)
3. Password: choose a strong password
4. Copy the **User UID** shown

5. Go to **Firestore** → **Start collection** → Collection ID: `members`
6. Document ID: paste the UID you copied
7. Add these fields:
   ```
   uid          → (string) paste the UID
   email        → admin@testimonysacco.com
   fullName     → Administrator
   firstName    → Admin
   lastName     → User
   role         → admin
   status       → active
   memberNo     → ADMIN
   savings      → 0
   loanBalance  → 0
   shares       → 0
   ```
8. Click **Save**

---

### Step 7: Set Firestore Security Rules

In Firebase → Firestore → **Rules**, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Members can read their own data
    match /members/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/members/$(request.auth.uid)).data.role in ['admin','treasurer','chairman','secretary'];
    }

    // Admins can read/write all members
    match /members/{userId} {
      allow read, write: if request.auth != null &&
        get(/databases/$(database)/documents/members/$(request.auth.uid)).data.role in ['admin','treasurer','chairman'];
    }

    // Anyone authenticated can create an application
    match /applications/{docId} {
      allow create: if request.auth != null;
      allow read, write: if request.auth != null &&
        get(/databases/$(database)/documents/members/$(request.auth.uid)).data.role in ['admin','treasurer','chairman','secretary'];
    }

    // Members read their own contributions/loans
    match /contributions/{docId} {
      allow read: if request.auth != null && resource.data.memberId == request.auth.uid;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/members/$(request.auth.uid)).data.role in ['admin','treasurer'];
    }

    match /loans/{docId} {
      allow read: if request.auth != null && resource.data.memberId == request.auth.uid;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/members/$(request.auth.uid)).data.role in ['admin','treasurer','chairman'];
    }

    match /loan_applications/{docId} {
      allow create: if request.auth != null;
      allow read, write: if request.auth != null &&
        get(/databases/$(database)/documents/members/$(request.auth.uid)).data.role in ['admin','treasurer','chairman'];
    }

    // News — anyone can read, admins can write
    match /news/{docId} {
      allow read: if true;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/members/$(request.auth.uid)).data.role in ['admin','treasurer','chairman','secretary'];
    }

    // Settings
    match /settings/{docId} {
      allow read: if true;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/members/$(request.auth.uid)).data.role in ['admin'];
    }
  }
}
```

---

### Step 8: Upload to GitHub Pages

Same as before — upload all files, enable Pages. Site works immediately.

---

### Step 9: Move to Hostinger (testimonysacco.com)

1. Buy hosting + domain at **hostinger.com**
2. Choose **Business** or **Premium** plan
3. In Hostinger → File Manager → `public_html/`
4. Upload all website files
5. Set up **professional email**: `info@testimonysacco.com`

---

## 📋 Collections Structure (Firestore)

| Collection | Purpose |
|---|---|
| `members` | All member profiles + financial data |
| `applications` | Membership applications (for admin review) |
| `contributions` | Monthly contribution records |
| `loans` | Active loans |
| `loan_applications` | Loan applications (for approval) |
| `news` | News and announcements |
| `settings` | Site-wide settings |

---

## 🔐 Default Login Flow

1. Member signs up → status: `pending`
2. Admin reviews → clicks **Approve**
3. System auto-assigns member number (HM001, HM002...)
4. Member can now login and see full dashboard

---

## 📞 Contact

- **Chairman:** 0714 510 786
- **Treasurer:** 0726 237 882
- **Secretary:** 0740 315 983

---
*Testimony Staff Savings & Credit Co-operative Society Ltd — REG. NO: CS/4621/2019*
