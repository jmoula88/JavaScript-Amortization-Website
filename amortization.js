// Function to calculate amortization and display the table
function amortization(balance, interestRate, terms) {
    var monthlyRate = interestRate / 12 / 100;
    var monthlyPayment = balance * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -terms)));

    var table = document.getElementById('amortizationTable').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // Clear existing table rows

    var remainingBalance = balance;
    for (var i = 1; i <= terms; i++) {
        var interestAmount = remainingBalance * monthlyRate;
        var principalAmount = monthlyPayment - interestAmount;
        remainingBalance -= principalAmount;

        var newRow = table.insertRow();
        newRow.insertCell(0).textContent = i;
        newRow.insertCell(1).textContent = monthlyPayment.toFixed(2);
        newRow.insertCell(2).textContent = interestAmount.toFixed(2);
        newRow.insertCell(3).textContent = principalAmount.toFixed(2);
        newRow.insertCell(4).textContent = remainingBalance.toFixed(2);
    }
}
