//  Current Report Date
document.getElementById("reportDate").textContent =
  new Date().toLocaleDateString("en-GB");

// Stock Data from Backend
const stockData = window.stockFromDB || [];

// DOM Elements
const tbody = document.getElementById("stock-table-body");
const filterForm = document.getElementById("filterForm");
const filterType = document.getElementById("filterType");
const filterDate = document.getElementById("filterDate");
const rangeDisplay = document.getElementById("rangeDisplay");
const btnRefresh = document.getElementById("btnRefresh");

// Optional summary section (create in Pug if you want)
const summaryContainer = document.createElement("div");
summaryContainer.classList.add("report-summary");
summaryContainer.style.cssText =
  "display:flex;gap:20px;justify-content:center;margin:15px 0;font-weight:bold;color:#2c3e50;";
document.querySelector(".report-header").after(summaryContainer);

// FUNCTION: Render Stock Table

function renderTable(data) {
  tbody.innerHTML = "";

  if (!data || data.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center;color:#888;">No stock data available</td>
      </tr>`;
    renderSummary([]);
    return;
  }

  data.forEach((item) => {
    const formattedDate = new Date(item.dateReceived).toLocaleDateString(
      "en-GB"
    );
    const lowStockClass = item.qty < 10 ? "low-stock" : "";

    const row = `
      <tr class="${lowStockClass}">
        <td>${item.name}</td>
        <td>${item.type}</td>
        <td>${item.qty}</td>
        <td>${item.cost.toLocaleString()}</td>
        <td>${item.price.toLocaleString()}</td>
        <td>${formattedDate}</td>
        <td>${item.quality || "-"}</td>
        <td>${item.color || "-"}</td>
      </tr>
    `;
    tbody.insertAdjacentHTML("beforeend", row);
  });

  renderSummary(data);
}
// FUNCTION: Render Summary Stats
function renderSummary(data) {
  const totalProducts = data.length;
  const totalValue = data.reduce((sum, item) => sum + item.qty * item.cost, 0);
  const lowStockCount = data.filter((i) => i.qty < 5).length;

  summaryContainer.innerHTML = `
    <div> Total Products: <span style="color:#16a085;">${totalProducts}</span></div>
    <div> Stock Value: <span style="color:#2980b9;">UGX${totalValue.toLocaleString()}</span></div>
    <div> Low Stock: <span style="color:#e74c3c;">${lowStockCount}</span></div>
  `;
}

// FUNCTION: Filter Logic (Day, Week, Month)
function filterData(type, date) {
  if (!type || !date)
    return { filtered: [], start: "", end: "", rangeText: "" };

  const selectedDate = new Date(date);
  let filtered = [];
  let start, end, rangeText;

  //  DAY FILTER
  if (type === "day") {
    start = new Date(selectedDate);
    end = new Date(selectedDate);
    rangeText = `Showing data for: ${start.toLocaleDateString("en-GB")}`;

    filtered = stockData.filter((s) => {
      const stockDate = new Date(s.dateReceived);
      return stockDate.toDateString() === selectedDate.toDateString();
    });
  }

  //  WEEK FILTER
  if (type === "week") {
    const dayOfWeek = selectedDate.getDay(); // Sunday = 0
    start = new Date(selectedDate);
    start.setDate(selectedDate.getDate() - dayOfWeek);
    end = new Date(start);
    end.setDate(start.getDate() + 6);

    rangeText = `Week Range: ${start.toLocaleDateString(
      "en-GB"
    )} → ${end.toLocaleDateString("en-GB")}`;

    filtered = stockData.filter((s) => {
      const stockDate = new Date(s.dateReceived);
      return stockDate >= start && stockDate <= end;
    });
  }

  //  MONTH FILTER
  if (type === "month") {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    start = new Date(year, month, 1);
    end = new Date(year, month + 1, 0);

    const monthName = start.toLocaleString("default", { month: "long" });
    rangeText = `Month Range: ${start.toLocaleDateString(
      "en-GB"
    )} → ${end.toLocaleDateString("en-GB")} (${monthName} ${year})`;

    filtered = stockData.filter((s) => {
      const stockDate = new Date(s.dateReceived);
      return stockDate >= start && stockDate <= end;
    });
  }

  return { filtered, start, end, rangeText };
}

// EVENT: Filter Form Submit
filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const type = filterType.value;
  const date = filterDate.value;

  const { filtered, rangeText } = filterData(type, date);
  renderTable(filtered);
  rangeDisplay.textContent = rangeText || "";
});

// EVENT: Refresh Page
btnRefresh.addEventListener("click", () => window.location.reload());

// INITIAL RENDER
renderTable(stockData);
