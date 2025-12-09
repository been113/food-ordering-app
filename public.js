const API_BASE = "";

// Helpers
function parseItems(input) {
  // "Burger x2, Fries x1" → [{ name: "Burger", quantity: 2 }, ...]
  return input.split(",")
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => {
      const parts = s.split("x");
      const name = parts[0].trim();
      const qty = parts[1] ? parseInt(parts[1].trim(), 10) : 1;
      return { name, quantity: isNaN(qty) ? 1 : qty };
    });
}

// Create order
document.getElementById("createOrderBtn").addEventListener("click", async () => {
  const customerName = document.getElementById("customerName").value.trim();
  const address = document.getElementById("address").value.trim();
  const itemsInput = document.getElementById("itemsInput").value.trim();
  const resultEl = document.getElementById("createOrderResult");

  if (!customerName || !address || !itemsInput) {
    resultEl.textContent = "Please fill in all fields.";
    resultEl.classList.add("error");
    return;
  }

  const items = parseItems(itemsInput);

  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerName, address, items })
    });

    const data = await res.json();

    if (!res.ok) {
      resultEl.textContent = `Error: ${data.error || "Unknown error"}`;
      resultEl.classList.add("error");
    } else {
      resultEl.textContent = `Order created! Your Order ID is ${data.id}. Status: ${data.status}`;
      resultEl.classList.remove("error");
    }
  } catch (err) {
    resultEl.textContent = "Network error. Please try again.";
    resultEl.classList.add("error");
  }
});

// Track order
document.getElementById("trackOrderBtn").addEventListener("click", async () => {
  const id = document.getElementById("trackOrderId").value;
  const resultEl = document.getElementById("trackOrderResult");

  if (!id) {
    resultEl.textContent = "Please enter an Order ID.";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/orders/${id}`);
    const data = await res.json();

    if (!res.ok) {
      resultEl.textContent = `Error: ${data.error || "Order not found"}`;
    } else {
      resultEl.textContent = JSON.stringify(data, null, 2);
    }
  } catch (err) {
    resultEl.textContent = "Network error. Please try again.";
  }
});

// Update status (admin)
document.getElementById("updateStatusBtn").addEventListener("click", async () => {
  const id = document.getElementById("updateOrderId").value;
  const status = document.getElementById("newStatus").value;
  const resultEl = document.getElementById("updateStatusResult");

  if (!id) {
    resultEl.textContent = "Please enter an Order ID.";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    const data = await res.json();

    if (!res.ok) {
      resultEl.textContent = `Error: ${data.error || "Update failed"}`;
    } else {
      resultEl.textContent = JSON.stringify(data, null, 2);
    }
  } catch (err) {
    resultEl.textContent = "Network error. Please try again.";
  }
});
