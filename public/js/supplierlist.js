document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const table = document.getElementById("supplierTable");
  const rows = table.getElementsByTagName("tr");
  const noResults = document.getElementById("noResults");

  //  Filter suppliers
  function filterTable() {
    const query = searchInput.value.toLowerCase();
    let visibleCount = 0;

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.id === "noResults") continue;

      const cells = row.getElementsByTagName("td");
      if (!cells.length) continue;

      const rowText = Array.from(cells)
        .map((td) => td.textContent.toLowerCase())
        .join(" ");
      if (rowText.includes(query)) {
        row.style.display = "";
        visibleCount++;
      } else {
        row.style.display = "none";
      }
    }

    noResults.style.display = visibleCount === 0 ? "" : "none";
  }

  if (searchInput) searchInput.addEventListener("input", filterTable);

  // 🗑 Delete confirmation modal
  const modal = document.getElementById("confirmModal");
  const confirmMessage = document.getElementById("confirmMessage");
  const confirmYes = document.getElementById("confirmYes");
  const confirmNo = document.getElementById("confirmNo");
  let formToSubmit = null;

  document.querySelectorAll(".delete-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const supplierName = form.querySelector(
        "input[name='supplierName']"
      ).value;
      confirmMessage.textContent = `Are you sure you want to delete "${supplierName}"?`;

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
