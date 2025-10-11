document.addEventListener("DOMContentLoaded", () => {
  const filterName = document.getElementById("filterName");
  const filterType = document.getElementById("filterType");
  const table = document.getElementById("stockTable");
  const rows = table.getElementsByTagName("tr");
  const noResults = document.getElementById("noResults");

  //  Filter functionality
  function filterTable() {
    const nameValue = filterName.value.toLowerCase();
    const typeValue = filterType.value.toLowerCase();
    let visibleCount = 0;

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.id === "noResults") continue; // skip "no results" row

      const cells = row.getElementsByTagName("td");
      if (!cells.length) continue;

      const productName = cells[0].textContent.toLowerCase();
      const productType = cells[1].textContent.toLowerCase();

      const matchesName = productName.includes(nameValue);
      const matchesType = !typeValue || productType === typeValue;

      if (matchesName && matchesType) {
        row.style.display = "";
        visibleCount++;
      } else {
        row.style.display = "none";
      }
    }

    // Toggle "No results" row
    noResults.style.display = visibleCount === 0 ? "" : "none";
  }

  if (filterName) filterName.addEventListener("input", filterTable);
  if (filterType) filterType.addEventListener("change", filterTable);

  // 🗑 Delete confirmation (same as before)
  const modal = document.getElementById("confirmModal");
  const confirmMessage = document.getElementById("confirmMessage");
  const confirmYes = document.getElementById("confirmYes");
  const confirmNo = document.getElementById("confirmNo");
  let formToSubmit = null;

  document.querySelectorAll(".delete-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const productName = form.querySelector("input[name='productName']").value;
      confirmMessage.textContent = `Are you sure you want to delete "${productName}"?`;

      formToSubmit = form;
      modal.style.display = "block";
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
