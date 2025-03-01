const input = document.getElementById("user-input");
const result = document.getElementById("result-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

const validNumber = (phone) => {
  const validPatterns = [
    /^1?\s?\d{3}-\d{3}-\d{4}$/,
    /^1?\s?\(\d{3}\)\s?\d{3}-\d{4}$/,
    /^1?\s?\d{3}\s\d{3}\s\d{4}$/,
    /^1?\d{10}$/,
  ];

  return validPatterns.some((pattern) => pattern.test(phone));
};

const check = () => {
  const phoneNumber = input.value.trim();
  if (!phoneNumber) {
    result.textContent = "Please provide a number";
    return;
  }
  if (validNumber(phoneNumber)) {
    result.textContent = `Valid US number: ${phoneNumber}`;
  } else {
    result.textContent = `Invalid US number: ${phoneNumber}`;
  }
};

checkBtn.addEventListener("click", check);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    check();
  }
});

clearBtn.addEventListener("click", () => {
  result.textContent = "";
  input.value = "";
});
