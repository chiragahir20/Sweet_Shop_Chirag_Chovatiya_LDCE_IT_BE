# Sweet Shop Management System

A Node.js application to manage a sweet shop using **Express**, **MongoDB (Atlas)**, and **Jest** for TDD. This project supports full CRUD operations with **role-based access control** for admins and users.

---

## 🚀 Features

| Feature             | Admin | User |
|---------------------|:-----:|:----:|
| Add Sweets          | ✅    | ❌   |
| Delete Sweets       | ✅    | ❌   |
| Restock Sweets      | ✅    | ❌   |
| Search Sweets       | ✅    | ✅   |
| Sort Sweets         | ✅    | ✅   |
| Purchase Sweets     | ❌    | ✅   |

---

## 🛠 Technology Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas** (Cloud-hosted)
- **Mongoose** (ODM)
- **Jest** + **Supertest** (for testing)
- **CommonJS** module format

---

## 🗂 Folder Structure

sweet-shop-backend/
├── src/
│ ├── addSweet/
│ ├── deleteSweet/
│ ├── restockSweet/
│ ├── searchSweet/
│ ├── sortSweet/
│ ├── purchaseSweet/
│ ├── models/
│ │ └── sweet.model.js
│ ├── db.js
│ └── app.js
├── tests/
│ ├── addSweet.test.js
│ ├── deleteSweet.test.js
│ ├── restockSweet.test.js
│ ├── searchSweet.test.js
│ ├── sortSweet.test.js
│ └── purchaseSweet.test.js
├── index.js
├── package.json
└── README.md

---

## 🧪 Test-Driven Development (TDD)

This project was built using **Test-Driven Development**. For every feature:
1. Tests were written using `jest` and `supertest`.
2. Functionality was implemented after.
3. All tests were kept in separate files inside the `tests/` directory.

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/sweet-shop-backend.git
cd sweet-shop-backend
```

### 2. Install dependencies
   npm install

##  MongoDB Setup
Create a free cluster on MongoDB Atlas.

Add your IP to Network Access.

Create a database named: Sweet-Shop-db

Create a collection named: sweets

Replace the connection string in src/db.js:
```bash
await mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/Sweet-Shop-db?retryWrites=true&w=majority');
```
💡 Don't forget to enable write access for the cluster user.

## ▶️ Running the Project

npm start
Server will start at: http://localhost:3000


🔍 API Endpoints
Headers Required:

role: admin (for admin operations)

role: user (for user operations)

### 🎯 Add Sweet (Admin)

POST /sweets

{
  "sweetId": 1001,
  "name": "Kaju Katli",
  "category": "Nut-Based",
  "price": 50,
  "quantity": 20
}

### 🗑️ Delete Sweet (Admin)
DELETE /sweets/:sweetId

### 🔁 Restock Sweet (Admin)
PUT /sweets/:sweetId/restock

{ "quantity": 10 }

### 🔍 Search Sweets (User/Admin)
GET /sweets/search?name=katli&category=Nut-Based&minPrice=20&maxPrice=80

### 📊 Sort Sweets (User/Admin)
GET /sweets/sort?by=price&order=desc

### 🛒 Purchase Sweet (User)
PUT /sweets/:sweetId/purchase

{ "quantity": 5 }

## 🧪 Run Tests

npm test
All test files are located in tests/.

## ✅ Sample Test Report Output

PASS  tests/addSweet.test.js
  ✓ Admin can add a new sweet
  ✓ Should throw error if sweetId already exists
  ✓ User cannot add sweet

PASS  tests/deleteSweet.test.js
  ✓ Admin can delete a sweet
  ✓ Admin cannot delete non-existent sweet
  ✓ User cannot delete sweet

PASS  tests/restockSweet.test.js
  ✓ Admin can restock a sweet
  ✓ Admin cannot restock non-existent sweet
  ✓ User cannot restock sweet
  ✓ Invalid quantity input should fail

PASS  tests/searchSweet.test.js
  ✓ Search by name
  ✓ Search by category
  ✓ Search by price range
  ✓ Search with no filters returns all

PASS  tests/sortSweet.test.js
  ✓ Sort by price ascending
  ✓ Sort by quantity descending
  ✓ Invalid sort field

PASS  tests/purchaseSweet.test.js
  ✓ User can purchase sweet if enough stock
  ✓ User cannot purchase sweet if not enough stock
  ✓ User cannot send invalid quantity
  ✓ Admin cannot purchase sweet
✅ All features are 100% covered with passing tests.

📌 Notes
No frontend is implemented yet — backend API only.

Role is passed via HTTP header (role: admin or role: user)

Built using clean code, modular structure, and TDD principles.


