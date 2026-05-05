# ✈️ TripAdvisor Clone

A modern, fully-functional travel destination review application built with **AngularJS** and **Firebase**. Browse, add, edit, delete, rate, and review travel destinations — all with a sleek glassmorphism UI that works on any device.

---

## 🌍 Live Demo

🔗 **[https://trip-advisor-clone-psi.vercel.app](https://trip-advisor-clone-psi.vercel.app)**

---

## 📸 Screenshots

> Sign in with your Google account to unlock full features.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Google Authentication** | Secure sign-in with Firebase Auth |
| 📋 **Browse Destinations** | Beautiful card grid with images, ratings & reviews |
| ➕ **Add Destinations** | Add new travel spots with name, description & image URL |
| ✏️ **Edit Destinations** | Modify any destination's details inline |
| 🗑️ **Delete Destinations** | Permanently remove destinations |
| ⭐ **Star Ratings** | Rate any destination from 1–5 stars |
| 💬 **Reviews** | Leave written reviews on any destination |
| 💾 **Firebase Realtime DB** | All data persists permanently across all browsers & devices |
| ⚡ **localStorage Cache** | Instant load from local cache while Firebase syncs in background |
| 📱 **Fully Responsive** | Works beautifully on desktop, tablet, and mobile |
| 🎨 **Glassmorphism UI** | Modern premium design with blur effects, Inter font & animations |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **AngularJS 1.8.2** | Frontend Single Page Application |
| **Firebase Auth v8** | Google Sign-In Authentication |
| **Firebase Realtime DB v8** | Permanent cloud database (primary storage) |
| **localStorage** | Fast offline cache for instant UI loads |
| **CSS (Custom)** | Glassmorphism, animations, responsive grid |
| **Google Fonts — Inter** | Modern premium typography |
| **Vercel** | Hosting & auto-deployment |

---

## 🚀 Getting Started Locally

### Prerequisites
- A modern web browser
- VS Code with the **Live Server** extension (or any local HTTP server)

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/PrathamKhawani/Trip_advisor-Clone.git
   cd Trip_advisor-Clone
   ```

2. **Open the app**
   - Navigate to `trip-advisor/frontend/`
   - Right-click `index.html` → **Open with Live Server**

3. **Sign In**
   - Click **Sign In with Google**
   - You'll be redirected to the listings page

---

## 🔥 Firebase Setup

### Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/) → Project **`trip-advisor-9bfab`**
2. Go to **Authentication → Sign-in method**
3. Make sure **Google** is enabled
4. Under **Authorized domains**, add:
   - `localhost`
   - `trip-advisor-clone-psi.vercel.app`

### Realtime Database Rules
Set your rules to allow authenticated users to write:

```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

> ⚠️ Without these rules, add/edit/delete operations will only save locally in your browser.

---

## 📁 Project Structure

```
Trip_advisor-Clone/
├── trip-advisor/
│   └── frontend/
│       ├── index.html          # Main HTML — layout, styles, navigation
│       └── app.js              # AngularJS app — routes, controllers, all logic
├── vercel.json                 # Vercel deployment configuration
└── README.md
```

---

## ⚙️ How It Works

### Data Flow
```
User Action
    ↓
Instant UI Update (Optimistic)
    ↓
localStorage Cache Updated (instant persistence in this browser)
    ↓
Firebase Realtime DB Updated (permanent persistence across all browsers/devices)
```

### On First Load
- App checks **localStorage** for a cached list → shows instantly
- Simultaneously fetches live data from **Firebase**
- If Firebase has data → syncs it to UI and cache
- If Firebase is empty → seeds the 3 default destinations into Firebase

### Default Destinations
| # | Destination | Rating |
|---|---|---|
| 1 | 🗼 Eiffel Tower, Paris | ⭐⭐⭐⭐⭐ |
| 2 | 🏟️ Colosseum, Rome | ⭐⭐⭐⭐ |
| 3 | 🌊 Santorini, Greece | ⭐⭐⭐⭐⭐ |

---

## 🚢 Deployment

This project is deployed on **Vercel** with automatic deployments connected to this GitHub repository.

Every `git push` to `main` triggers a new deployment automatically.

To deploy manually:
```bash
npm install -g vercel
vercel deploy --prod
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/PrathamKhawani">Pratham Khawani</a>
  <br><br>
  <a href="https://trip-advisor-clone-psi.vercel.app">🌐 Live Demo</a> •
  <a href="https://github.com/PrathamKhawani/Trip_advisor-Clone">📦 Repository</a>
</p>
