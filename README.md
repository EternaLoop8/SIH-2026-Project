# SIH-2026-Project
# Local Tourism Platform

A modern Node.js and Express REST API built with MongoDB and Mongoose to power a comprehensive local tourism platform. This service allows users to discover local attractions, view guided tour itineraries, check business operating hours, and find regional events.

## Features
- **Local Attractions Discovery:** Explore regional highlights, parks, museums, and landmarks.
- **Robust Configuration Management:** Fail-safe environment checking using custom safety guards.
- **Secure Architecture:** Built-in support for JSON Web Tokens (JWT) and modern ES Module integration.

---

## Technical Stack
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js (v5.x)
- **Database:** MongoDB Atlas via Mongoose
- **Process Manager:** Nodemon (Development)

---

## Getting Started

Follow these step-by-step instructions to initialize the project, configure environment variables, and install the necessary dependencies on your local machine.

### 1. Clone or Set Up Your Project Directory
Ensure your folder structure is organized cleanly as follows:
```text
├── src/
│   ├── config/
│   │   ├── config.js
│   │   └── db.js
│   └── app.js
├── .env
├── server.js
└── package.json
```

### 2. Install Dependencies
Open your terminal in the root directory of the project and run the following command to install all production and development dependencies listed in `package.json`:
```bash
npm install
```
This will automatically install:
- **Production (`dependencies`):** `express`, `mongoose`, `dotenv`, `cors`, and `axios`.
- **Development (`devDependencies`):** `nodemon`.

### 3. Configure Environment Variables
Create a file named `.env` in the root folder of your project (at the same level as `server.js`). Add the following keys with your specific details:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.7iqfkgu.mongodb.net/local_tourism_db?appName=Cluster0
JWT_SECRET_KEY=your_super_secure_random_secret_key_here
```
> ⚠️ **Important:** Replace `<username>` and `<password>` with your secure credentials from the MongoDB Atlas Dashboard. Ensure you include a database name (like `local_tourism_db`) directly before the `?` character so Mongoose initializes properly. 
> 
> *Make sure your network access IP whitelist in MongoDB Atlas is configured to allow access from your current location or anywhere (`0.0.0.0/0`).*

### 4. Run the Project

To launch the project in development mode with live-reloading enabled via **Nodemon**, execute:
```bash
npm run dev
```

To run the server in a standard production environment without live-reloading, run:
```bash
npm start
```

Upon a successful launch, your terminal output will display:
```text
[nodemon] starting `node server.js`
Server is running on port 3000
Connected to DB
```