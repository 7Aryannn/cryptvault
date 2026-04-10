# CryptVault - Your Locally Encrypted Vault

A client-side password manager built with React and Tailwind CSS. CryptVault allows users to store, manage, and access credentials securely in their browser using AES-GCM encryption. The project focuses on usability, accessibility, and security-conscious design without relying on any backend or third-party storage.

**Live Demo :** [cryptvault-local.vercel.app](https://cryptvault-local.vercel.app)

---

## Table of Contents 

- [Overview](#overview)
- [Features](#features)
- [Technical Stack](#technical-stack)
- [Architecture Highlights](#architecture-highlights)
- [Getting Started](#getting-started)
- [Future Improvements](#future-improvements)

---

## Overview

CryptVault is a portfolio-grade password manager that runs entirely in the browser. All credentials are encrypted with AES-GCM using a master password before being stored in localStorage — no data is ever sent to any server. The project demonstrates practical React patterns, cryptographic security, form validation, accessibility-conscious UI, and thoughtful UX details that go beyond a basic CRUD implementation.

---

## Features

### Security
- Master password gate on every session — credentials are never accessible without it
- AES-GCM 256-bit encryption via the Web Crypto API (`crypto.subtle`)
- Key derived from master password using PBKDF2 with 200,000 iterations and SHA-256
- Random 12-byte IV generated per encryption operation — no two ciphertexts are identical
- Non-extractable `CryptoKey` objects — raw key material is never exposed to JavaScript
- Master password verified via encrypted sentinel value — the plaintext password is never stored
- Vault data and verification hash use separate encryption operations
- Full vault wipe via master password reset if forgotten

### Core Features
- Add, edit, and delete credentials (website, username, password)
- Website field accepts both valid URLs (`https://google.com`) and plain names (`Google`)
- Username validation: minimum 3 characters, must start with a letter or number, only letters, numbers, and underscores allowed
- Strong password validation: minimum 8 characters, requires uppercase, lowercase, number, and special character
- Show/Hide password toggle in both Add and Edit modes
- Encrypted credentials persist across sessions via localStorage

### UX Enhancements
- Toast notifications for all actions: add (green), edit (blue), delete (red)
- Toast auto-dismisses with a visible countdown progress bar
- Responsive toast positioning: top-right on desktop, bottom-center on mobile
- Swipe-to-dismiss toasts on mobile (vertical swipe) and desktop (horizontal swipe)
- Subtle haptic feedback on toast appearance via the Vibration API (Android browsers)
- Smooth entry and exit animations on toasts and credential cards
- Edit mode scales up the active card and dims all others for focused interaction
- New credentials animate in with a fade and slide effect
- Loading spinner and disabled state on buttons during save to prevent duplicate submissions
- Undo option on delete with a 5-second window before permanent removal
- Floating label inputs with smooth focus animations

### Accessibility and Keyboard Support
- Arrow key navigation between fields (ArrowDown / ArrowUp)
- Enter key moves focus from Website → Username → Password → Submit button
- Mobile keyboard "Next" button support via proper input attributes
- All navigation implemented using `useRef` without interfering with existing form logic

---

## Technical Stack

| Technology | Usage |
|---|---|
| React | UI, state management, component architecture |
| Tailwind CSS | Styling and responsive layout |
| Web Crypto API | AES-GCM encryption and PBKDF2 key derivation |
| Clipboard API | Copy password to clipboard |
| Vibration API | Haptic feedback on supported mobile devices |
| localStorage | Encrypted client-side credential persistence |
| React Router | Client-side routing between Manager and Vault views |

---

## Architecture Highlights

- **Encryption layer** — `cryptoUtils.js` handles all cryptographic operations: key derivation, master password hashing, verification, encryption, and decryption. All operations use the native Web Crypto API with no third-party dependencies.
- **Master password gate** — `MasterPasswordGate` component handles both first-time setup and subsequent unlock flows, deriving the encryption key before granting access to the vault.
- **Centralized toast system** — a single `Toast` component handles all variants (success, edit, delete) with type-based styling, icons, progress bar, and swipe-to-dismiss behavior.
- **Reusable validation utilities** — `credentialUtils.js` exports `validateWebsite`, `validateUsername`, `validatePassword`, and `validateCredentials` used consistently across both Add and Edit flows.
- **Custom hook** — `useFieldNavigation` provides a reusable keyboard navigation interface using refs, shared across Manager and Vault forms.
- **Lifted state** — credentials state lives in `App.jsx` and is passed down as props, avoiding sync issues between pages. All mutations go through `saveCredentials` which re-encrypts and persists on every change.
- **Modular component structure** — `Manager`, `Vault`, `Toast`, `MasterPasswordGate`, and `Navbar` are cleanly separated with single responsibilities.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/7Aryannn/cryptvault.git

# Navigate to the project directory
cd cryptvault

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

No environment variables or backend setup required.

---

## Future Improvements

- Password strength meter with real-time visual feedback
- Import and export credentials as encrypted JSON
- Derive separate keys for verification and data encryption
- Browser extension support
- Backend integration with user accounts and server-side storage
