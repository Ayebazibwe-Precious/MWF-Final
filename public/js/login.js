document.addEventListener("DOMContentLoaded", () => {
  const passwordField = document.getElementById("password");
  const showPasswordCheckbox = document.getElementById("showPassword");

  // Clear password field on page load
  passwordField.value = "";

  showPasswordCheckbox.addEventListener("change", () => {
    passwordField.type = showPasswordCheckbox.checked ? "text" : "password";
  });
});
