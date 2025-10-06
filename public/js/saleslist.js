script
  const searchInput = document.getElementById('searchInput');
  const table = document.getElementById('salesTable');
  const tbody = table.getElementsByTagName('tbody')[0];

  searchInput.addEventListener('keyup', function() {
      const filter = searchInput.value.toLowerCase();

      Array.from(tbody.rows).forEach(row => {
          const customerName = row.cells[0].textContent.toLowerCase();
          const productName = row.cells[1].textContent.toLowerCase();
          const productType = row.cells[2].textContent.toLowerCase();
          const saleDate = row.cells[5].textContent.toLowerCase();

          if (customerName.includes(filter) ||
              productName.includes(filter) ||
              productType.includes(filter) ||
              saleDate.includes(filter)) {
              row.style.display = '';
          } else {
              row.style.display = 'none';
          }
      });
  });
