const input = document.getElementById("text-input");
const result = document.getElementById("result");
const check = document.getElementById("check-btn");

const resultFunction = () => {
  const text = input.value; // Get the latest input value

  if (!text) {
    alert("Please input a value!");
    return;
  }

  const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, ""); // Remove special characters
  const reversed = cleaned.split("").reverse().join(""); // Reverse cleaned text

  result.textContent = `${text} is ${
    cleaned === reversed ? "" : "not "
  }a palindrome.`;
};

check.addEventListener("click", resultFunction);
