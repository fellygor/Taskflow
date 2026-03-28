🚀 Getting Started
Prerequisites
Node.js (v18+)

A Firebase Project

Installation
Clone the repo

Bash
git clone https://github.com/fellygor/TaskFlow.git
cd TaskFlow
Install dependencies

Bash
npm install
Set up Environment Variables
Create a .env file in the root and add your Firebase config:

Code snippet
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
Run Development Server

Bash
npm run dev
📂 Project Structure
Plaintext
src/
 ├── components/     # Reusable UI (Button, Input, Toast, Spinner)
 ├── context/        # Auth & Theme Context Providers
 ├── pages/          # Dashboard, Login, Signup, Splash
 ├── firebase.js     # Firebase initialization
 └── index.css       # Tailwind 4.0 configuration & Global styles