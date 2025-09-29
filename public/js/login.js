// document.addEventListener("DOMContentLoaded", () => {
//   const passwordField = document.getElementById("password");
//   const showPasswordCheckbox = document.getElementById("showPassword");

//   // Clear password field on page load
//   passwordField.value = "";

//   showPasswordCheckbox.addEventListener("change", () => {
//     passwordField.type = showPasswordCheckbox.checked ? "text" : "password";
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");
  const showPasswordCheckbox = document.getElementById("showPassword");

  // Create error elements dynamically
  const emailError = document.createElement("div");
  emailError.classList.add("error-message");
  emailField.insertAdjacentElement("afterend", emailError);

  const passwordError = document.createElement("div");
  passwordError.classList.add("error-message");
  passwordField.insertAdjacentElement("afterend", passwordError);

  // Regex for basic email validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

  // Clear password on load
  passwordField.value = "";

  // Show/hide password
  showPasswordCheckbox.addEventListener("change", () => {
    passwordField.type = showPasswordCheckbox.checked ? "text" : "password";
  });

  // Real-time email validation
  emailField.addEventListener("input", () => {
    if (!emailField.value.match(emailPattern)) {
      emailError.textContent = "Please enter a valid email address";
      emailField.classList.add("invalid");
    } else {
      emailError.textContent = "";
      emailField.classList.remove("invalid");
    }
  });

  // Real-time password validation
  passwordField.addEventListener("input", () => {
    if (passwordField.value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters";
      passwordField.classList.add("invalid");
    } else {
      passwordError.textContent = "";
      passwordField.classList.remove("invalid");
    }
  });

  // Prevent form submission if invalid
  form.addEventListener("submit", (e) => {
    let valid = true;

    if (!emailField.value.match(emailPattern)) {
      emailError.textContent = "Please enter a valid email address";
      valid = false;
    }

    if (passwordField.value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters";
      valid = false;
    }

    if (!valid) {
      e.preventDefault(); // Stop form submission
    }
  });
});



