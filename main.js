document.getElementById('user-form').addEventListener('submit', function(e) {
    e.preventDefault();
    displayUserInfo();
});

document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addExpense();
    document.getElementById('expense-form').reset();
});

document.getElementById('calculate-total').addEventListener('click', calculateTotal);
document.getElementById('display-balance').addEventListener('click', displayBalance);
document.getElementById('delete-expenses').addEventListener('click', deleteAllExpenses);

let expenses = [];

function displayUserInfo() {
    const username = document.getElementById('username').value;
    const balanceAmount = parseFloat(document.getElementById('balance-amount').value);

    document.getElementById('display-username').textContent = username;
    document.getElementById('display-balance-amount').textContent = balanceAmount;
}

function addExpense() {
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    const expenseCategory = document.getElementById('expense-category').value;
    const expenseDate = document.getElementById('expense-date').value;

    const expense = {
        name: expenseName,
        amount: expenseAmount,
        category: expenseCategory,
        date: expenseDate
    };

    expenses.push(expense);
    updateExpenseList();
    updateChart(expenses);
}

function updateExpenseList() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.name} - ₹${expense.amount} (${expense.category}) on ${expense.date}`;
        expenseList.appendChild(li);
    });
}

function calculateTotal() {
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById('total-amount').textContent = totalAmount;
}

function displayBalance() {
    const balanceAmount = parseFloat(document.getElementById('balance-amount').value);
    const totalExpense = parseFloat(document.getElementById('total-amount').textContent);
    const remainingBalance = balanceAmount - totalExpense;
    document.getElementById('balance-amount-display').textContent = remainingBalance;
}

function deleteAllExpenses() {
    expenses = [];
    updateExpenseList();
    document.getElementById('total-amount').textContent = 0;
    document.getElementById('balance-amount-display').textContent = parseFloat(document.getElementById('balance-amount').value);
    updateChart(expenses);
}
