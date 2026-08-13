# Shuufare

A driver onboarding web application built with a React frontend and Node.js/Express backend.

## Project Structure

```
.
├── client/          # React + Vite + Tailwind CSS frontend
└── server/          # Express + Prisma + PostgreSQL backend
```

## Prerequisites

- Node.js >= 18
- PostgreSQL

---

## Client

### Tech Stack
- React 
- Vite
- Tailwind CSS
- React Router
- Axios
- i18next

### Setup

```bash
cd client
npm install
```

### Environment Variables

Create a `.env` file in the `client/` directory:

```
VITE_API_URL=http://localhost:5000
```

### Run Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## Server

### Tech Stack
- Express
- Prisma (PostgreSQL)
- Multer (file uploads)
- bcrypt / JWT
- express-session

### Setup

```bash
cd server
npm install
npx prisma generate
```

### Environment Variables

Create a `.env` file in the `server/` directory:

```
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/shuufare_db"
SESSION_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
```

### Run Database Migrations

```bash
npx prisma migrate dev
```

### Seed Admin

```bash
npm run seed:admin
```

### Run Development Server

```bash
npm run dev
```

---

## Docker

Run the full stack with Docker Compose:

```bash
docker-compose up --build
```

- Client: http://localhost
- Server: http://localhost:5000
- PostgreSQL: localhost:5432
