# 🔥 Ignite – Angular + Firebase SPA

**Ignite** is a responsive single-page application built with **Angular 18** and powered by **Firebase**. It offers a complete full-stack solution, featuring user authentication, real-time data sync, secure cloud storage, and mobile-friendly features like camera access for photo capture.

---

## 🚀 Live Features

- 🔐 Secure user authentication with email verification
- 👤 Profile management with drag-and-drop or camera photo upload
- 📸 Mobile Camera Module: Capture and upload profile photos using device camera
- 🕒 Real-time Firestore data sync
- 📱 Mobile-first responsive UI with animations
- ⚙️ Optimized for performance and progressive enhancement

---

## 🧱 Frontend Development

- **Angular 18**: Built with standalone components and Angular CLI
- **TypeScript**: Strong typing, interfaces, and clean OOP design
- **Responsive Layout**: Mobile-first grid/flexbox design with media queries
- **SCSS/Sass Styling**: Variables, mixins, animations, and scoped component styles
- **Component Architecture**:
  - Modular and reusable with clear separation of concerns
  - Reactive forms and inter-component communication via `@Input()` / `@Output()`

---

## 📸 Mobile Camera Module

- **Device Integration**:
  - Access mobile or desktop camera using the native MediaDevices API
  - Preview captured image before upload
- **Angular Component**:
  - Reusable `CameraCaptureComponent` integrated with profile module
- **Profile Image Upload**:
  - Option to either select a file or take a photo on mobile devices
- **Security & Compatibility**:
  - Uses HTTPS context and proper permissions
  - Fallbacks for devices without camera access

---

## 🔥 Firebase Backend Integration

- **Authentication**:
  - Sign up/login with email & password
  - Email verification and protected routes
- **Firestore**:
  - Real-time updates and structured user data
- **Cloud Storage**:
  - Upload profile pictures with drag-and-drop or camera
- **Hosting**:
  - Deployed via Firebase Hosting for fast global access

---

## ⚙️ Technical Skills & Tooling

| Skill/Tool         | Description                                |
|--------------------|--------------------------------------------|
| Angular CLI        | Project generation, dev server, prod builds|
| TypeScript         | Interfaces, OOP, async/await                |
| SCSS / CSS3        | Advanced styling & animations               |
| RxJS               | Observables for reactive state/data flows   |
| Git                | Version control and branching strategy      |
| Firebase SDK       | Auth, Firestore, Storage, Hosting           |
| MediaDevices API   | Camera input and stream handling            |

---

## 💻 UI/UX Development

- **Progressive Enhancement**:
  - Mobile-first design, responsive grid layout
  - ARIA labels, form validation, and keyboard support
- **CSS Animations**:
  - Smooth transitions and hover effects
- **Cross-browser Compatibility**:
  - Works across all modern browsers and devices
- **Camera Access UX**:
  - User-friendly interface for capturing and uploading images

---

## 📁 Project Folder Structure

```bash
ignite/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── camera-capture/      # 📸 Camera capture component
│   │   ├── pages/                   # 🧩 Feature pages (Profile, Dashboard, Auth, etc.)
│   │   ├── services/                # 🛠️ Firebase services, Auth services, Theme, etc.
│   │   └── guards/                  # 🔐 Route protection guards
│   ├── assets/                      # 🎨 Static assets (icons, logos, etc.)
│   └── environments/                # 🌎 Environment configs (dev/prod)
├── firebase.json                    # 🔥 Firebase Hosting configuration
└── README.md                        # 📄 This documentation file
