const purchaseBtn = document.getElementById("purchase-btn");
const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");

const price = 19.5;
const cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const currencyUnits = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

purchaseBtn.addEventListener("click", () => {
  let cashGiven = parseFloat(cashInput.value);
  if (isNaN(cashGiven) || cashGiven < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  let changeToGive = cashGiven - price;
  if (changeToGive === 0) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }

  let totalCid = cid.reduce((sum, denom) => sum + denom[1], 0);
  totalCid = Math.round(totalCid * 100) / 100;

  if (totalCid < changeToGive) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let changeArr = [];
  for (let i = cid.length - 1; i >= 0; i--) {
    let coinName = cid[i][0];
    let coinValue = currencyUnits[coinName];
    let available = cid[i][1];
    let amountToGive = 0;

    while (changeToGive >= coinValue && available > 0) {
      changeToGive = Math.round((changeToGive - coinValue) * 100) / 100;
      available -= coinValue;
      amountToGive += coinValue;
    }

    if (amountToGive > 0) {
      changeArr.push(`${coinName}: $${amountToGive.toFixed(2)}`);
    }
  }

  if (changeToGive > 0) {
    changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
  } else if (totalCid === parseFloat(cashInput.value) - price) {
    changeDue.textContent = `Status: CLOSED ${changeArr.join(" ")}`;
  } else {
    changeDue.textContent = `Status: OPEN ${changeArr.join(" ")}`;
  }
});
