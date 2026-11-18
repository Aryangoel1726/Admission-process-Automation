# Admission Process Automation

> 🚧 **Status: Work in Progress** — This project is under active development.

An end-to-end web application to automate the college/university admission process — from student registration and document upload to admin review and merit-list generation.

## 🎯 Project Goals

- **Eliminate manual paperwork** in the admission pipeline
- **Streamline** student registration, document verification, and fee payment
- **Auto-generate merit lists** based on configurable criteria
- **Provide dashboards** for students, admins, and department heads

## 🏗️ Architecture

```
┌─────────────┐       ┌──────────────┐       ┌────────────┐
│   Frontend   │◄─────►│  Backend API │◄─────►│  Database   │
│  (HTML/CSS/  │       │  (Express.js)│       │ (MongoDB)   │
│  JavaScript) │       └──────────────┘       └────────────┘
└─────────────┘
```

## 📂 Project Structure

```
Admission-process-Automation/
├── backend/
│   ├── config/           # DB & app configuration
│   ├── controllers/      # Route handler logic
│   ├── middleware/        # Auth & validation middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express route definitions
│   ├── utils/            # Helper utilities
│   ├── server.js         # App entry point
│   └── package.json
├── frontend/
│   ├── css/              # Stylesheets
│   ├── js/               # Client-side scripts
│   ├── pages/            # HTML pages
│   └── index.html        # Landing page
├── docs/                 # Documentation & diagrams
├── .env.example          # Environment variable template
├── .gitignore
└── README.md
```

## ✅ Completed

- [x] Project scaffolding & folder structure
- [x] Database schema design (Student, Application, Admin)
- [x] Student registration & login API
- [x] Application submission API
- [x] Frontend — Landing page & registration form
- [x] Auth middleware (JWT)

## 🔲 To Do

- [ ] Document upload & storage (Multer / Cloud)
- [ ] Admin dashboard — review & approve/reject applications
- [ ] Merit list generation algorithm
- [ ] Email / SMS notifications
- [ ] Fee payment integration
- [ ] Role-based access control (Student / Admin / Super Admin)
- [ ] Reporting & analytics dashboard
- [ ] Unit & integration tests
- [ ] CI/CD pipeline
- [ ] Deployment (Docker + cloud hosting)

## 🛠️ Tech Stack

| Layer       | Technology              |
|-------------|-------------------------|
| Frontend    | HTML, CSS, JavaScript   |
| Backend     | Node.js, Express.js     |
| Database    | MongoDB + Mongoose      |
| Auth        | JWT (JSON Web Tokens)   |
| File Upload | Multer *(planned)*      |
| Deployment  | Docker *(planned)*      |

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB** (local or Atlas)

### Installation

```bash
# Clone the repo
git clone https://github.com/Aryangoel1726/Admission-process-Automation.git
cd Admission-process-Automation

# Install backend dependencies
cd backend
npm install

# Create .env from template
cp ../.env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start the server
npm run dev
```

Then open `frontend/index.html` in your browser (or serve via Live Server).

## 📄 License

MIT © 2026 Aryan Goel
