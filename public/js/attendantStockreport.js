// Auto set current date
document.getElementById("reportDate").textContent =
  new Date().toLocaleDateString("en-GB");

// Stock data injected from backend
let stockData = window.stockFromDB || [];

// Render stock table
function renderTable(data) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#888;">No stock records available</td></tr>`;
    return;
  }

  data.forEach((item) => {
    const row = `
      <tr>
        <td>${item.productName}</td>
        <td>${item.quantity}</td>
        <td>${item.supplierName || "N/A"}</td>
      </tr>`;
    tbody.innerHTML += row;
  });

  // update summary
  updateSummary(data);
}

// Summary values
function updateSummary(data) {
  let totalValue = 0;
  let lowStockItems = 0;

  data.forEach((item) => {
    totalValue += item.quantity * (item.unitPrice || 0);
    if (item.quantity < 10) lowStockItems++;
  });

  document.getElementById("total-stock-value").textContent =
    totalValue.toFixed(2);
  document.getElementById("low-stock-items").textContent = lowStockItems;
  document.getElementById("low-stock-alerts").textContent =
    lowStockItems > 0 ? "Yes" : "No";
}

// Filter logic
function filterData(type, date) {
  if (!type || !date) return [];
  const selectedDate = new Date(date);

  return stockData.filter((s) => {
    const stockDate = new Date(s.entryDate);

    if (type === "day") {
      return stockDate.toDateString() === selectedDate.toDateString();
    }
    if (type === "week") {
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return stockDate >= startOfWeek && stockDate <= endOfWeek;
    }
    if (type === "month") {
      return (
        stockDate.getMonth() === selectedDate.getMonth() &&
        stockDate.getFullYear() === selectedDate.getFullYear()
      );
    }
    return false;
  });
}

// Form filter
document.getElementById("filterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const type = document.getElementById("filterType").value;
  const date = document.getElementById("filterDate").value;
  const filtered = filterData(type, date);
  renderTable(filtered);
});

// Refresh button → reloads entire page
document.getElementById("btnRefresh").addEventListener("click", () => {
  window.location.reload();
});


