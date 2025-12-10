# food-ordering-app
Features:
Order creation: Customers can submit name, address, and a list of items
Order lookup: Retrieve order details by ID
Status updates: Restaurant/admin can update order status (e.g., PENDING → PREPARING → OUT_FOR_DELIVERY → COMPLETED)
Order listing: View all orders (for debugging/admin use)
In-memory database: No external database required, easy to get started

Getting Started:
1. Clone the repository
git clone https://github.com/been113/food-ordering-app.git
cd food-ordering-app
2. Install dependencies
npm install
3. Start the server
node server.js
Default runs at:http://localhost:3000

API Reference:
Create an order: POST/api/orders
Request body:
{
  "customerName": "Alice",
  "address": "123 Main St",
  "items": [
    { "name": "Burger", "quantity": 2 },
    { "name": "Fries", "quantity": 1 }
  ]
}
Response:
{
  "id": 1,
  "customerName": "Alice",
  "address": "123 Main St",
  "items": [...],
  "status": "PENDING",
  "createdAt": "...",
  "updatedAt": "..."
}

Get order by ID: GET /api/orders/:id
Update order status: PUT /api/orders/:id/status
List all orders:GET /api/orders

Motivation:
This is more than just a food ordering system—it’s a practice project for building Express APIs. We love food, and we love code. Just like cooking, programming requires patience, creativity, and experimentation. We hope this project serves as your first “appetizer” in backend development.

