document.getElementById("unitPrice").addEventListener("change", function () {
  const unitPrice = parseFloat(document.getElementById("unitPrice").value);
  const quantity = parseFloat(document.getElementById("quantity").value);
  const total = document.getElementById("total");
  if (!isNaN(quantity) && !isNaN(unitPrice)) {
    const totalCost = (quantity * unitPrice).toFixed(0);
    total.value = totalCost;
  } else {
    total.value = "";
  }
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




