document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const body = document.body;
  const toggleBtn = document.getElementById("toggle-btn");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
      body.classList.toggle("sidebar-collapsed");
  });
});



