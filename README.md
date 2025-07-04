# 📚 Library Management API

This is a RESTful API built with TypeScript, Express.js, and MongoDB for managing a library system. It includes features for handling books and borrowing records.

---

## 🚀 Features

- Add, update, delete, and retrieve books
- Borrow books with due date validation
- Automatic availability updates based on quantity
- Aggregate borrowed data with book info

---

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Deployment:** Vercel (Serverless)

---

## 📂 Project Structure

```
src/
├── app/
│   ├── controllers/
│   ├── interfaces/
│   ├── models/
├── app.ts
├── server.ts
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/rahmansadaf46/Level-2-Assignment-3.git
cd Level-2-Assignment-3
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file in the root directory:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

> Replace `your_mongodb_connection_string` with your actual MongoDB URI.

### 4. Run Locally (Development)

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

## 🌐 Live Demo

Deployed on Vercel:  
🔗 **[https://level-2-assignment-3-one.vercel.app/](https://level-2-assignment-3-one.vercel.app/)**

---

## 📘 API Documentation

### Base URL
```
https://level-2-assignment-3-one.vercel.app/api
```

---

### 📚 Books

#### ✅ Create a Book

```
POST /api/books
```

**Body:**
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

#### 📄 Get All Books

```
GET /api/books?filter=FICTION&sortBy=title&sort=asc&limit=10
```

> Optional query params:
- `filter` (by genre)
- `sortBy` (field)
- `sort` (`asc` | `desc`)
- `limit` (number)

#### 🔍 Get a Book by ID

```
GET /api/books/:id
```

#### 📝 Update a Book

```
PUT /api/books/:id
```

**Body:** (any fields you want to update)

```json
{
  "copies": 10
}
```

#### ❌ Delete a Book

```
DELETE /api/books/:id
```

---

### 🔄 Borrow Books

#### ✅ Create a Borrow Entry

```
POST /api/borrow
```

**Body:**
```json
{
  "book": "BOOK_OBJECT_ID",
  "quantity": 1,
  "dueDate": "2025-12-31"
}
```

#### 📊 Get Borrowed Summary

```
GET /api/borrow
```

**Response:**
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

## ❗ Validations

- **ISBN:** Must be 10 or 13 digits, numbers only.
- **Due Date:** Must be a future date.
- **Copies:** Must be a positive number.
- **Genres:**
  - FICTION
  - NON_FICTION
  - SCIENCE
  - HISTORY
  - BIOGRAPHY
  - FANTASY

---

## 📌 Scripts

| Command         | Description                  |
|----------------|------------------------------|
| `npm run dev`  | Run dev server with ts-node  |
| `npm run build`| Transpile TypeScript         |
| `npm start`    | Start built server           |
| `npm run lint` | Run ESLint                   |


## 📄 License

This project is open-source and available under the [ISC License](LICENSE).
