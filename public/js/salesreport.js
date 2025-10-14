// Auto set current date
document.getElementById("reportDate").textContent =
  new Date().toLocaleDateString("en-GB");

// Sales data injected from backend
let salesData = window.salesFromDB || [];

// Render sales data table
function renderTable(data) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; color:#888;">No records available</td></tr>`;
    return;
  }

  data.forEach((sale) => {
    const row = `
      <tr>
        <td>${sale.productName}</td>
        <td>${sale.productType}</td>
        <td>${sale.quantity}</td>
        <td>${sale.unitPrice}</td>
        <td>${new Date(sale.saleDate).toLocaleDateString("en-GB")}</td>
        <td>${sale.paymentType}</td>
        <td>${sale.salesAgent?.email || "N/A"}</td>
        <td>${sale.total}</td>
      </tr>`;
    tbody.innerHTML += row;
  });
}

// Filter logic
function filterData(type, date) {
  if (!type || !date) return [];

  const selectedDate = new Date(date);

  return salesData.filter((s) => {
    const saleDate = new Date(s.saleDate);

    if (type === "day") {
      // Same day
      return saleDate.toDateString() === selectedDate.toDateString();
    }

    if (type === "week") {
      // Get start (Sunday) and end (Saturday) of week
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return saleDate >= startOfWeek && saleDate <= endOfWeek;
    }

    if (type === "month") {
      // Compare year and month
      return (
        saleDate.getFullYear() === selectedDate.getFullYear() &&
        saleDate.getMonth() === selectedDate.getMonth()
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

  const rangeText = type
    ? `Showing ${
        type.charAt(0).toUpperCase() + type.slice(1)
      } Report for ${new Date(date).toLocaleDateString("en-GB")}`
    : "Showing All Records";
  document.getElementById("rangeDisplay").textContent = rangeText;
});

// Refresh button → reloads entire page
document.getElementById("btnRefresh").addEventListener("click", () => {
  window.location.reload();
});
