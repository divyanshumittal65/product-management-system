# Product Management System (PMS) - Project Context

## Objective

Build a Product & Variant Management System with:

- Types
- Attributes
- Type Attribute Mapping
- Products
- Variants
- Variant Attributes
- Variant Images

Tech Stack:

Backend:
- Node.js
- Express
- MySQL
- mysql2/promise

Frontend:
- React
- TypeScript
- Vite
- Axios

---

# Project Structure

## Backend

```text
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── typeController.js
│   ├── attributeController.js
│   └── productController.js
│
├── routes/
│   ├── typeRoutes.js
│   ├── attributeRoutes.js
│   └── productRoutes.js
│
├── middleware/
│
├── uploads/
│
├── .env
├── app.js
├── server.js
└── package.json
```

## Frontend

```text
frontend/
│
├── src/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── App.tsx
│
├── vite.config.ts
├── package.json
└── tsconfig.json
```

---

# Database

Database Name:

```sql
product_management
```

Tables:

```text
types
attributes
type_attributes
products
variants
variant_attributes
variant_images
```

Schema Created:
YES

---

# Coding Standards

Use:

- mysql2/promise
- async/await

Do NOT use:

- callback queries

Example:

```js
const [rows] = await db.query(sql);
```

---

# Development Rules

1. Follow roadmap strictly.
2. Do not skip unfinished modules.
3. Backend + Frontend required before marking module complete.
4. Minimal frontend only.
5. No Redux.
6. No React Query.
7. No overengineering.
8. Build only trainer requirements.
9. Test every API before moving forward.

---

# Phase Status

## Phase 1 - Foundation

Status:

COMPLETE

Completed:

- Database created
- Tables created
- Express configured
- MySQL configured
- DB connection verified

---

# Phase 2

## Module 1 - Types

Backend:

Completed:

- POST /api/types
- GET /api/types
- DELETE /api/types/:id

Frontend:

Completed:

- Add Type
- View Types
- Delete Type

Status:

COMPLETE

---

## Module 2 - Attributes

Backend:

Pending:

- POST /api/attributes
- GET /api/attributes
- DELETE /api/attributes/:id

Frontend:

Pending:

- Add Attribute
- View Attributes
- Delete Attribute

Status:

NOT STARTED

---

## Module 3 - Type Attribute Mapping

Status:

NOT STARTED

---

# Current Milestone

NEXT TASK:

Module 2 - Attributes

Build:

Backend:
- POST /api/attributes
- GET /api/attributes
- DELETE /api/attributes/:id

Frontend:
- Add Attribute
- View Attributes
- Delete Attribute

---

# Notes

Types module fully working.

Frontend successfully communicates with backend.

Project approach:

Finish one module completely before moving to next.