const amountInput = document.getElementById("amount");
const termInput = document.getElementById("term");
const interestInput = document.getElementById("interest");
const mortgageTypeInputs = document.querySelectorAll(
  "input[name='mortgage-type']"
);
const resultMonthly = document.getElementById("monthly-payment");
const resultTotal = document.getElementById("total-repayment");
const calculateBtn = document.getElementById("calculate");
const clearBtn = document.querySelector(".clear");

const principal = parseFloat(amountInput.value.replace(/,/g, ""));
const years = parseFloat(termInput.value);
const annualRate = parseFloat(interestInput.value);

const monthlyRate = annualRate / 100 / 12;
const numPayments = years * 12;

//error state
const amountErr = document.getElementById("amount-error");
const termErr = document.getElementById("term-error");
const interestErr = document.getElementById("interest-error");

const calculate = () => {
  let monthlyPayment = 0;
  let totalRepayment = 0;
  const principal = parseFloat(amountInput.value.replace(/,/g, ""));
  const years = parseFloat(termInput.value);
  const annualRate = parseFloat(interestInput.value);

  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  const mortgageType = document.querySelector(
    "input[name='mortgage-type']:checked"
  ).value;
  if (isNaN(principal) || isNaN(years) || isNaN(annualRate)) {
    amountErr.textContent = `This field is required`;
    termErr.textContent = `This field is required`;
    interestErr.textContent = `This field is required`;
    return;
  } else if (mortgageType === "repayment") {
    monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    totalRepayment = monthlyPayment * numPayments;
  } else {
    monthlyPayment = (principal * (annualRate / 100)) / 12;
    totalRepayment = monthlyPayment * 12 * years;
  }

  resultMonthly.textContent = `£${monthlyPayment.toLocaleString(undefined, {
    minimumFractionDigits: 2,
  })}`;
  resultTotal.textContent = `£${totalRepayment.toLocaleString(undefined, {
    minimumFractionDigits: 2,
  })}`;
};

calculateBtn.addEventListener("click", calculate);
