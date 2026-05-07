```markdown
# Team Task Manager

A full-stack web app to manage projects and tasks with role-based access.

## Live URL
https://assign.up.railway.app/login
backend-->https://assignement-production.up.railway.app/api/tasks

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Auth: JWT

## Features
- Signup / Login
- Admin can create and delete projects
- Create, assign, update and delete tasks
- Dashboard with task stats (todo, in-progress, done, overdue)
- Role-based access (Admin / Member)

## Setup

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

### .env (server)
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
```

## API Endpoints
| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/auth/signup | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/projects | Get all projects |
| POST | /api/projects | Create project |
| DELETE | /api/projects/:id | Delete project |
| GET | /api/tasks/all | Get all tasks |
| GET | /api/tasks/:projectId | Get tasks by project |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

## GitHub
https://github.com/ManavRastogi03/Assignement