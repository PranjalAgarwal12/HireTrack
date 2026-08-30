# 🚀 HireTrack – Recruitment Management System

HireTrack is a full-stack **Recruitment Management System built using the MERN Stack**. It is designed to streamline the hiring process by providing separate functionalities for recruiters and candidates.

The platform allows recruiters to manage job postings, applications, candidates, interviews, and hiring statuses, while candidates can browse jobs, apply for positions, upload resumes, and track their applications.

---

## ✨ Key Features

### 👨‍💼 Recruiter Module

* Secure recruiter registration and login
* Create, update, and delete job postings
* View candidate applications
* Search and filter candidates
* Shortlist candidates
* Update candidate hiring status
* Track recruitment progress through a dashboard

### 👨‍🎓 Candidate Module

* Candidate registration and login
* Browse available job opportunities
* Apply for jobs online
* Track application status
* Manage profile information

### 🔐 Authentication & Security

* JWT-based authentication
* Role-Based Access Control (RBAC)
* Separate access for Recruiters and Candidates
* Protected frontend routes
* Backend authentication middleware
* Role-based authorization
* Secure password handling

### 📊 Recruitment Management

* Centralized candidate management
* Job posting management
* Application tracking
* Candidate status management
* Recruitment progress tracking
* Recruiter dashboard

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **HTML**
* **CSS3**
* **JavaScript**
* **React Router**

### Backend

* **Node.js**
* **Express.js**
* **REST APIs**

### Database

* **MongoDB**
* **Mongoose**

### Authentication & Security

* **JSON Web Token (JWT)**
* **Authentication Middleware**
* **Role-Based Access Control**

### Tools

* **Git**
* **GitHub**
* **VS Code**
* **npm**

---

## 🏗️ System Architecture

HireTrack follows a client-server architecture based on the MERN stack.

```text
                 ┌───────────────────┐
                 │      User         │
                 │ Recruiter/Candidate│
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │   React.js        │
                 │    Frontend       │
                 └─────────┬─────────┘
                           │
                    HTTP/REST API
                           │
                           ▼
                 ┌───────────────────┐
                 │   Express.js      │
                 │   + Node.js       │
                 │    Backend        │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │    Mongoose       │
                 │       ODM         │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │     MongoDB       │
                 │     Database      │
                 └───────────────────┘
```

---

## 🔄 System Workflow

### Recruiter Workflow

1. Recruiter registers or logs into the system.
2. JWT authentication verifies the recruiter.
3. Recruiter creates and publishes job openings.
4. Candidates apply for available jobs.
5. Recruiter views received applications.
6. Recruiter searches and filters candidates.
7. Suitable candidates are shortlisted.
8. Candidate hiring status is updated throughout the recruitment process.
9. Recruiter manages the final selection decision.

### Candidate Workflow

1. Candidate registers or logs into the system.
2. Candidate browses available job opportunities.
3. Candidate views job details.
4. Candidate applies for a suitable position.
5. Candidate tracks the application status.
6. Candidate views interview details when scheduled.
7. Candidate receives updates regarding their recruitment status.

---

## 🔐 Authentication Flow

HireTrack uses **JWT-based authentication**.

```text
User Login
    ↓
Backend verifies credentials
    ↓
JWT Token Generated
    ↓
Token sent to Client
    ↓
Client stores authentication information
    ↓
Protected API Request
    ↓
Authentication Middleware
    ↓
JWT Verification
    ↓
Role/Authorization Check
    ↓
Access Granted / Denied
```

The frontend also uses protected routes to prevent unauthorized users from accessing restricted pages. However, frontend protection alone is not sufficient, so authentication and authorization are also performed on the backend.

---

## 📁 Project Structure

```text
HireTrack/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.js
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🎯 Objectives

* Simplify the recruitment process.
* Reduce manual hiring efforts.
* Provide centralized candidate and application management.
* Allow recruiters to efficiently manage job postings.
* Enable candidates to easily apply for jobs.
* Improve candidate tracking throughout the recruitment lifecycle.
* Provide secure role-based access to different users.

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/PranjalAgarwal12/Hiretrack-Recruitment-System.git

cd Hiretrack-Recruitment-System
```

### 2. Install Dependencies

For the backend:

```bash
cd server
npm install
```

For the frontend:

```bash
cd ../client
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory and configure the required environment variables such as:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Start the Backend

```bash
cd server
npm start
```

### 5. Start the Frontend

Open another terminal:

```bash
cd client
npm start
```

The application will run locally on the configured frontend and backend ports.

---

## 📂 Project Highlights

✅ Full-Stack MERN Application

✅ Recruiter and Candidate Modules

✅ JWT-Based Authentication

✅ Role-Based Access Control

✅ Protected Routes

✅ RESTful APIs

✅ Job Posting & Management

✅ Candidate Application Management

✅ Resume Upload

✅ Interview Scheduling

✅ Candidate Status Tracking

✅ MongoDB Database Integration

✅ Responsive User Interface

---

## 🔮 Future Enhancements

* Resume upload
* Automated email notifications
* Job recommendation system
* Automated candidate-job matching

---

## 👨‍💻 Author

**Pranjal Agarwal**

GitHub: **PranjalAgarwal12**

---
