document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const table = document.getElementById("stockTable");
  const rows = table.querySelectorAll("tbody tr");

  // Search functionality
  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    let visibleCount = 0;

    rows.forEach((row) => {
      const productNameCell = row.cells[0];
      if (!productNameCell) return;
      const productName = productNameCell.textContent.toLowerCase();
      if (productName.includes(filter)) {
        row.style.display = "";
        visibleCount++;
      } else {
        row.style.display = "none";
      }
    });

    if (visibleCount === 0) {
      if (!table.querySelector(".not-found")) {
        const newRow = document.createElement("tr");
        newRow.classList.add("not-found");
        newRow.innerHTML = `<td colspan="11">Product not found</td>`;
        table.querySelector("tbody").appendChild(newRow);
      }
    } else {
      const notFound = table.querySelector(".not-found");
      if (notFound) notFound.remove();
    }
  });

  // Delete confirmation modal
  const deleteButtons = document.querySelectorAll(".delete-btn");
  const modal = document.getElementById("deleteModal");
  const confirmBtn = document.getElementById("confirmDelete");
  const cancelBtn = document.getElementById("cancelDelete");
  let formToSubmit = null;

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = btn.dataset.id;
      formToSubmit = document.createElement("form");
      formToSubmit.method = "POST";
      formToSubmit.action = "/deleteAttendantstock";
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "id";
      input.value = productId;
      formToSubmit.appendChild(input);
      modal.style.display = "block";
    });
  });

  confirmBtn.addEventListener("click", () => {
    if (formToSubmit) {
      document.body.appendChild(formToSubmit);
      formToSubmit.submit();
    }
  });

  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
    formToSubmit = null;
  });

  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
      formToSubmit = null;
    }
  });
});
