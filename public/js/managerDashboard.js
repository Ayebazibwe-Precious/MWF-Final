// === Load Sales vs Stock Chart ===
async function loadSalesStockChart() {
  try {
    const res = await fetch("/api/charts/sales-vs-stock"); // <-- Your API endpoint
    const data = await res.json();

    const ctx1 = document.getElementById("salesStockChart").getContext("2d");

    new Chart(ctx1, {
      type: "bar",
      data: {
        labels: data.labels, // e.g. ["Product A", "Product B"]
        datasets: [
          {
            label: "Sales",
            data: data.sales,
            backgroundColor: "#27ae60",
          },
          {
            label: "Stock",
            data: data.stock,
            backgroundColor: "#2196f3",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
        },
      },
    });
  } catch (err) {
    console.error("Error loading Sales vs Stock chart:", err);
  }
}

// === Load Most Sold Products Chart ===
async function loadTopProductsChart() {
  try {
    const res = await fetch("/api/charts/top-products"); // <-- Your API endpoint
    const data = await res.json();

    const ctx2 = document.getElementById("topProductsChart").getContext("2d");

    new Chart(ctx2, {
      type: "pie",
      data: {
        labels: data.labels, // e.g. ["Product A", "Product B"]
        datasets: [
          {
            data: data.values, // e.g. [120, 90, 50]
            backgroundColor: ["#52c582ff", "#36a2eb", "#ffce56", "#e35b4cff"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });
  } catch (err) {
    console.error("Error loading Top Products chart:", err);
  }
}

// === Initialize Charts ===
loadSalesStockChart();
loadTopProductsChart();

// === Optional: Auto-refresh every 30s ===
setInterval(() => {
  loadSalesStockChart();
  loadTopProductsChart();
}, 30000);
