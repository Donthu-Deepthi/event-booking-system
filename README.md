# Event Booking System

## **Project Overview**
The **Event Booking System** is a web application that allows users to browse and book tickets for various events such as **music concerts, dance performances, singing shows, workshops, seminars, and art exhibitions**. Admins can manage event availability, pricing, and send notifications to users.  

This project is built using a **MERN-style stack** for frontend and backend integration.

---

## **Tech Stack**
- **Frontend:** React.js, HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (NoSQL) for CRUD operations  
- **Tools:** GitHub, VS Code, Postman, Figma  
- **Other Practices:** SQL, SDLC, Object-Oriented Programming, DBMS  

---

## **Features**
### **User Features**
- Browse available events by category: Music, Dance, Singing, Theatre, Workshop, Art Exhibition  
- Book tickets securely using Stripe/PayPal (demo/test keys only)  
- Receive booking confirmations and event notifications  

### **Admin Features**
- Manage events: add, update, delete events  
- Set pricing and availability for each event  
- Monitor bookings and manage users  
- Send notifications/reminders to users  

---

## **Project Structure**
```text
event-booking-system/
│
├── backend/                  # Node.js + Express backend
│   ├── models/               # Database schemas
│   ├── routes/               # API routes
│   ├── controllers/          # Business logic
│   ├── .gitignore            # Excludes .env & node_modules
│   └── .env                  # Environment variables (not tracked)
│
├── frontend/                 # React frontend
│   ├── public/               # HTML files and assets
│   ├── src/                  # React components, pages, API files
│   ├── package.json          # Project dependencies
│   └── package-lock.json
│
└── README.md                 # Project documentation
