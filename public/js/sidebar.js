document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.getElementById("toggle-btn");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });
});



