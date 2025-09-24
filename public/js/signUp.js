document.getElementById("signupForm").addEventListener("submit", function (e) {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  if (password !== confirmPassword) {
    e.preventDefault(); // only prevent submission if passwords don't match
    alert("Passwords do not match!");
  }
});
