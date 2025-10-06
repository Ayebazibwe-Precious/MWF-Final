document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("stockForm");

  form.addEventListener("submit", function (e) {
    let isValid = true;

    // Remove existing error messages
    const existingErrors = document.querySelectorAll(".error-msg");
    existingErrors.forEach((err) => err.remove());
    document
      .querySelectorAll(".error-input")
      .forEach((input) => input.classList.remove("error-input"));

    // Required fields
    const requiredFields = [
      "productName",
      "productType",
      "costPrice",
      "quantity",
      "dateReceived",
      "quality",
      "supplierName",
      "reciever",
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

    // Numeric validation
    const costPrice = document.getElementById("costPrice");
    if (costPrice.value && Number(costPrice.value) < 0) {
      isValid = false;
      costPrice.classList.add("error-input");
      const error = document.createElement("span");
      error.className = "error-msg";
      error.textContent = "Cost price cannot be negative";
      costPrice.parentNode.appendChild(error);
    }

    const quantity = document.getElementById("quantity");
    if (quantity.value && Number(quantity.value) < 1) {
      isValid = false;
      quantity.classList.add("error-input");
      const error = document.createElement("span");
      error.className = "error-msg";
      error.textContent = "Quantity must be at least 1";
      quantity.parentNode.appendChild(error);
    }

    if (!isValid) e.preventDefault(); // prevent submission if invalid
  });

  // Remove error as user types or changes select
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
// Clear the form
//Clear form
document.getElementById("clearButton").addEventListener("click", function () {
  window.location.reload(); // refreshes the page
});
