# 🏨 Hotel Management System

A full-stack **Hotel Management Web Application** built with **Angular** (frontend) and **Spring Boot** (backend) using **Spring Data JPA** and **MySQL** as the database.  
The system supports **CRUD operations**, **user authentication (Login & Registration)**, and **online room booking with Razorpay payment gateway**.

---

## 🚀 Features

- 🔑 **User Authentication**
  - Register new users
  - Login & Logout
  - Session management using local storage

- 🏠 **Hotel Management**
  - Manage Rooms (Add / Update / Delete / View)
  - Booking functionality with check-in / check-out dates
  - Staff Management

- 💳 **Payments**
  - Integrated **Razorpay Payment Gateway**
  - Supports **UPI, Cards, Net Banking, and Wallets**
  - Secure and real-time transaction update

- 📊 **CRUD Operations**
  - Rooms
  - Bookings
  - Staff
  - Users

---

## 🛠️ Tech Stack

### Frontend
- Angular 
- HTML5, CSS3, TypeScript
-  Custom Styling

### Backend
- Java 17+
- Spring Boot
- Spring Data JPA
- REST APIs

### Database
- MySQL

### Payment Integration
- Razorpay Payment Gateway

---

## ⚙️ Installation & Setup

### Prerequisites
-  Angular CLI
- JDK 17+
- MySQL Server
- Maven
- IDEs: **VS Code** (Frontend) and **Eclipse  (Backend)

---

### 1️⃣ Backend Setup (Spring Boot)
1. Clone the repository and open the backend project in Eclipse.
2. Configure `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/hotel_db
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update

   # Razorpay Keys
   razorpay.key_id=your_key_id
   razorpay.key_secret=your_key_secret
