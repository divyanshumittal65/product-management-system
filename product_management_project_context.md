# Product & Variant Management System — Project Context

## Current Status

### Completed
- Database schema designed and approved
- ER diagram completed
- API planning completed
- Frontend planning completed
- Backend project initialized
- Express server running
- MySQL connection configured and tested

### Backend Setup Done

```text
backend/
│
├── config/
│   └── db.js
├── controllers/
├── routes/
├── middleware/
├── uploads/
├── .env
├── app.js
└── server.js
```

Installed:

```bash
npm install express mysql2 cors dotenv multer
npm install -D nodemon
```

---

# Project Goal

Build a Product Management System where:

- A Product can have multiple Variants
- Variants use dynamic attributes
- Each Variant has:
  - SKU
  - Price
  - Stock
- Each Variant can have multiple Images
- Duplicate variants are prevented
- New product types and attributes can be added without schema changes

---

# Development Roadmap

## Phase 1 — Foundation

Status: ✅ COMPLETE

- Express Setup
- MySQL Setup
- Environment Variables
- Folder Structure
- Server Running
- Database Connected

---

## Phase 2 — Master Data APIs

### Module 1: Types

Table:

```text
Type
```

APIs:

```http
POST   /api/types
GET    /api/types
DELETE /api/types/:id
```

Frontend:

- Add Type
- View Types
- Delete Type

---

### Module 2: Attributes

Table:

```text
Attribute
```

APIs:

```http
POST   /api/attributes
GET    /api/attributes
DELETE /api/attributes/:id
```

Frontend:

- Add Attribute
- View Attributes
- Delete Attribute

---

### Module 3: Type Attribute Mapping

Table:

```text
Type_Attribute
```

APIs:

```http
POST /api/type-attributes
GET  /api/type-attributes/:typeId
```

Frontend:

- Select Type
- Select Attribute
- Assign Mapping
- View Mappings

---

## Phase 3 — Product Module

Table:

```text
Products
```

APIs:

```http
POST   /api/products
GET    /api/products
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id
```

Frontend:

Products.tsx

Fields:

- Product Name
- Type Dropdown
- Description

Features:

- Create
- Edit
- Delete
- View

---

## Phase 4 — Variant Module

Table:

```text
Variant
```

APIs:

```http
POST   /api/variants
GET    /api/variants/product/:productId
PUT    /api/variants/:id
DELETE /api/variants/:id
```

Frontend:

Variants.tsx

Fields:

- SKU
- Price
- Stock

---

## Phase 5 — Variant Attributes

Table:

```text
Variant_Attribute
```

APIs:

```http
POST /api/variant-attributes
GET  /api/variant-attributes/:variantId
```

Flow:

Select Product
→ Get Product Type
→ Get Allowed Attributes
→ Generate Dynamic Inputs
→ Save Variant

Example:

- Color = Black
- Size = M

---

## Phase 6 — Duplicate Variant Prevention

Requirement:

Prevent duplicate combinations.

Example:

```text
Color=Black
Size=M
```

should only exist once per product.

Implementation idea:

Generate signature:

```text
Color=Black|Size=M
```

Validate before insert.

Return:

```http
400 Bad Request
```

if duplicate exists.

---

## Phase 7 — Image Uploads

Table:

```text
Variant_Image
```

APIs:

```http
POST   /api/variant-images
GET    /api/variant-images/:variantId
DELETE /api/variant-images/:imageId
```

Features:

- Multiple image upload
- View images
- Delete images

Technology:

```bash
npm install multer
```

---

## Phase 8 — Frontend (React + TypeScript)

Create:

```bash
npm create vite@latest frontend -- --template react-ts
```

Install:

```bash
npm install axios react-router-dom
```

Structure:

```text
src/
│
├── pages/
│   ├── Products.tsx
│   ├── Variants.tsx
│   └── Images.tsx
│
├── services/
│   └── api.ts
│
├── types/
│   └── index.ts
│
└── App.tsx
```

---

## Phase 9 — Testing

### Postman

Test:

- Types
- Attributes
- Type Attributes
- Products
- Variants
- Variant Attributes
- Images

### UI Testing

Verify:

- Create Product
- Create Variant
- Dynamic Attributes
- Upload Images
- Delete Records

---

# Trainer Deliverables

- MySQL Database
- Express Backend
- CRUD APIs
- Dynamic Variant Attributes
- Duplicate Variant Prevention
- Image Upload Support
- React TypeScript Frontend
- Postman Collection
- Working Demo

---

# Immediate Next Step

Build these modules first:

1. Types Module
2. Attributes Module
3. Type Attribute Module

Only after these are working:

4. Products CRUD
5. Variants
6. Images

Current milestone:

✅ Server Running

Next coding task:

➡ Types CRUD API
