//  FILTER FUNCTIONALITY
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const table = document.getElementById("salesTable");
  const rows = table.querySelectorAll("tbody tr");

  searchInput.addEventListener("keyup", () => {
    const query = searchInput.value.toLowerCase().trim();

    rows.forEach((row) => {
      const customer = row.children[0].textContent.toLowerCase();
      const product = row.children[1].textContent.toLowerCase();
      const date = row.children[5].textContent.toLowerCase();

      if (
        customer.includes(query) ||
        product.includes(query) ||
        date.includes(query)
      ) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });

  //  DELETE CONFIRMATION MODAL
  const deleteButtons = document.querySelectorAll(".action-btn.delete");
  const modal = document.getElementById("deleteModal");
  const confirmBtn = document.getElementById("confirmDeleteBtn");
  const cancelBtn = document.getElementById("cancelDeleteBtn");

  let formToSubmit = null;

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      formToSubmit = btn.closest("form");
      modal.classList.remove("hidden");
    });
  });

  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    formToSubmit = null;
  });

  confirmBtn.addEventListener("click", () => {
    if (formToSubmit) {
      formToSubmit.submit();
    }
    modal.classList.add("hidden");
  });
});
