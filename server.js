console.log("Hello, World!");const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// In-memory "database"
let orders = [];
let nextOrderId = 1;

// Allowed statuses
const VALID_STATUSES = [
  "PENDING",
  "PREPARING",
  "OUT_FOR_DELIVERY",
  "COMPLETED",
  "CANCELLED"
];

// Create a new order
app.post("/api/orders", (req, res) => {
  const { customerName, address, items } = req.body;

  if (!customerName || !address || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "customerName, address and items[] are required" });
  }

  const newOrder = {
    id: nextOrderId++,
    customerName,
    address,
    items, // e.g. [{ name: "Burger", quantity: 2 }]
    status: "PENDING",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Get order by ID
app.get("/api/orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id, 10);
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(order);
});

// Update order status (for restaurant/admin)
app.put("/api/orders/:id/status", (req, res) => {
  const orderId = parseInt(req.params.id, 10);
  const { status } = req.body;

  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();

  res.json(order);
});

// Optional: list all orders (for debugging / admin)
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
