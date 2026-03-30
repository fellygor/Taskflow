# 🚀 TaskFlow

TaskFlow is a modern task management web application that helps users organize, track, and manage their daily tasks efficiently. It provides a clean dashboard, authentication, and real-time task handling using Firebase.

🌐 **Live Demo:** https://taskflow-nu-nine.vercel.app/

---

## 📌 Features

* 🔐 User Authentication (Sign up & Login)
* 📝 Create, update, and delete tasks
* 📊 Dashboard with task overview
* ⏰ Track pending and completed tasks
* ☁️ Real-time database with Firebase
* 🎨 Responsive and modern UI
* * Dark mode toggle

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **Backend/Database:** Firebase (Firestore)
* **Authentication:** Firebase Auth
* **Deployment:** Vercel

---

## ⚙️ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Run the app locally:

```bash
npm run dev
```

---

## 🚀 Build for Production

```bash
npm run build
npm run preview
```

---

## 🔐 Environment Variables

This project uses environment variables for Firebase configuration.
Make sure to set them both locally and in your deployment platform.

⚠️ Do NOT commit your `.env` file to GitHub.

---

## 📁 Project Structure (Simplified)

```
src/
│── components/
│── pages/
│── firebase.js
│── App.jsx
│── main.jsx
```

## 💡 Future Improvements

* Task categories & tags
* Drag-and-drop task management (like ClickUp)
* Notifications & reminders
* Team collaboration features

---

## 👨‍💻 Author

**Felly Gor**

* GitHub: https://github.com/fellygor
* Portfolio: https://portfolio-website-sigma-jade-97.vercel.app/

---

## 📄 License

This project is open source and available under the MIT License.

---

## ⭐ Support

If you like this project, consider giving it a star ⭐ on GitHub!
