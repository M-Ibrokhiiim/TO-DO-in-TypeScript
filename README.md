# Notes Application

## Introduction

This is a full-stack **Notes Application** that allows users to create, read, update, and delete their notes. The application is built with a modern tech stack featuring a Node.js/Express backend and a React frontend.

---

## Features

- ✅ Create new notes
- ✅ View all notes
- ✅ Update existing notes
- ✅ Delete notes
- ✅ Mark notes as complete/incomplete
- ✅ Real-time UI updates
- ✅ Toast notifications for user feedback

---

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- File-based storage (JSON)

### Frontend
- React
- TypeScript
- Chakra UI
- React Toastify

---

## Installation & Setup

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js (v16 or higher)
- npm 

---

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Navigate to the backend directory** (if separated)
   ```bash
   cd backend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create environment file**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   The backend server will start on `http://localhost:3000`

---

### Frontend Setup

1. **Navigate to the frontend directory** (if separated)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

   The application will open automatically in your browser at `http://localhost:5173` (or the port shown in terminal)

---

## API Endpoints

### Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notes` | Get all notes |
| POST | `/notes/newTask` | Create a new note |
| PUT | `/notes/update/:id` | Update a note by ID |
| DELETE | `/notes/delete/:id` | Delete a note by ID |

---

## Project Structure

```
project-root/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── server.ts
│   |   └──DATA/ TASKS.json
│   ├── package.json
|   ├── tsconfig.json
│   └── .env
│
├── frontend/
│   ├── src/
|   |   ├── assets
│   │   ├── components/
│   │   ├── icons/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## Usage

1. **Adding a Note**: Type your note in the input field and click "Add" or press Enter
2. **Marking as Complete**: Click the checkbox next to any note
3. **Editing a Note**: Click the edit icon, modify the text, and click the check icon to save
4. **Deleting a Note**: Click the delete icon to remove a note

---

## Development Scripts

### Backend
```bash
npm run dev     # Start development server with hot reload 
```

### Frontend
```bash
npm run dev     # Start Vite development server
```
