//table search
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const table = document.getElementById("userTable");
  const rows = table.getElementsByTagName("tr");

  searchInput.addEventListener("keyup", function () {
    const filter = searchInput.value.toLowerCase();

    // loop through all table rows except header
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      let match = false;

      // check each cell in the row
      for (let j = 0; j < cells.length -1; j++) {
        if (cells[j]) {
          const textValue = cells[j].textContent || cells[j].innerText;
          if (textValue.toLowerCase().includes(filter)) {
            match = true;
            break;
          }
        }
      }

      rows[i].style.display = match ? "" : "none";
    }
  });
});

