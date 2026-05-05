# ✈️ TripAdvisor Clone

A modern, fully-functional travel destination review application built with **AngularJS** and **Firebase**. Browse, add, edit, delete, rate, and review travel destinations — all with a sleek glassmorphism UI.

---

## 🌍 Live Demo

🔗 **[Coming Soon — Deploying to Vercel](#)**

---

## 📸 Features

- 🔐 **Google Authentication** — Secure sign-in with Firebase Auth
- 📋 **Listings Page** — Browse beautiful destination cards with images
- ➕ **Add Destinations** — Add new travel destinations with images
- ✏️ **Edit Destinations** — Modify existing destination details
- 🗑️ **Delete Destinations** — Remove destinations permanently
- ⭐ **Star Ratings** — Rate destinations from 1–5 stars
- 💬 **Reviews** — Leave written reviews on destinations
- 💾 **Persistent Storage** — All data saved to browser localStorage (works without Firebase rules)
- 📱 **Responsive Design** — Works beautifully on all screen sizes
- 🎨 **Glassmorphism UI** — Modern, premium design with blur effects and smooth animations

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **AngularJS 1.8.2** | Frontend SPA Framework |
| **Firebase Auth v8** | Google Sign-In Authentication |
| **Firebase Realtime DB v8** | Cloud data backup |
| **localStorage** | Primary persistent data storage |
| **CSS (Custom)** | Glassmorphism styling, animations |
| **Google Fonts (Inter)** | Typography |

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- A local web server (e.g., VS Code Live Server extension)

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/PrathamKhawani/Trip_advisor-Clone.git
   cd Trip_advisor-Clone
   ```

2. **Open the app**
   - Navigate to `trip-advisor/frontend/`
   - Open `index.html` with **Live Server** (VS Code extension) or any local HTTP server

3. **Sign In**
   - Click the **Sign In with Google** button
   - You'll be redirected to the listings page

---

## 🔥 Firebase Setup

The app uses Firebase for Google Authentication and as a cloud backup for data.

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select the project: **trip-advisor-9bfab**
3. Enable **Google Sign-In** under Authentication → Sign-in methods
4. Set **Realtime Database Rules** to allow authenticated writes:

```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

---

## 📁 Project Structure

```
Trip_advisor-Clone/
├── trip-advisor/
│   └── frontend/
│       ├── index.html      # Main HTML file (styles + structure)
│       └── app.js          # AngularJS app (routes, controllers, logic)
└── README.md
```

---

## ✨ How It Works

- **On first load**, the app seeds 3 default destinations (Eiffel Tower, Colosseum, Santorini) into your browser's `localStorage`.
- **All CRUD operations** (add, edit, delete, rate, review) are saved to `localStorage` instantly — no Firebase rules needed.
- **Firebase** is used silently as a cloud backup when write permissions allow it.
- **Deleting** a destination removes it permanently from localStorage — it will never reappear.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by <a href="https://github.com/PrathamKhawani">Pratham Khawani</a></p>
