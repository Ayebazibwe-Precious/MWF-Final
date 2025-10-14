document.addEventListener("DOMContentLoaded", () => {
  const searchUser = document.getElementById("searchUser");
  const table = document.getElementById("userTable");
  const rows = table.getElementsByTagName("tr");
  const noResults = document.getElementById("noResults");

  //  Search functionality
  function filterUsers() {
    const searchValue = searchUser.value.toLowerCase();
    let visibleCount = 0;

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.id === "noResults") continue;

      const cells = row.getElementsByTagName("td");
      if (!cells.length) continue;

      const userName = cells[0].textContent.toLowerCase();
      const matches = userName.includes(searchValue);

      row.style.display = matches ? "" : "none";
      if (matches) visibleCount++;
    }

    noResults.style.display = visibleCount === 0 ? "" : "none";
  }

  if (searchUser) searchUser.addEventListener("input", filterUsers);

  // Delete confirmation modal
  const modal = document.getElementById("confirmModal");
  const confirmMessage = document.getElementById("confirmMessage");
  const confirmYes = document.getElementById("confirmYes");
  const confirmNo = document.getElementById("confirmNo");
  let formToSubmit = null;

  document.querySelectorAll(".delete-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const userName = form.querySelector("input[name='userName']").value;
      confirmMessage.textContent = `Are you sure you want to delete "${userName}"?`;

      formToSubmit = form;
      modal.style.display = "flex";
    });
  });

  confirmYes.addEventListener("click", () => {
    if (formToSubmit) formToSubmit.submit();
    modal.style.display = "none";
  });

  confirmNo.addEventListener("click", () => {
    modal.style.display = "none";
    formToSubmit = null;
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      formToSubmit = null;
    }
  });
});
