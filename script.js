// Main variables
const inputField = document.getElementById('input-field');
const historyList = document.getElementById('history-list');
const clearHistoryButton = document.getElementById('clear-history');

// Retrieve history from localStorage
let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

// Update history UI
function updateHistory() {
    historyList.innerHTML = '';
    history.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item}
            <button onclick="deleteHistory(${index})">X</button>
        `;
        historyList.appendChild(listItem);
    });
    localStorage.setItem('calcHistory', JSON.stringify(history));
}

// Delete a specific history item
function deleteHistory(index) {
    history.splice(index, 1);
    updateHistory();
}

// Clear entire history
clearHistoryButton.addEventListener('click', () => {
    history = [];
    updateHistory();
});

// Append input values
document.querySelectorAll('.number, .operator').forEach(button => {
    button.addEventListener('click', () => {
        inputField.value += button.textContent;
    });
});

// Clear input field
document.querySelector('.clear').addEventListener('click', () => {
    inputField.value = '';
});

// Perform calculation
document.querySelector('.equals').addEventListener('click', () => {
    try {
        const result = eval(inputField.value);
        history.push(`${inputField.value} = ${result}`);
        inputField.value = result;
        updateHistory();
    } catch (error) {
        inputField.value = 'Error';
    }
});

// Load history on page load
updateHistory();
