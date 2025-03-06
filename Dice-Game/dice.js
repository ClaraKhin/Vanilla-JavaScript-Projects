const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let round = 1;
let rolls = 0;

const rollDice = () => {
  diceValuesArr = Array.from(
    { length: 5 },
    () => Math.floor(Math.random() * 6) + 1
  );
  listOfAllDice.forEach(
    (dice, index) => (dice.textContent = diceValuesArr[index])
  );
};

const updateStats = () => {
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
};

const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`;
};

const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue);
  totalScoreElement.textContent = score;
  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

const getHighestDuplicates = (arr) => {
  const counts = arr.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});
  const highestCount = Math.max(...Object.values(counts));

  if (highestCount >= 4)
    updateRadioOption(
      1,
      arr.reduce((a, b) => a + b, 0)
    );
  if (highestCount >= 3)
    updateRadioOption(
      0,
      arr.reduce((a, b) => a + b, 0)
    );
};

const detectFullHouse = (arr) => {
  const counts = arr.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});
  if (Object.values(counts).includes(3) && Object.values(counts).includes(2))
    updateRadioOption(2, 25);
};

const checkForStraights = (arr) => {
  const sortedNumbersArr = arr.sort((a, b) => a - b);
  const uniqueNumbersArr = [...new Set(sortedNumbersArr)];
  const uniqueNumbersStr = uniqueNumbersArr.join("");
  const smallStraights = ["1234", "2345", "3456"];
  const largeStraights = ["12345", "23456"];

  if (smallStraights.some((straight) => uniqueNumbersStr.includes(straight)))
    updateRadioOption(3, 30);
  if (largeStraights.includes(uniqueNumbersStr)) updateRadioOption(4, 40);
};

const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  });
  scoreSpans.forEach((span) => (span.textContent = ""));
};

const resetGame = () => {
  diceValuesArr = [0, 0, 0, 0, 0];
  score = 0;
  round = 1;
  rolls = 0;
  listOfAllDice.forEach((dice) => (dice.textContent = 0));
  totalScoreElement.textContent = score;
  scoreHistory.innerHTML = "";
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
  resetRadioOptions();
};

rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("You have made three rolls this round. Please select a score.");
  } else {
    rolls++;
    resetRadioOptions();
    rollDice();
    updateStats();
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);
    checkForStraights(diceValuesArr);
    updateRadioOption(5, 0); // Enable "None of the Above" option here
  }
});

rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;
  rulesBtn.textContent = isModalShowing ? "Hide rules" : "Show rules";
  rulesContainer.style.display = isModalShowing ? "block" : "none";
});

keepScoreBtn.addEventListener("click", () => {
  const selectedValue = Array.from(scoreInputs).find(
    (input) => input.checked
  )?.value;
  if (selectedValue) {
    rolls = 0;
    round++;
    updateStats();
    resetRadioOptions();
    updateScore(selectedValue, selectedValue);
    if (round > 6) {
      setTimeout(() => {
        alert(`Game Over! Your total score is ${score}`);
        resetGame();
      }, 500);
    }
  } else {
    alert("Please select an option or roll the dice");
  }
});
