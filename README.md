# ✦ TrackStack

> A modern, responsive project and task management dashboard built with React.

TrackStack is a frontend productivity dashboard designed to help developers organize projects, monitor progress, and manage tasks from a single workspace.

The project focuses on a clean, premium dark-themed interface with reusable React components, responsive layouts, interactive task management, and clear visual progress indicators.

---

## ✨ Features

### 📊 Dashboard

- Overview of total projects and tasks
- Completed task statistics
- Overall project progress
- Active project cards
- Recent task section
- Task search
- Task status filtering
- Interactive task status updates

### 📁 Project Management

- Project overview cards
- Project progress indicators
- Project status information
- Create Project modal
- Dedicated Projects page

### ✅ Task Management

- Task cards
- Task priority indicators
- Task due dates
- Task status indicators
- Create Task modal
- Interactive task status changes
- Todo / In Progress / Completed filtering

### 🎨 UI / UX

- Premium dark theme
- Glassmorphism-inspired cards
- Subtle glowing effects
- Star-inspired decorative elements
- Responsive design
- Mobile-friendly layouts
- Loading state
- Empty state
- Error state
- Consistent visual hierarchy

### 🧭 Navigation

- Dashboard
- Projects
- Tasks
- Profile
- Active navigation states
- Client-side routing using React Router

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Development and build tooling |
| React Router | Client-side navigation |
| Tailwind CSS | Styling and responsive design |
| Lucide React | Icons |
| JavaScript | Application logic |
| ESLint | Code quality |

---

## 📂 Project Structure

```text
TrackStack/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateProjectModal.jsx
│   │   │   ├── CreateTaskModal.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── TaskCard.jsx
│   │   │
│   │   ├── data/
│   │   │   └── mockData.js
│   │   │
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Tasks.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── eslint.config.js
│
├── .gitignore
└── README.md




🚀 Getting Started
Prerequisites

Make sure you have installed:

Node.js
npm
Git
Clone the repository
git clone <your-github-repository-url>
cd TrackStack
Navigate to the frontend
cd frontend
Install dependencies
npm install
Start the development server
npm run dev

The application will be available at the local URL shown in your terminal.

🧪 Code Quality

Run ESLint with:

npm run lint

The project is maintained with ESLint for consistent and maintainable code.

🏗️ Production Build

To create a production build:

npm run build

The production build is generated inside:

frontend/dist/
🖥️ Application Pages
Dashboard

The main workspace provides:

Productivity overview
Project statistics
Active projects
Recent tasks
Search and filtering
Task status management
Projects

Provides a dedicated view for managing projects and creating new projects.

Tasks

Provides a dedicated task management view with task creation functionality.

Profile

Provides a basic user profile overview.

🎯 Current Scope

This version focuses on the frontend implementation of TrackStack.

Project and task information currently uses local mock data. Interactive state changes are maintained on the client side.

Backend persistence, authentication, database integration, and deployment can be added in subsequent development phases.

🔮 Future Improvements

Planned improvements include:

FastAPI backend
REST API integration
PostgreSQL database
User authentication
Persistent project and task data
User-specific workspaces
Project creation and editing through the API
Task CRUD operations
Deployment
Production environment configuration
👩‍💻 Author

Tiyasa Mandal

Built as part of the Full Stack Development Internship at Innovation Hacks.