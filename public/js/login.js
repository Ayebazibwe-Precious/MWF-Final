document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");
  const showPasswordCheckbox = document.getElementById("showPassword");

  // Create reusable helper for error message
  function createErrorElement(input) {
    const error = document.createElement("div");
    error.classList.add("error-message");
    input.insertAdjacentElement("afterend", error);
    return error;
  }

  // Attach error elements
  const emailError = createErrorElement(emailField);
  const passwordError = createErrorElement(passwordField);

  // Regex for basic email validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

  // Clear password on load
  passwordField.value = "";

  // Show/hide password
  showPasswordCheckbox.addEventListener("change", () => {
    passwordField.type = showPasswordCheckbox.checked ? "text" : "password";
  });

  // Validation logic
  function validateEmail() {
    const value = emailField.value.trim();
    if (!value) {
      emailError.textContent = "Email is required";
      emailField.classList.add("invalid");
      return false;
    } else if (!emailPattern.test(value)) {
      emailError.textContent = "Please enter a valid email address";
      emailField.classList.add("invalid");
      return false;
    } else {
      emailError.textContent = "";
      emailField.classList.remove("invalid");
      return true;
    }
  }

  function validatePassword() {
    const value = passwordField.value.trim();
    if (!value) {
      passwordError.textContent = "Password is required";
      passwordField.classList.add("invalid");
      return false;
    } else if (value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters";
      passwordField.classList.add("invalid");
      return false;
    } else {
      passwordError.textContent = "";
      passwordField.classList.remove("invalid");
      return true;
    }
  }

  // Real-time validation
  emailField.addEventListener("input", validateEmail);
  passwordField.addEventListener("input", validatePassword);

  // On submit validation
  form.addEventListener("submit", (e) => {
    const emailValid = validateEmail();
    const passwordValid = validatePassword();

    if (!emailValid || !passwordValid) {
      e.preventDefault(); // Prevent submission if invalid
    }
  });
});
