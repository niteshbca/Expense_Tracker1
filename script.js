
    
  function addExpense() {
    const expenseInput = document.getElementById('expense');
    const amountInput = document.getElementById('amount');
    const expensesList = document.getElementById('expenses-list');

    if (expenseInput.value && amountInput.value) {
      const expenseItem = document.createElement('div');
      expenseItem.classList.add('expense-item');
      expenseItem.innerHTML = `
        <span>${expenseInput.value}</span>
        <span>$${amountInput.value}</span>
        <button onclick="editExpense(this)">Edit</button>
        <button onclick="deleteExpense(this)">Delete</button>
      `;

      expensesList.appendChild(expenseItem);
      saveExpenses();
      expenseInput.value = '';
      amountInput.value = '';
    }
  }

  function editExpense(button) {
    const expenseItem = button.parentElement;
    const expenseName = expenseItem.children[0].innerText;
    const expenseAmount = expenseItem.children[1].innerText.slice(1);

    const newName = prompt('Edit Expense:', expenseName);
    const newAmount = prompt('Edit Amount:', expenseAmount);

    if (newName !== null && newAmount !== null) {
      expenseItem.children[0].innerText = newName;
      expenseItem.children[1].innerText = `$${newAmount}`;
      saveExpenses();
    }
  }

  function deleteExpense(button) {
    const expensesList = document.getElementById('expenses-list');
    const expenseItem = button.parentElement;
    expensesList.removeChild(expenseItem);
    saveExpenses();
  }

  function saveExpenses() {
    const expensesList = document.getElementById('expenses-list');
    const expenses = [];

    for (const expenseItem of expensesList.children) {
      const expense = {
        name: expenseItem.children[0].innerText,
        amount: expenseItem.children[1].innerText.slice(1)
      };
      expenses.push(expense);
    }

    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  function loadExpenses() {
    const expensesList = document.getElementById('expenses-list');
    const savedExpenses = localStorage.getItem('expenses');

    if (savedExpenses) {
      const expenses = JSON.parse(savedExpenses);

      for (const expense of expenses) {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
          <span>${expense.name}</span>
          <span>$${expense.amount}</span>
          <button onclick="editExpense(this)">Edit</button>
          <button onclick="deleteExpense(this)">Delete</button>
        `;

        expensesList.appendChild(expenseItem);
      }
    }
  }

  loadExpenses();
