# 📚 Minimal Library Management System - Backend

A RESTful API built using **TypeScript**, **Express.js**, and **MongoDB** for managing a library system. This backend powers a client-side React app, enabling book management, borrow tracking, and borrow summary generation.

> 🔗 [Live Server](https://library-server-one.vercel.app/)

---

## 🌟 Features

### 📘 Book Management
- Create, read, update, and delete books
- Auto-update availability based on book copies
- Pagination, filtering, and sorting support

### 🔄 Borrow Management
- Borrow books with due date and quantity validation
- Decrease available copies after each borrow
- Aggregate borrowed book data

---

## 🚀 Tech Stack

| Layer      | Technology        |
|------------|-------------------|
| Language   | TypeScript        |
| Runtime    | Node.js           |
| Framework  | Express.js        |
| Database   | MongoDB + Mongoose |
| Deployment | Vercel (Serverless) |

---

## 📂 Folder Structure (Simplified)

```
src/
├── app/
│   ├── controllers/    # Route handlers
│   ├── interfaces/     # Type definitions
│   ├── models/         # Mongoose schemas
├── app.ts              # Express app setup
├── server.ts           # Entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/rahmansadaf46/Level-2-Assignment-4-Backend.git
cd Level-2-Assignment-4-Backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### 4. Run in Development
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

### 6. Start Production Server
```bash
npm start
```

---

## 🌐 Live API

Base URL:
```
https://library-server-one.vercel.app/api
```

---

## 📘 Book Endpoints

### ✅ Create a Book
```
POST /api/books
```
```json
{
  "title": "1984",
  "author": "George Orwell",
  "genre": "FICTION",
  "isbn": "1234567890123",
  "description": "Dystopian novel",
  "copies": 5,
  "available": true
}
```

### 📄 Get All Books
```
GET /api/books?page=1&limit=5
```
> Optional Query Params:
- `filter` (by genre)
- `sortBy` (field)
- `sort` (`asc` or `desc`)
- `limit`, `page`

### 🔍 Get a Book by ID
```
GET /api/books/:id
```

### 📝 Update a Book
```
PUT /api/books/:id
```
```json
{
  "copies": 10
}
```

### ❌ Delete a Book
```
DELETE /api/books/:id
```

---

## 🔄 Borrow Endpoints

### ✅ Create a Borrow Entry
```
POST /api/borrow
```
```json
{
  "book": "BOOK_OBJECT_ID",
  "quantity": 1,
  "dueDate": "2025-12-31"
}
```

### 📊 Get Borrowed Summary
```
GET /api/borrow
```
```json
[
  {
    "book": {
      "title": "1984",
      "isbn": "1234567890123"
    },
    "totalQuantity": 3
  }
]
```

---

## 🧪 Validations & Rules

- **ISBN**: Must be 10 or 13 digits
- **Due Date**: Must be a future date
- **Copies**: Must be a positive number
- **Genres**:
  - FICTION
  - NON_FICTION
  - SCIENCE
  - HISTORY
  - BIOGRAPHY
  - FANTASY

---

## 📜 Scripts

| Command         | Description                  |
|----------------|------------------------------|
| `npm run dev`  | Run dev server with ts-node  |
| `npm run build`| Transpile TypeScript         |
| `npm start`    | Start production build       |
| `npm run lint` | Run ESLint checks            |

---

## 👨‍💻 Author

**Md. Sadaf Rahman**  
Full Stack Developer | [GitHub](https://github.com/rahmansadaf46)

---

## 🔗 Useful Links

- 🌐 [Live Client](https://library-client-nu.vercel.app/)
- 🌐 [Live API Server](https://library-server-one.vercel.app/)
- 💻 [Frontend Repo](https://github.com/rahmansadaf46/Level-2-Assignment-4-Frontend)
- 💻 [Backend Repo](https://github.com/rahmansadaf46/Level-2-Assignment-4-Backend)

---

## 📄 License

This project is part of a structured learning assignment. All code is original and plagiarism-free.
