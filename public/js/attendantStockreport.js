// Auto set current date
document.getElementById("reportDate").textContent =
  new Date().toLocaleDateString("en-GB");

// Stock data injected from backend
let stockData = window.stockFromDB || [];

//  TABLE RENDERING
function renderTable(data) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#888;">No stock records available</td></tr>`;
    updateSummary([]); // reset summary
    return;
  }

  data.forEach((item) => {
    const row = `
      <tr>
      <td>${item.productName}</td>
      <td>${item.productType}</td>
      <td>${item.quantity}</td>
      <td>${item.dateReceived}</td>
        <td>${item.supplierName || "N/A"}</td>
      </tr>`;
    tbody.innerHTML += row;
  });

  updateSummary(data);
}

//  SUMMARY VALUES
function updateSummary(data) {
  let totalValue = 0;
  let lowStockItems = 0;

  data.forEach((item) => {
    totalValue += item.quantity * (item.unitPrice || item.costPrice || 0);
    if (item.quantity < 10) lowStockItems++;
  });

  document.getElementById("total-stock-value").textContent =
    totalValue.toFixed(2);
  document.getElementById("low-stock-items").textContent = lowStockItems;
  document.getElementById("low-stock-alerts").textContent =
    lowStockItems > 0 ? "Yes" : "No";
}

//  DATE PARSER
// Converts dateReceived (string) into valid JS Date
function parseDate(dateStr) {
  if (!dateStr) return null;

  // Try ISO first
  let parsed = new Date(dateStr);
  if (!isNaN(parsed)) return parsed;

  // Try DD/MM/YYYY or DD-MM-YYYY
  const parts = dateStr.split(/[\/\-]/);
  if (parts.length === 3) {
    const [day, month, year] = parts.map(Number);
    if (year && month && day) {
      return new Date(year, month - 1, day);
    }
  }

  return null;
}

//  FILTER LOGIC
function filterData(type, date) {
  if (!type || !date) return stockData;

  const selectedDate = new Date(date);

  return stockData.filter((s) => {
    const stockDate = parseDate(s.dateReceived);
    if (!stockDate) return false;

    //  DAY FILTER
    if (type === "day") {
      return (
        stockDate.getFullYear() === selectedDate.getFullYear() &&
        stockDate.getMonth() === selectedDate.getMonth() &&
        stockDate.getDate() === selectedDate.getDate()
      );
    }

    //  WEEK FILTER
    if (type === "week") {
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()); // Sunday

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday

      return stockDate >= startOfWeek && stockDate <= endOfWeek;
    }

    //  MONTH FILTER
    if (type === "month") {
      const startOfMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      );
      const endOfMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
      );

      return stockDate >= startOfMonth && stockDate <= endOfMonth;
    }

    return false;
  });
}

//  FILTER TYPE SWITCH
document.getElementById("filterType").addEventListener("change", (e) => {
  const filterType = e.target.value;
  const filterDate = document.getElementById("filterDate");

  if (filterType === "month") {
    filterDate.type = "month";
  } else {
    filterDate.type = "date";
  }
});

//  FORM SUBMIT
document.getElementById("filterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const type = document.getElementById("filterType").value;
  const date = document.getElementById("filterDate").value;

  const filtered = filterData(type, date);
  renderTable(filtered);
});

//  REFRESH BUTTON
document.getElementById("btnRefresh").addEventListener("click", () => {
  window.location.reload();
});

//  INITIAL RENDER
renderTable(stockData);
