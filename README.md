# CISE Group Assignment - Full Setup Instructions

This project consists of two parts:
1. **Frontend**: Built with Next.js (React framework)
2. **Backend**: Built with NestJS, using MongoDB as the database

Follow these instructions to set up and run the project locally.

---

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/cloud/atlas) (MongoDB Atlas or a local MongoDB instance)

---

## Project Setup

### 1. Clone the Repository

First, clone the repository from GitHub to your local machine:
- git clone https://github.com/your-username/CISE-group-3-.git

---

### 2. Backend Setup
2.1. Install Backend Dependencies
Navigate to the backend/ folder and install the dependencies using npm:
- cd backend
- npm install

2.2. Configure MongoDB for Backend
You need to set up your MongoDB connection. Follow these steps:
Create a .env file in the backend/ directory:
- touch .env
Inside the .env file, add the following:
- MONGODB_URI=mongodb+srv://mdd2557:group3@speed.docah.mongodb.net/?retryWrites=true&w=majority

2.3. Run the Backend
Once the configuration is set, start the backend server:
- npm run start
The backend server will run on http://localhost:8082 by default.

---

### 3. Frontend Setup
3.1. Install Frontend Dependencies
Navigate to the frontend/ folder and install the dependencies:
- cd ../frontend
- npm install

3.2. Configure the Frontend Environment
Set up the connection to the backend by creating a .env.local file in the frontend/ directory:
Create the .env file:
- touch .env
- MONGODB_URI=mongodb+srv://mdd2557:group3@speed.docah.mongodb.net/?retryWrites=true&w=majority

3.3. Run the Frontend
npm run dev

---

### Full Application Running
To run both the backend and frontend:
Start the backend by navigating to the backend/ folder and running:
- npm run start

Start the frontend by navigating to the frontend/ folder and running:
- npm run dev

### ADMIN LOGIN DETAILS:
- Email: admin@admin.com
- Password: admin

### ANALYST LOGIN DETAILS:
- Email: analyst@analyst.com
- password: analyst

### MODERATOR LOGIN DETAILS:
- Email: moderator@moderator.com
- Password: moderator













