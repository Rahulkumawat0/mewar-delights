# Mewar Delights - Backend Setup Summary

## ✅ Completed Tasks

### 1. **Clean Code & Move Products to Backend**

#### Created Backend Files:
- **[server/models/Product.js](server/models/Product.js)** - MongoDB Product Schema with fields: name, category, price, image, description
- **[server/routes/productRoutes.js](server/routes/productRoutes.js)** - API endpoints:
  - `GET /api/products` - Fetch all products
  - `GET /api/products/:id` - Fetch product by ID
  - `POST /api/products` - Create new product
- **[server/seed.js](server/seed.js)** - Database seeding script with initial product data

#### Updated Backend Files:
- **[server/index.js](server/index.js)** - Added product routes integration
- **[server/package.json](server/package.json)** - Added `seed` script

### 2. **Connected MongoDB**
- MongoDB connection is already configured in `server/.env`:
  ```
  MONGO_URI=mongodb+srv://rahulkumawatnwh2092001_db_user:Test123@cluster0.ng3lksk.mongodb.net/?appName=Cluster0
  ```
- Server will automatically connect on startup

### 3. **Fetch Products Dynamically**

#### Updated Frontend Files:
- **[client/src/pages/Menu.jsx](client/src/pages/Menu.jsx)** - Refactored to:
  - Fetch products from `GET /api/products`
  - Handle loading and error states
  - Display dynamic product list from MongoDB
  
- **[client/src/context/CartContext.jsx](client/src/context/CartContext.jsx)** - Updated to support both `id` and `_id` fields for MongoDB compatibility

#### Created Frontend Files:
- **[client/src/config/api.js](client/src/config/api.js)** - API configuration (centralized base URL)
- **[client/.env](client/.env)** - Environment variables:
  ```
  VITE_API_URL=http://localhost:5000
  ```

### 4. **Code Cleanup**
- Removed hardcoded foodData import from Menu.jsx
- Centralized API configuration
- Added proper error handling and loading states

## 🚀 How to Run

### 1. **Seed Database with Initial Products:**
```bash
cd server
npm run seed
```

### 2. **Start Backend Server:**
```bash
cd server
npm run dev
```
Server will run on: `http://localhost:5000`

### 3. **Start Frontend:**
```bash
cd client
npm run dev
```
Frontend will run on: `http://localhost:5173`

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create new product |

## 📦 Products Data Structure
```javascript
{
  _id: ObjectId,        // MongoDB ID
  name: String,         // Product name
  category: String,     // Category (main, snacks, sweets)
  price: Number,        // Price in rupees
  image: String,        // Image URL
  description: String,  // Product description
  createdAt: Date,      // Timestamp
  updatedAt: Date       // Timestamp
}
```

## 🔄 Data Flow
1. **Frontend** → Requests `/api/products` when Menu page loads
2. **Backend** → Fetches products from MongoDB
3. **Frontend** → Displays products with proper error/loading states
4. **Cart** → Works with MongoDB `_id` field for product identification

## 🎯 Next Steps
- Test the complete flow from frontend to backend
- Add more products via POST endpoint if needed
- Set up environment-specific configurations (production, staging)
- Add product filtering and sorting functionality
- Implement image optimization
