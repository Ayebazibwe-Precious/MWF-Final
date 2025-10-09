// --- Auto set current date ---
document.getElementById("reportDate").textContent =
  new Date().toLocaleDateString("en-GB");

// Stock data injected from backend
let stockData = window.stockFromDB || [];

// Render stock table
function renderTable(data) {
  const tbody = document.getElementById("stock-table-body");
  tbody.innerHTML = "";

  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; color:#888;">No records available</td></tr>`;
    return;
  }

  data.forEach((item) => {
    const row = `
      <tr class="${item.qty < 10 ? "low-stock" : ""}">
        <td>${item.name}</td>
        <td>${item.type}</td>
        <td>${item.qty}</td>
        <td>${item.cost}</td>
        <td>${item.price}</td>
        <td>${item.supplier}</td>
        <td>${new Date(item.date).toLocaleDateString("en-GB")}</td>
        <td>${item.quality}</td>
        <td>${item.color}</td>
        <td>${item.measurements}</td>
      </tr>`;
    tbody.innerHTML += row;
  });
}

// Filter logic
function filterData(type, date) {
  if (!type || !date) return { filtered: [], rangeText: "" };
  const selectedDate = new Date(date);
  let rangeText = "";
  let filtered = [];

  if (type === "day") {
    rangeText = `For ${selectedDate.toLocaleDateString("en-GB")}`;
    filtered = stockData.filter(
      (s) => new Date(s.date).toDateString() === selectedDate.toDateString()
    );
  }

  if (type === "week") {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    rangeText = `Week Range: ${startOfWeek.toLocaleDateString(
      "en-GB"
    )} → ${endOfWeek.toLocaleDateString("en-GB")}`;

    filtered = stockData.filter((s) => {
      const stockDate = new Date(s.date);
      return stockDate >= startOfWeek && stockDate <= endOfWeek;
    });
  }

  if (type === "month") {
    const month = selectedDate.toLocaleString("default", { month: "long" });
    const year = selectedDate.getFullYear();
    const firstDay = new Date(year, selectedDate.getMonth(), 1);
    const lastDay = new Date(year, selectedDate.getMonth() + 1, 0);

    rangeText = `Month Range: ${firstDay.toLocaleDateString(
      "en-GB"
    )} → ${lastDay.toLocaleDateString("en-GB")} (${month} ${year})`;

    filtered = stockData.filter((s) => {
      const stockDate = new Date(s.date);
      return stockDate >= firstDay && stockDate <= lastDay;
    });
  }

  return { filtered, rangeText };
}

// --- Form filter ---
document.getElementById("filterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const type = document.getElementById("filterType").value;
  const date = document.getElementById("filterDate").value;
  const { filtered, rangeText } = filterData(type, date);

  // Update table
  renderTable(filtered);

  // Display range in header
  const rangeDisplay = document.getElementById("rangeDisplay");
  rangeDisplay.textContent = rangeText || "";
});

// --- Refresh button → reloads entire page ---
document.getElementById("btnRefresh").addEventListener("click", () => {
  window.location.reload();
});

// --- Initial render ---
renderTable(stockData);
