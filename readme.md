# 📚 Library Management API

A complete RESTful API built with **Express**, **TypeScript**, **MongoDB**, and **Mongoose** to manage books and borrowing functionality in a library system.

---

## 🚀 Features

- ✅ Add, retrieve, update, and delete books.
- 📚 Borrow books with validation.
- 📊 Aggregated summary of all borrowed books.
- 🛡️ Zod + Mongoose validation with consistent API responses.
- ⚙️ Modular, scalable project structure.

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── controllers/        # Route logic
│   ├── interfaces/         # TypeScript interfaces
│   ├── middlewares/        # Custom middleware functions
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routing
│   ├── utils/              # Shared utility functions
│   └── validationSchema/   # Zod validation schemas
├── app.ts                  # App initialization
└── server.ts               # Entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/Library-Management-API.git
cd Library-Management-API
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root:

```ini
PORT=3000
MONGODB_USERNAME=your_username
MONGODB_PASSWORD=your_password
```

Mongo URI is handled internally via these variables.

### 4. Start the Server

```bash
npm run dev  # For development using ts-node-dev
# or
npm run build && npm start  # For production
```

---

## 📬 API Endpoints

### 📘 Books

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/books` | Add a new book |
| GET | `/api/books` | Get all books with optional filtering & sorting |
| GET | `/api/books/:bookId` | Get book by ID |
| PUT | `/api/books/:bookId` | Update book by ID |
| DELETE | `/api/books/:bookId` | Delete book by ID |

**Example: Filtering and Sorting**
```
GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5
```

### 📕 Borrow

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/borrow` | Borrow a book |
| GET | `/api/borrow` | Summary of borrowed books (aggregated) |

---

## ✅ Validation Rules

### Book
- `title`, `author`, `isbn`, `genre`, `copies` are required
- `genre`: One of FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY
- `isbn`: Must be unique
- `copies`: Must be ≥ 1

### Borrow
- `book`: Must be a valid MongoDB ObjectId
- `quantity`: Must be ≥ 1
- `dueDate`: Must be a valid date

---

## 🧩 Tech Stack

- Express.js with TypeScript
- MongoDB with Mongoose
- Zod for runtime validation
- Dotenv, ts-node-dev, etc.

---

## 📦 Scripts

```bash
npm run dev      # Run in dev mode
npm run build    # Compile TypeScript
npm start        # Start compiled app
```

---

## 🔐 Error Handling Structure

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "copies": {
      "message": "Copies must be a positive number"
    }
  }
}
```

---

## 🛠️ Deployment

To deploy on Vercel:

1. Add `vercel.json` to configure entry:

```json
{
  "builds": [{ "src": "server.ts", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "/server.ts" }]
}
```

2. Link repo and set environment variables (`MONGODB_USERNAME`, `MONGODB_PASSWORD`).

---


## 📄 License

MIT

---

Let me know if you'd like to generate an OpenAPI/Swagger documentation or write Postman tests for all endpoints.