document.getElementById('expenseForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get input values
  const expenseName = document.getElementById('expenseName').value;
  const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

  // Add expense to the table
  const tableBody = document.querySelector('#expenseTable tbody');
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td>${expenseName}</td>
    <td>${expenseAmount.toFixed(2)}</td>
    <td><button class="delete-btn" onclick="deleteExpense(this)">Delete</button></td>
  `;

  tableBody.appendChild(newRow);

  // Update total expenses
  updateTotalExpenses();

  // Clear input fields
  document.getElementById('expenseName').value = '';
  document.getElementById('expenseAmount').value = '';
});

function deleteExpense(button) {
  const row = button.closest('tr');
  row.remove();
  updateTotalExpenses();
}

function updateTotalExpenses() {
  const amounts = document.querySelectorAll('#expenseTable tbody td:nth-child(2)');
  let total = 0;

  amounts.forEach(amount => {
    total += parseFloat(amount.textContent);
  });

  document.getElementById('totalExpenses').textContent = total.toFixed(2);
}