👇

📌 Project MultiRole

A Fullstack Web Application with multi-role authentication (Admin & User).
Built with React + Redux Toolkit + TailwindCSS for the frontend, and Express + Sequelize (MySQL) for the backend.

📂 Project Structure
Project_MultiRole/
│
├── Backend/               # Backend API (Express + Sequelize)
│   ├── controllers/       # Business logic for routes
│   ├── database/          # Database configuration
│   ├── middleware/        # Auth/session middleware
│   ├── models/            # Sequelize models
│   ├── routes/            # API endpoints
│   ├── index.js           # Backend entry point
│   ├── package.json       
│
├── Frontend/              # Frontend (React + Vite + TailwindCSS)
│   ├── public/            # Static assets
│   ├── src/               
│   │   ├── app/           # Redux store setup
│   │   ├── auth/          # Authentication slice (Redux Toolkit)
│   │   ├── component/     # Reusable components
│   │   ├── pages/         # Main pages (Login, Dashboard, CRUD, etc.)
│   │   ├── App.jsx        # Root app
│   │   ├── main.jsx       # React entry point
│   ├── package.json       
│
└── README.md

🚀 Backend Setup
🔧 Dependencies
"dependencies": { 
  "argon2": "^0.44.0",
  "connect-session-sequelize": "^8.0.2",
  "cors": "^2.8.5",
  "dotenv": "^17.2.2",
  "express": "^5.1.0",
  "express-session": "^1.18.2",
  "mysql2": "^3.14.5",
  "sequelize": "^6.37.7"
}

⚙️ Installation
cd Backend
npm install

▶️ Run Backend
npm start


The backend runs at http://localhost:5000

🎨 Frontend Setup
🔧 Dependencies
"dependencies": {
  "@reduxjs/toolkit": "^2.9.0",
  "@tailwindcss/vite": "^4.1.13",
  "axios": "^1.12.1",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-icons": "^5.5.0",
  "react-redux": "^9.2.0",
  "react-router-dom": "^7.9.1",
  "tailwindcss": "^4.1.13"
}

⚙️ Installation
cd Frontend
npm install

▶️ Run Frontend
npm run dev


The frontend runs at http://localhost:5173

🔑 Features

✅ Authentication with hashed passwords (argon2)

✅ Role-based access control (Admin / User)

✅ Session management (express-session + sequelize)

✅ CRUD for Users & Products

✅ Protected routes with React Router + Redux

✅ Responsive UI with TailwindCSS

🛠️ Tech Stack

--- Frontend ---

- React

- Redux Toolkit

- React Router DOM

- TailwindCSS

- Axios

--- Backend ---

- Express

- Sequelize ORM

- MySQL

- Argon2 (password hashing)

- Express-session + connect-session-sequelize

📜 License

MIT License
