// Sales vs Stock Chart
const ctx1 = document.getElementById("salesStockChart").getContext("2d");
new Chart(ctx1, {
  type: "bar",
  data: {
    labels: ["Product A", "Product B", "Product C", "Product D"],
    datasets: [
      {
        label: "Sales",
        data: [1500, 1200, 900, 1800],
        backgroundColor: "#27ae60",
      },
      {
        label: "Stock",
        data: [3000, 1800, 1000, 1600],
        backgroundColor: "#2196f3",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
  },
});

// Most Sold Products Chart
const ctx2 = document.getElementById("topProductsChart").getContext("2d");
new Chart(ctx2, {
  type: "pie",
  data: {
    labels: ["Product A", "Product B", "Product C", "Product D"],
    datasets: [
      {
        data: [1800, 1500, 900, 700],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#27ae60"],
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

//Reports

// Mock Data
const stockData = [
  { name: "Table", quantity: 120 },
  { name: "Chair", quantity: 20 },
  { name: "Cupboard", quantity: 2 },
  { name: "Bed", quantity: 5 },
];

const salesData = {
  totalSales: 12850,
  topCustomers: ["Alice Johnson", "Bob Smith", "Clara Adams"],
  paymentMethods: {
    Cash: 4500,
    Card: 6350,
    PayPal: 2000,
  },
};

// Render Stock
const stockList = document.getElementById("stock-list");
const lowStockList = document.getElementById("low-stock-list");

stockData.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = `${item.name} - ${item.quantity} in stock`;
  stockList.appendChild(li);

  if (item.quantity < 10) {
    const lowLi = document.createElement("li");
    lowLi.textContent = `${item.name} - Only ${item.quantity} left!`;
    lowStockList.appendChild(lowLi);
  }
});

// Render Sales
document.getElementById("total-sales").textContent = `$${salesData.totalSales}`;

const topCustomersList = document.getElementById("top-customers");
salesData.topCustomers.forEach((customer) => {
  const li = document.createElement("li");
  li.textContent = customer;
  topCustomersList.appendChild(li);
});

const paymentMethodsList = document.getElementById("payment-methods");
Object.entries(salesData.paymentMethods).forEach(([method, amount]) => {
  const li = document.createElement("li");
  li.textContent = `${method}: $${amount}`;
  paymentMethodsList.appendChild(li);
});
