// Function to validate and get input values from the form
function getValues() {
    var principal = parseFloat(document.getElementById('principal').value);
    var interest = parseFloat(document.getElementById('interest').value);
    var term = parseInt(document.getElementById('term').value);

    if (!validateInputs(principal, interest, term)) {
        return null;
    }
    return { principal: principal, interest: interest, term: term };
}

// Function to validate the inputs
function validateInputs(principal, interest, term) {
    if (isNaN(principal) || isNaN(interest) || isNaN(term) || principal <= 0 || interest <= 0 || term <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return false;
    }
    return true;
}

// Function to display loan details and amortization table
function amortization() {
    var inputs = getValues();
    if (!inputs) return;

    var principal = inputs.principal;
    var annualRate = inputs.interest;
    var term = inputs.term;

    var monthlyRate = annualRate / 12 / 100;
    var monthlyPayment = principal * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -term)));

    // Display loan details
    document.getElementById('loanPrincipal').textContent = `$${principal.toFixed(2)}`;
    document.getElementById('loanInterest').textContent = `${annualRate.toFixed(2)}%`;
    document.getElementById('loanTerm').textContent = `${term} months`;
    document.getElementById('monthlyPayment').textContent = `$${monthlyPayment.toFixed(2)}`;
    document.getElementById('totalPayout').textContent = `$${(monthlyPayment * term).toFixed(2)}`;

    // Populate amortization table
    var tableBody = document.querySelector('#amortizationTable tbody');
    tableBody.innerHTML = ''; // Clear previous table rows
    var remainingBalance = principal;

    for (var i = 1; i <= term; i++) {
        var interestAmount = remainingBalance * monthlyRate;
        var principalAmount = monthlyPayment - interestAmount;
        remainingBalance -= principalAmount;

        var row = tableBody.insertRow();
        row.insertCell(0).textContent = i;
        row.insertCell(1).textContent = `$${monthlyPayment.toFixed(2)}`;
        row.insertCell(2).textContent = `$${interestAmount.toFixed(2)}`;
        row.insertCell(3).textContent = `$${principalAmount.toFixed(2)}`;
        row.insertCell(4).textContent = `$${remainingBalance.toFixed(2)}`;
    }
}

// Event listener for form submission
document.getElementById('loanForm').addEventListener('submit', function(event) {
    event.preventDefault();
    amortization();
});
