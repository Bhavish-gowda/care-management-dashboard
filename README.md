# 🏥 Careflick Care Management Dashboard

A modern **Care Management Dashboard** built as part of the **Careflick Frontend Internship Assignment**.

This application allows caregivers or administrators to manage users and submit care-related forms through a responsive and intuitive dashboard interface. It demonstrates modern frontend development practices using **React, TypeScript, Context API, and TailwindCSS** while following clean architecture and modular design principles.

--------------------------------------------------

## 🚀 Live Demo

https://care-management-dashboard-vercel.vercel.app

--------------------------------------------------

## 📂 GitHub Repository

https://github.com/Bhavish-gowda/care-management-dashboard

--------------------------------------------------

## 🧰 Tech Stack

⚛️ React  
📘 TypeScript  
⚡ Vite  
🎨 TailwindCSS  
📋 React Hook Form  
🧠 Context API (State Management)  
🌐 Axios (API Integration)  
🎯 Lucide React Icons  
☁️ Vercel (Deployment)

--------------------------------------------------

# ✨ Key Features

--------------------------------------------------

## 👥 User Management

The **Users tab** allows full user management.

### 🔄 Fetch Users

Users are fetched from the public API:

https://jsonplaceholder.typicode.com/users

### 🧾 Display Users

Users are displayed in **responsive cards**.

Each card shows:

✔ Name  
✔ Email  
✔ Phone  

Cards adapt properly for **mobile and desktop screens**.

### 🔎 Search Functionality

Users can be searched by **Name or Email**.

✔ Dynamic search results  
✔ Debounced search for better performance  
✔ Instant filtering while typing

### 🪪 User Detail Modal

Clicking a user card opens a detailed modal showing:

✔ Name  
✔ Email  
✔ Phone  
✔ Address  
✔ Company details  
✔ Submitted care forms

--------------------------------------------------

# ⚙️ User CRUD Operations

### ➕ Add User

Users can be added using a form with required fields:

✔ Name  
✔ Email  
✔ Phone

### ✏️ Edit User

Users can **edit existing user information** directly from the modal.

Editable fields:

✔ Name  
✔ Email  
✔ Phone

### 🗑 Delete User

Users can be removed from the dashboard.

Since the API is **read-only**, all CRUD actions are simulated using **local application state**.

--------------------------------------------------

# 📋 Care Forms

The **Care Forms tab** converts the provided PDF forms into interactive web forms.

### 🩺 Health Assessment Form

Allows caregivers to record:

✔ Resident details  
✔ Vital signs  
✔ Symptoms observed  
✔ Daily activities  
✔ Meals consumed  
✔ Caregiver notes  
✔ Caregiver signature

### ⚠️ Incident Report Form

Allows recording:

✔ Resident information  
✔ Incident type  
✔ Incident description  
✔ Actions taken  
✔ Follow-up notes

--------------------------------------------------

# 🔄 Form Submission Flow

1️⃣ Select a user  
2️⃣ Fill out form fields  
3️⃣ Submit the form  

After submission:

✔ Form is linked to the selected user  
✔ Appears in the user's **Submitted Care Forms list**  
✔ Each user can have **multiple submitted forms**

--------------------------------------------------

# 📥 Download Submitted Forms

Each submitted care form can be downloaded as a **JSON file**.

Example:

health-assessment-1700000000.json

This feature enables **easy export and data sharing**.

--------------------------------------------------

# 🕘 Form Submission History

Inside the **User Modal**, all submitted forms are displayed.

Each entry includes:

✔ Form type  
✔ Resident name  
✔ Submission date  
✔ Notes preview  
✔ Download JSON option

--------------------------------------------------

# 📊 Dashboard Statistics

The **Users page dashboard** shows quick insights:

📈 Total Users  
📄 Total Forms Submitted  
🩺 Health Assessments  
⚠️ Incident Reports  

These summary cards provide a **quick system overview**.

--------------------------------------------------

# ⚡ Enhanced User Experience

### 🧊 Skeleton Loading UI

While users are being fetched from the API, skeleton cards appear.

Benefits:

✔ Smooth loading experience  
✔ No layout shift  
✔ Better perceived performance  
✔ Modern professional UI

--------------------------------------------------

# ✔ Form Validation

Forms are validated using **React Hook Form**.

Validation includes:

✔ Required fields  
✔ Valid email format  
✔ Valid phone number format  
✔ Mandatory user selection

Error messages appear clearly under each input.

--------------------------------------------------

# 🧠 State Management

Application state is managed using **React Context API**.

Contexts used:

✔ UsersContext  
✔ FormsContext

This ensures:

✔ Shared global state  
✔ Cleaner architecture  
✔ Easier scalability

--------------------------------------------------

# 🪝 Custom Hooks

Custom hooks used in the project:

🔹 useUsers() → Handles user fetching logic  
🔹 useDebounce() → Optimizes search performance

--------------------------------------------------

# ⚡ Performance Improvements

### 🕐 Debounced Search

Prevents unnecessary filtering while typing.

### 📄 Pagination

User list is paginated to keep UI clean and manageable.

--------------------------------------------------

# 🎨 UI / UX Design

The dashboard features a modern **dark theme UI** with:

✔ Clean card layouts  
✔ Responsive grid system  
✔ Interactive modals  
✔ Smooth hover animations  
✔ Skeleton loading states  
✔ Consistent spacing and typography

The design focuses on **clarity, usability, and modern SaaS dashboard aesthetics**.

--------------------------------------------------

# 🌐 API Used

Users are fetched from:

https://jsonplaceholder.typicode.com/users

Since the API is **read-only**, user creation, editing, and deletion are handled using **local state**.

--------------------------------------------------

# 🏗 Project Architecture

src  
components  
layout  
users  
forms  
pages  
context  
hooks  
services  
types  
utils  

The architecture ensures:

✔ Modular components  
✔ Clean separation of concerns  
✔ Easy scalability

--------------------------------------------------

# ⚙️ Installation & Setup

Clone the repository

git clone https://github.com/Bhavish-gowda/care-management-dashboard.git

Navigate to project folder

cd care-management-dashboard

Install dependencies

npm install

Run development server

npm run dev

Open in browser

http://localhost:5173

--------------------------------------------------

# 🏗 Build for Production

Build the project

npm run build

Preview production build

npm run preview

--------------------------------------------------

# 📱 Responsive Design

The dashboard works seamlessly on:

💻 Desktop  
📱 Mobile  
📟 Tablet

--------------------------------------------------

# 📌 Assignment Completion

This project fulfills all requirements of the **Careflick Frontend Internship Assignment**, including:

✔ React + TypeScript  
✔ Responsive UI  
✔ REST API integration  
✔ User CRUD operations  
✔ Form handling and validation  
✔ Linking forms to users  
✔ Clean project structure  
✔ GitHub repository submission  
✔ Live deployed demo

Additional improvements implemented:

⭐ Pagination  
⭐ Debounced search  
⭐ Skeleton loading UI  
⭐ Dashboard statistics  
⭐ JSON export of forms  
⭐ Improved validation  
⭐ Enhanced UI/UX

--------------------------------------------------

# 👨‍💻 Author

Bhavish Gowda

🔗 GitHub  
https://github.com/Bhavish-gowda
