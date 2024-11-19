function handleFormSubmit(event) {
    event.preventDefault();

    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    const expenseDetails = { amount, description, category };
    let data = localStorage.getItem("expenses");
    data = data ? JSON.parse(data) : [];
    data.push(expenseDetails);
    localStorage.setItem("expenses", JSON.stringify(data));

    event.target.amount.value = "";
    event.target.description.value = "";
    event.target.category.value = "";

    updateExpenseList();
}

function updateExpenseList() {
    const expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = "";

    let localStorageData = JSON.parse(localStorage.getItem("expenses")) || [];

    for (let i = 0; i < localStorageData.length; i++) {
        let data = localStorageData[i];

        const listItem = document.createElement("li");
        listItem.textContent = `Expense Amount: ${data.amount}, Description: ${data.description}, Category: ${data.category}`;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function () {
            const filteredData = localStorageData.filter((_, index) => index !== i);
            localStorage.setItem("expenses", JSON.stringify(filteredData));
            updateExpenseList();
        };
        listItem.appendChild(deleteBtn);

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = function () {
            const form = document.querySelector("form");
            form.amount.value = data.amount;
            form.description.value = data.description;
            form.category.value = data.category;

            const filteredData = localStorageData.filter((_, index) => index !== i);
            localStorage.setItem("expenses", JSON.stringify(filteredData));
            updateExpenseList();
        };
        listItem.appendChild(editBtn);

        expenseList.appendChild(listItem);
    }
}

document.addEventListener("DOMContentLoaded", updateExpenseList);

module.exports = handleFormSubmit;
