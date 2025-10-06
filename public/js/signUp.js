document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");

  form.addEventListener("submit", function (e) {
    let isValid = true;

    // Remove all existing error messages first
    const existingErrors = document.querySelectorAll(".error-msg");
    existingErrors.forEach((err) => err.remove());

    // List of required fields
    const requiredFields = [
      "name",
      "email",
      "phone",
      "role",
      "password",
      "confirm_password",
    ];

    requiredFields.forEach((id) => {
      const input = document.getElementById(id);

      if (!input.value.trim()) {
        isValid = false;
        input.classList.add("error-input");

        const error = document.createElement("span");
        error.className = "error-msg";
        error.textContent = "This field is required";
        input.parentNode.appendChild(error);
      } else {
        input.classList.remove("error-input");
      }
    });

    // Email validation
    const email = document.getElementById("email");
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    if (email.value && !emailPattern.test(email.value)) {
      isValid = false;
      email.classList.add("error-input");

      const error = document.createElement("span");
      error.className = "error-msg";
      error.textContent = "Enter a valid email address";
      email.parentNode.appendChild(error);
    }

    // Phone number validation (numbers only, 10-15 digits)
    const phone = document.getElementById("phone");
    const phonePattern = /^[0-9]{10,15}$/;
    if (phone.value && !phonePattern.test(phone.value)) {
      isValid = false;
      phone.classList.add("error-input");

      const error = document.createElement("span");
      error.className = "error-msg";
      error.textContent = "Enter a valid phone number (10-15 digits)";
      phone.parentNode.appendChild(error);
    }

    // Password match validation
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
    if (password && confirmPassword && password !== confirmPassword) {
      isValid = false;
      const confirmInput = document.getElementById("confirm_password");
      confirmInput.classList.add("error-input");

      const error = document.createElement("span");
      error.className = "error-msg";
      error.textContent = "Passwords do not match";
      confirmInput.parentNode.appendChild(error);
    }

    if (!isValid) e.preventDefault(); // Stop form submission if invalid
  });

  // Clear button functionality
  document.getElementById("clearBtn").addEventListener("click", function () {
    form.reset();

    // Remove error messages and highlight
    document.querySelectorAll(".error-msg").forEach((err) => err.remove());
    document
      .querySelectorAll(".error-input")
      .forEach((input) => input.classList.remove("error-input"));
  });

  // Optional: remove error as user types
  const inputs = form.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("error-input");
      const nextError = input.parentNode.querySelector(".error-msg");
      if (nextError) nextError.remove();
    });
  });
});
