const inputNum = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");
const outputBox = document.getElementById("result-box");

const warning = () => {
  const num = inputNum.value;
  if (!num) {
    outputBox.style.display = "block";
    output.innerText = "Please enter a valid number!";
    return false;
  } else if (num < 1) {
    outputBox.style.display = "block";
    output.innerText = "Please enter a number greater than or equal to 1";
    return false;
  } else if (num >= 4000) {
    outputBox.style.display = "block";
    output.innerText = "Please enter a number less than or equal to 3999";
    return false;
  } else {
    outputBox.style.display = "none";
    return num;
  }
};

const convertToRoman = (num) => {
  const romanNumerals = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" },
  ];
  let result = "";
  for (const { value, numeral } of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
};

const handleConversion = () => {
  const validNum = warning();
  if (validNum !== false) {
    outputBox.style.display = "block";
    output.innerText = `Converted Roman Numeral: ${convertToRoman(validNum)}`;
  }
};

convertBtn.addEventListener("click", handleConversion);
inputNum.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleConversion();
  }
});
