const calculate = () => {
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);
  const numbers = array.map((el) => Number(el)).filter((el) => !isNaN(el));
  //The .map() method is called on the array, and then the .filter() method is called on the result of the .map() method.
  // This is called method chaining.

  
};
