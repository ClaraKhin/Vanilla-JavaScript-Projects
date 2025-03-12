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
const optionErrDisplay = document.getElementById("option-error");
const amountErrDisplay = document.getElementById("amounts");
const termErrDisplay = document.getElementById("terms");
const interestErrDisplay = document.getElementById("interests");
const amountSpan = document.querySelector(".amount");
const yearSpan = document.querySelector(".term");
const interestSpan = document.querySelector(".interest");

const calculate = () => {
  let monthlyPayment = 0;
  let totalRepayment = 0;
  const principal = parseFloat(amountInput.value.replace(/,/g, ""));
  const years = parseFloat(termInput.value);
  const annualRate = parseFloat(interestInput.value);

  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  const mortgageType = document.querySelector(
    "input[name='mortgage-type']"
  ).value;
  if (isNaN(principal) || isNaN(years) || isNaN(annualRate) || !mortgageType) {
    amountErr.textContent = `This field is required`;
    termErr.textContent = `This field is required`;
    interestErr.textContent = `This field is required`;
    optionErrDisplay.textContent = `This field is required`;
    amountErrDisplay.style.borderColor = "red";
    termErrDisplay.style.borderColor = "red";
    interestErrDisplay.style.borderColor = "red";
    amountSpan.style.backgroundColor = "red";
    amountSpan.style.color = "white";
    yearSpan.style.backgroundColor = "red";
    yearSpan.style.color = "white";
    interestSpan.style.backgroundColor = "red";
    interestSpan.style.color = "white";

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

clearBtn.addEventListener("click", () => {
  amountInput.value = "";
  termInput.value = "";
  interestInput.value = "";
  resultMonthly.textContent = "£0.00";
  resultTotal.textContent = "£0.00";
  mortgageTypeInputs.forEach((input) => {
    input.checked = false;
  });
});
