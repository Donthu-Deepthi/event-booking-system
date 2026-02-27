# Event Booking System

## **Project Overview**
The **Event Booking System** is a web application that allows users to browse and book tickets for various events such as **music concerts, dance performances, singing shows, workshops, seminars, and art exhibitions**. Admins can manage event availability, pricing, and send notifications to users.  

This project is built using a **MERN-style stack** for frontend and backend integration.

---

## **Tech Stack**
- **Frontend:** React.js, HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB
- **Payment Integration:** Stripe

---

## **Features**
### **User Features**
- Browse events by category (Music, Dance, Theatre, Workshops, etc.)
- View detailed event information
- Secure ticket booking using Stripe (Test Mode)
- View booking history
- Receive notifications and confirmations

**Stripe Test Card:**
Card Number: 4242 4242 4242 4242
Expiry: 03/30
CVV: 123
ZIP: 12345

### **Admin Features**
- Add, update, delete events
- Set event pricing & availability
- View and manage user bookings
- Send notifications to users
- Monitor event schedule

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
```
---

# 📸 Screenshots

## Home Page
![Home](screenshots/Home.png)

## Login Page
![Login](screenshots/Login.png)

## Register Page
![Register](screenshots/Register.png)

## Events Listing
![Events](screenshots/Events.png)

---

![Events 2](screenshots/Events_2.png)

## Event Details
![Event Details](screenshots/Event_details.png)

## Payment Page
![Payment](screenshots/Payment.png)

## Booking Success
![Success](screenshots/Success.png)

## My Bookings
![My Bookings](screenshots/my_bookings.png)

## Notifications
![Notifications](screenshots/notifications.png)

## Admin Dashboard
![Admin Page](screenshots/Admin_Page.png)

## Event Creation (Admin)
![Event Creation](screenshots/events_creation.png)

## Event Schedule
![Event Schedule](screenshots/event_schedule.png)

## Responsive Designs
![Responsive 1](screenshots/responsive-1.png)

---

![Responsive 2](screenshots/responsive-2.png)

---

![Responsive 3](screenshots/responsive-3.png)

---

![Responsive 4](screenshots/responsive-4.png)

---

## **Installation & Setup**

### **Backend**
1. Navigate to the backend folder:
```bash
cd backend
```
2.Install dependencies
```bash
npm install
```
install all the dependencies mentioned in package.json file at backend folder.

3.Create a .env file
```bash
PORT=5000
MONGODB_URI=<your-mongodb-uri>
STRIPE_KEY=<your-stripe-test-key>
JWT_SECRET_KEy=mysecretkeyexample123
```
4.Start the backend server
```bash
node server.js
```
### **Frontend**
1. Navigate to the frontend folder:
```bash
cd frontend
```
2.Install dependencies:
```bash
npm install
```
3. Start the React app:
```bash
npm start
```
### Usage ###
1. Open the application in browser.
2. Register/Login as user.
3. Browse events.
4. Book tickets via Stripe test payment.
5. Admin can log in to manage events and view bookings.
