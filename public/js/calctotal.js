document.addEventListener("DOMContentLoaded", () => {
  const qtyInput = document.getElementById("quantity");
  const priceInput = document.getElementById("unitPrice");
  const transportCheck = document.getElementById("transportfee");
  const totalInput = document.getElementById("total");

  function calculateTotal() {
    const quantity = parseFloat(qtyInput.value) || 0;
    const unitPrice = parseFloat(priceInput.value) || 0;
    let totalCost = quantity * unitPrice;

    // Apply transport fee if checked
    if (transportCheck.checked) {
      totalCost *= 1.05; // add 5%
    }

    totalInput.value = totalCost ? totalCost.toFixed(2) : "";
  }

  // Listen for changes on all relevant fields
  qtyInput.addEventListener("input", calculateTotal);
  priceInput.addEventListener("input", calculateTotal);
  transportCheck.addEventListener("change", calculateTotal);
});

//Form Validations
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("salesForm");

  form.addEventListener("submit", function (e) {
    let isValid = true;

    // Remove previous error messages
    document.querySelectorAll(".error-msg").forEach((err) => err.remove());
    document
      .querySelectorAll(".error-input")
      .forEach((input) => input.classList.remove("error-input"));

    // Required fields
    const requiredFields = [
      "customerName",
      "productName",
      "productType",
      "quantity",
      "unitPrice",
      "saleDate",
      "paymentType",
    ];

    requiredFields.forEach((id) => {
      const input = document.getElementById(id);
      if (!input.value || input.value.trim() === "") {
        isValid = false;
        input.classList.add("error-input");

        const error = document.createElement("span");
        error.className = "error-msg";
        error.textContent = "This field is required";
        input.parentNode.appendChild(error);
      }
    });

    // Quantity validation
    const quantity = document.getElementById("quantity");
    if (quantity.value && Number(quantity.value) < 1) {
      isValid = false;
      quantity.classList.add("error-input");

      const error = document.createElement("span");
      error.className = "error-msg";
      error.textContent = "Quantity must be at least 1";
      quantity.parentNode.appendChild(error);
    }

    // Unit price validation
    const unitPrice = document.getElementById("unitPrice");
    if (unitPrice.value && Number(unitPrice.value) < 0) {
      isValid = false;
      unitPrice.classList.add("error-input");

      const error = document.createElement("span");
      error.className = "error-msg";
      error.textContent = "Unit price cannot be negative";
      unitPrice.parentNode.appendChild(error);
    }

    // Optional: Ensure total is calculated
    const total = document.getElementById("total");
    if (!total.value || total.value === "") {
      isValid = false;
      total.classList.add("error-input");

      const error = document.createElement("span");
      error.className = "error-msg";
      error.textContent = "Total cost must be calculated";
      total.parentNode.appendChild(error);
    }

    if (!isValid) e.preventDefault(); // Stop form submission if invalid
  });

  // Remove error messages as user types or selects
  const inputs = form.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("error-input");
      const nextError = input.parentNode.querySelector(".error-msg");
      if (nextError) nextError.remove();
    });

    input.addEventListener("change", () => {
      input.classList.remove("error-input");
      const nextError = input.parentNode.querySelector(".error-msg");
      if (nextError) nextError.remove();
    });
  });
});
//Clear form
document.getElementById("clearButton").addEventListener("click", function () {
  window.location.reload(); // refreshes the page
});
