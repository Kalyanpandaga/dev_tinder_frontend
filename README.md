# Dev Tinder – Frontend

Dev Tinder is a developer-focused matchmaking and networking application. This frontend is built using **React (Vite)** and styled with **TailwindCSS / DaisyUI**. It enables developers to create profiles, explore other developers, send connection requests, and chat in real-time.

---

## Live Demo

**[Live Demo ](https://dev-tinder-qyta.onrender.com)**

---

## Backend Repository

Backend API (Node.js + Express + MongoDB):  
**[Dev Tinder Backend](https://github.com/Kalyanpandaga/dev_tinder_backend)**

---

## Features

- **Authentication (HTTP-Only Cookies)**

  - Secure login and signup system.
  - Sessions maintained using HTTP-only cookies.

- **Profile Management**

  - Edit your profile (name, age, gender, description, profile picture).
  - Live preview of profile updates.

- **Developer Feed**

  - View profiles of other developers.
  - Send **Interested** or **Ignored** responses.

- **Requests**

  - View incoming connection requests from other developers.
  - Accept or reject requests.

- **Connections & Real-Time Chat**

  - Once accepted, both users become connected.
  - Chat with connected developers using **Socket.IO**.

- **Responsive Design**
  - Cards switch between stacked (mobile) and side-by-side (desktop) layouts.

---

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS + DaisyUI
- **Routing**: React Router
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Real-time**: Socket.IO (via backend)

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/Kalyanpandaga/dev_tinder_frontend
cd dev_tinder_frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the project root:

```env
VITE_BACKEND_SERVER_URL=<Your Backend Server URL>
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

---

---

## API Integration

- Communicates with the backend via `VITE_BACKEND_SERVER_URL` (from `.env`).
- Authentication uses **HTTP-only cookies** for security.
- Real-time chat is implemented via **Socket.IO**.

---
