# EECS-4314 Project: YUNeedMoney💰🤑🤑

YUNeedMoney is a **finance management web application** designed to help users **track income and expenses, set budgets, and visualize spending habits**. By integrating **Plaid for dummy banking data** and **receipt scanning with Taggun**, YUNeedMoney simplifies financial management while ensuring a **secure and user-friendly experience**.

---

## **Features**
- **User Authentication** – Secure registration & login using **JWT**.
- **Transaction Tracking** – Users can:
  - Manually add expenses/income.
  - Upload CSV/Excel files for bulk imports.
  - Link bank accounts via **Plaid** for real-time updates.
- **Receipt Upload & Analysis** – Extract itemized spending details from receipts via **Taggun API**.
- **Budgeting & Reports** – Set budgets and generate **spending analysis charts**.
- **Geographic Spending Comparison** – Compare spending trends with users in similar locations.
- **Intuitive UI** – Built with **React & Tailwind CSS** for a seamless experience.

---

## **Tech Stack**
### **Frontend**  
- **Next.js (React framework)** – UI & routing  
- **Tailwind CSS** – Styling  
- **shadcn/ui** – UI components  

### **Backend**  
- **Node.js & Express** – API server  
- **MongoDB (Mongoose)** – Database  
- **JWT** – Secure user authentication  
- **Plaid API** – Dummy banking integration  
- **Taggun API** – Receipt scanning  

### **Deployment & Hosting**
- **AWS (EC2 & RDS)** – Cloud deployment  

---

## **Getting Started**
### **1️. Clone the Repository**
```sh
git clone https://github.com/MM120-i/EECS-4314.git
cd EECS-4314
```
### **2. Set up the Backend**
```sh
cd server
npm install
```
Start backend
```sh
npm run dev
```
### **3. Set up the Frontend**
```sh
cd client
npm install
npm run dev
```

### **Project Status: Under Development**
This project is **still in progress** and **not yet complete**. Some features may be missing or not fully functional, u know what I mean?
