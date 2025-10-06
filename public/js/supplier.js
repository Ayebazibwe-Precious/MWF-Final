// supplierValidation.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    let isValid = true;

    // Fields to validate
    const requiredFields = ["name", "company", "email", "phone", "productType"];

    requiredFields.forEach((id) => {
      const input = document.getElementById(id);

      // Remove previous error messages
      if (
        input.nextElementSibling &&
        input.nextElementSibling.classList.contains("error-msg")
      ) {
        input.nextElementSibling.remove();
      }

      // Check if field is empty
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = "red";
        const error = document.createElement("span");
        error.className = "error-msg";
        error.style.color = "red";
        error.style.fontSize = "12px";
        error.textContent = "This field is required";
        input.parentNode.appendChild(error);
      } else {
        input.style.borderColor = "#ccc";
      }
    });

    // Email validation
    const email = document.getElementById("email");
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email.value && !emailPattern.test(email.value)) {
      isValid = false;
      email.style.borderColor = "red";
      const error = document.createElement("span");
      error.className = "error-msg";
      error.style.color = "red";
      error.style.fontSize = "12px";
      error.textContent = "Enter a valid email";
      email.parentNode.appendChild(error);
    }

    // Phone validation
    const phone = document.getElementById("phone");
    const phonePattern = /^[0-9]{10,15}$/;
    if (phone.value && !phonePattern.test(phone.value)) {
      isValid = false;
      phone.style.borderColor = "red";
      const error = document.createElement("span");
      error.className = "error-msg";
      error.style.color = "red";
      error.style.fontSize = "12px";
      error.textContent = "Enter a valid phone number";
      phone.parentNode.appendChild(error);
    }

    if (!isValid) e.preventDefault(); // Prevent form submission if invalid
  });
});
