# EECS 4413 Project
For the development of the online store for electric vehicles, we have adopted a cloud-native multi-tier architecture to ensure scalability, maintainability, and performance. The system is divided into the following layers:

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
