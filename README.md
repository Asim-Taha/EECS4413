# EECS 4413 – E-Commerce Electric Vehicle Store

This is a full-stack e-commerce web application for browsing, filtering, customizing, and purchasing electric vehicles. Built using Node.js, Express, MongoDB, and React.

------------------------------------------------------------
## 🚀 How to Run the App (Local Setup)

1. Clone the Repository
   git clone https://github.com/Asim-Taha/EECS4413.git
   cd EECS4413

------------------------------------------------------------
## 🔧 Backend Setup

2. Navigate to the Server Directory
   cd server

3. Install Dependencies
   npm install

4. Create a `.env` File in the Server Directory with:
   PORT=8080
   SERVER_URL="http://localhost:8080/"
   DB_URI="mongodb+srv://tasim8321:Tahaasim123@cluster0.ukfww.mongodb.net/"
   JWT_SECRET="HHDdPXWXJ45c4Mww+jGp8Y6Djltqd5P7hVQo29hNAkA="
   JWT_EXPIRES_IN="1d"

5. Run the Server
   npm run dev

   The backend server will start on http://localhost:8080

------------------------------------------------------------
## 💻 Frontend Setup (React)

6. Navigate to the Frontend Folder
   cd ../client

7. Install Frontend Dependencies
   npm install

8. Create a `.env.local` File in the Client Directory with:
   NEXTAUTH_URL="http://localhost:3000/"
   NEXT_PUBLIC_BACKEND_URL="http://localhost:8080/api"
   AUTH_SECRET="bGVluLMxwgJYuzUiM3vep9CGbMcndZW1bQ3ropOKPFA="

9. Start the React App
   npm run dev

   The frontend will open at http://localhost:3000

------------------------------------------------------------
## 🌐 Features

- View and filter electric vehicles
- Add to cart and manage cart items
- Calculate loan payments
- Login / Register with JWT authentication
- Admin reports and user reviews
- MongoDB Atlas cloud storage

------------------------------------------------------------
## 🧪 Optional Testing 

   npm test

------------------------------------------------------------
## 📂 Project Structure 

/server <br>
  /controllers <br>
  /models <br>
  /routes<br>
  /middleware<br>
  server.js<br>
  .env<br>
<br>
/client<br>
  /src<br>
    /components<br>
    /pages<br>
    App.js<br>
  .env.local<br>

------------------------------------------------------------
## 📬 Group members

This project was built as part of EECS 4413 - Web Development<br>
Adil Guluzade <br>
Taha Asim<br>
Hulya Yasar<br>
Amir Ahmadnasab<br>

------------------------------------------------------------
**Presentation Layer (Front-end):**
Developed using HTML/CSS and JavaScript, communicating with the backend through RESTful API calls. This layer is responsible for rendering the UI, capturing user input, and interacting with backend services.

**Business Logic Layer (Back-end):**
Implemented using Node.js with Express.js. This layer handles application logic, processes client requests, manages user authentication.

**Data Layer:**
A cloud-hosted NoSQL database (MongoDB Atlas) is used to store vehicle data, user accounts. Mongoose ODM is used to define schemas and interact with MongoDB securely and efficiently.

**Middleware & API Gateway:**
The system uses JWT-based middleware for authentication and session management, ensuring secure access to protected resources. RESTful APIs serve as an intermediary between the front-end and back-end components, enabling modular and scalable communication.

**Deployment Infrastructure:**
All backend services will be deployed using AWS
