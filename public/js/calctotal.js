document.getElementById("unitPrice").addEventListener("change", function () {
  const unitPrice = parseFloat(document.getElementById("unitPrice").value);
  const quantity = parseFloat(document.getElementById("quantity").value);
  const total = document.getElementById("total");
  if (!isNaN(quantity) && !isNaN(unitPrice)) {
    const totalCost = (quantity * unitPrice).toFixed(0);
    total.value = totalCost;
  } else {
    total.value = "";
  }
});
