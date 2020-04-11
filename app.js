//listen from submit

document.getElementById('loan-form').addEventListener('submit', function(e) {
    // Hide results
    document.getElementById('result').style.display = 'none';

    // show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 1000);


    e.preventDefault()


});



//calculate results
function calculateResults() {
    //ui var
    const amount = document.getElementById('amount');

    const interest = document.getElementById('interest');

    const years = document.getElementById('years');

    const monthlyPayment = document.getElementById('monthly-payment');

    const totalPayment = document.getElementById('total-payment');

    const totalInterest = document.getElementById('total-interest');

    // math

    const principle = parseFloat(amount.value);
    const calculatedInterst = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //compute monthly payment
    const x = Math.pow(1 + calculatedInterst, calculatedPayments);
    const monthly = (principle * x * calculatedInterst) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);
        document.getElementById('result').style.display = 'block';
        document.getElementById('loading').style.display = 'none';


    } else {
        showError('Please check your numbers');

    }
};


function showError(error) {
    document.getElementById('result').style.display = 'none';
    document.getElementById('loading').style.display = 'none';

    const errDiv = document.createElement('div');
    errDiv.className = ' alert alert-danger';

    //get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //create text node and append to div
    errDiv.appendChild(document.createTextNode(error));

    // insertbefore will take two parameter
    card.insertBefore(errDiv, heading);

    //set timeout

    setTimeout(clearErr, 3000)

}

function clearErr() {
    document.querySelector('.alert').remove();
};