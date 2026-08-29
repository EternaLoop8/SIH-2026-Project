# SIH 2026 Project
---
# Local Tourism Platform

A full-stack web application designed to help users explore local tourist attractions, find events, and manage travel spots. This project is built using a decoupled architecture with a **React frontend** and a **Node.js / Express backend** powered by **MongoDB Atlas**.

---

## Tech Stack

- **Frontend:** React, Axios (for API requests), React Router DOM, CSS / Tailwind CSS
- **Backend:** Node.js, Express.js, Mongoose (MongoDB ODM)
- **Database:** MongoDB Atlas (Cloud Database)
- **Authentication:** JSON Web Tokens (JWT)

---

## Project Structure

```text
local-tourism-platform/
├── server(backend)/
│   ├── src/
│   │   ├── config/
│   │   │   ├── config.js
│   │   │   └── db.js
│   │   └── app.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── client(frontend)/
    ├── public/
    ├── src/
    │   ├── assets/       
    │   ├── components/    
    │   ├── pages/         
    │   ├── services/      
    │   ├── App.jsx        
    │   └── main.jsx       
    ├── .gitignore
    ├── package.json
    └── README.md
```

---

## How to Fetch the Project

If you are setting this project up for the first time, or need to pull down updates from a team repository, use the following Git commands in your terminal:

### 1. Download the Project (First Time Only)
To download a complete copy of the repository onto your local computer, use `git clone`:
```bash
git clone https://github.com/EternaLoop8/SIH-2026-Project.git
```
After cloning, always make sure to move into the newly created project folder:
```bash
cd local-tourism-platform
```

### 2. Fetch the Latest Updates (For Existing Setups)
If you or your teammates have pushed new changes to GitHub and you need to update your local files, run:
```bash
git fetch origin
```
*Note: `git fetch` safely downloads the latest history from GitHub without overwriting your current code.*

### 3. Pull the Changes into Your Active Branch
To merge those downloaded changes directly into your active working branch (e.g., `main`), run:
```bash
git pull origin main
```

---

## Installation & Setup

### 1. Backend Setup
1. Navigate into the backend directory:
   ```bash
   cd server
   ```
2. Install all required backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of your `backend/` folder:
   ```bash
   touch .env
   ```
4. Open the `.env` file and populate it with your environment variables (replace the placeholders with your real database credentials):
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.7iqfkgu.mongodb.net/local_tourism_db?appName=Cluster0
   JWT_SECRET_KEY=your_super_secret_jwt_string_here
   ```

### 2. Frontend Setup
1. Open a new terminal window, navigate back to the project root, and go into the frontend directory:
   ```bash
   cd client
   ```
2. Install all required frontend base packages and framework wrappers specified in your project template:
   ```bash
   npm install
   ```
3. If setting up manually or updating, ensure you have the core application dependencies for routing and API management installed:
   ```bash
   npm install react-router-dom axios
   ```

---

## Running the Application

### Start the Backend
From inside the `backend/` directory, run the development server with Nodemon tracking:
```bash
npm run dev
```
*Expected Terminal Output:*
```text
[nodemon] starting `node server.js`
Connected to DB
Server is running on port 3000
```

### Start the Frontend
From inside the `frontend/` directory, spin up the local development interface:
```bash
npm run dev
```
*(Or use `npm start` depending on your template package initialization scripts).* 

Your browser should automatically load and display the application interface home screen at `http://localhost:5173` (Vite default) or `http://localhost:3000` (Create React App default).

---

## Security Practices

- **Never Commit Secrets:** The `.env` file contains your production database credentials and is explicitly blocked from Git via the `.gitignore` configuration rules.
- **Network Whitelisting:** Remember to whitelist your active local IP address inside the MongoDB Atlas Network Access configurations module before attempting to start the server.
