# HimalayaStay AI

AI-assisted direct booking and guest experience management platform for rural homestays.

---

## Overview

HimalayaStay AI is a full-stack web application designed to help rural homestay owners manage their properties without relying completely on third-party booking platforms.

The platform provides room management, booking management, guest review management, and AI-powered insights to improve customer experience and support better business decisions.

---

## Features

* 🏡 Direct room booking system
* 🛏️ Room and property management
* 📅 Booking management dashboard
* ⭐ Guest review management
* 🤖 AI-powered review analysis (Gemini API - Planned)
* 📊 Owner dashboard with booking insights
* 📱 Fully responsive user interface

---

## Tech Stack

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS
* Shadcn UI
* Lucide React

### Backend

* Next.js API Routes
* REST API Architecture

### Database

* MongoDB (Planned - Week 5)

### Authentication

* NextAuth.js (Planned)

### AI

* Google Gemini API (Planned)

### Deployment

* Vercel

---

## Project Structure

```text
src/

├── app/
│   ├── api/
│   ├── admin/
│   ├── booking/
│   ├── stays/
│   ├── login/
│   └── page.jsx
│
├── components/
│
├── data/
│
├── lib/
│
├── middleware/
│
└── public/
```

---

## API Endpoints

### Rooms

* GET `/api/rooms`
* GET `/api/rooms/:id`
* POST `/api/rooms`
* PUT `/api/rooms/:id`
* DELETE `/api/rooms/:id`
* GET `/api/rooms/search?q=`

### Bookings

* GET `/api/bookings`

### Reviews

* GET `/api/reviews`

### AI (Mock)

* POST `/api/ai/analyze-review`

---

## Running the Project

### Clone Repository

```bash
git clone <repository-url>
cd himalayastay-ai
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a `.env.local` file in the project root.

Example:

```env
NEXT_PUBLIC_APP_NAME=HimalayaStay AI
```

### Run Development Server

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:3000
```

---

## Backend Development

The backend is implemented using **Next.js API Routes**.

Current implementation uses in-memory data for development.

Database integration with MongoDB will be added in the next phase.

---

## Roadmap

### ✅ Completed

* Next.js project setup
* Responsive frontend
* Component library
* Public pages
* Admin dashboard UI
* REST API structure
* CRUD API endpoints
* Frontend connected to API

### 🚧 In Progress

* MongoDB integration
* Authentication
* Booking workflow
* AI review analysis

### 📌 Planned

* Google Gemini integration
* Email notifications
* Image uploads (Cloudinary)
* Payment gateway
* Analytics dashboard

---

## License

This project is being developed as part of the **TBI-GEU Summer Internship Program 2026**.
