document.addEventListener("DOMContentLoaded", () => {
  /* ========== FORM VALIDATION ========== */
  const form = document.getElementById("productForm");

  if (form) {
    function showError(input, message) {
      removeError(input);
      const error = document.createElement("small");
      error.classList.add("error-message");
      error.textContent = message;
      input.classList.add("invalid");
      input.insertAdjacentElement("afterend", error);
    }

    function removeError(input) {
      input.classList.remove("invalid");
      const nextEl = input.nextElementSibling;
      if (nextEl && nextEl.classList.contains("error-message")) {
        nextEl.remove();
      }
    }

    function validateForm() {
      let isValid = true;
      const requiredInputs = form.querySelectorAll(
        "input[required], select[required], textarea[required]"
      );

      requiredInputs.forEach((input) => {
        const value = input.value.trim();
        if (
          !value ||
          value === "--Select Name--" ||
          value === "--Select Type--"
        ) {
          showError(input, "This field is required");
          isValid = false;
        } else {
          removeError(input);
        }
      });

      const numberInputs = form.querySelectorAll('input[type="number"]');
      numberInputs.forEach((input) => {
        const value = input.value.trim();
        if (value && Number(value) < 0) {
          showError(input, "Value must be positive");
          isValid = false;
        }
      });

      return isValid;
    }

    form.querySelectorAll("input, select, textarea").forEach((input) => {
      input.addEventListener("input", () => removeError(input));
      input.addEventListener("change", () => removeError(input));
    });

    form.addEventListener("submit", (e) => {
      if (!validateForm()) e.preventDefault();
    });
  }
});
