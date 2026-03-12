# Careflick Care Management Dashboard

A modern **Care Management Dashboard** built as part of the **Careflick Frontend Internship Assignment**.

The application allows caregivers or administrators to manage users and submit care-related forms through a responsive and intuitive dashboard interface.

---

## 🚀 Live Demo

https://care-management-dashboard-vercel.vercel.app

---

## 📂 GitHub Repository

https://github.com/Bhavish-gowda/care-management-dashboard

---

## 🧰 Tech Stack

- React
- TypeScript
- Vite
- TailwindCSS
- React Hook Form
- Context API
- Axios
- Lucide React Icons
- Vercel (Deployment)

---

## ✨ Features

### Users Management
- Fetch users from REST API
- Display users in responsive card layout
- Search users by **name or email**
- Add new users
- Edit user details
- Delete users
- View detailed user information in modal

### Care Forms
- Convert PDF care forms into web-based forms
- Health Assessment Form
- Incident Report Form
- Select a user before submitting forms
- Link form submissions to users
- Each user can have **multiple form submissions**

### Form Handling
- Built using **React Hook Form**
- Input validation
- Structured form sections
- Submission history stored in application state

### Bonus Enhancements
- Pagination for users
- Debounced search for better performance
- Form submission history
- Download submitted form data as JSON
- Toast notifications for actions
- Dark themed modern dashboard UI

---

## 📡 API Used

Users are fetched from:

https://jsonplaceholder.typicode.com/users

This API is **read-only**, so user creation, editing, and deletion are simulated using local state.

---

## 🧠 Application Architecture

src/
components/
layout/
users/
forms/
pages/
context/
hooks/
services/
types/
utils/

The application uses **Context API** for state management and **custom hooks** for cleaner logic separation.

---

## ⚙️ Installation & Setup

Clone the repository:

git clone https://github.com/Bhavish-gowda/care-management-dashboard.git

Navigate to the project folder:

cd care-management-dashboard

Install dependencies:

npm install

Run the development server:

npm run dev

Open in browser:

http://localhost:5173

---

## 🏗 Build for Production

npm run build

Preview production build:

npm run preview

---

## 📱 Responsive Design

The dashboard is fully responsive and works on:

- Desktop
- Tablet
- Mobile devices

---

## 📌 Assignment Notes

This project fulfills all the requirements mentioned in the Careflick Frontend Internship assignment:

- React + TypeScript
- Responsive UI
- REST API integration
- Form handling and validation
- User management
- Clean code structure
- GitHub repository
- Live deployed demo

---

## 👨‍💻 Author

Bhavish Gowda

GitHub:  
https://github.com/Bhavish-gowda
