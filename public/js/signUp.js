document.getElementById("signupForm").addEventListener("submit", function (e) {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;
  const errorMsg = document.getElementById("error-msg");

  if (password !== confirmPassword) {
    e.preventDefault();
    errorMsg.style.display = "block";
  } else {
    errorMsg.style.display = "none";
  }
});

// Clear button functionality
document.getElementById("clearBtn").addEventListener("click", function () {
  document.getElementById("signupForm").reset();
  document.getElementById("error-msg").style.display = "none";
});
