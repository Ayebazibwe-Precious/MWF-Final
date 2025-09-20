document.addEventListener("DOMContentLoaded", () => {
  const togglePassword = document.getElementById("togglePassword");
  const passwordField = document.getElementById("password");

  togglePassword.addEventListener("change", () => {
    if (togglePassword.checked) {
      passwordField.type = "text"; // show password
    } else {
      passwordField.type = "password"; // hide password
    }
  });
});
