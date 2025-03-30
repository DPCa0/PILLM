 

class Calculator {
  constructor(...numbers) {
    this.numbers = numbers;
  }

   
  *filterEven() {
    for (const num of this.numbers) {
      if (num % 2 === 0) yield num;
    }
  }

  async sumAsync() {
    return new Promise((resolve) => {
      const sum = this.numbers.reduce((acc, curr) => acc + curr, 0);
      setTimeout(() => resolve(sum), 1000);
    });
  }
}

const processNumbers = async (...nums) => {
  const [first, second, ...rest] = nums;  
  print(`First: ${first}, Second: ${second}, Rest: ${rest}`);

  const calc = new Calculator(...nums);

  const evenNumbers = Array.from(calc.filterEven());
  print(`Even numbers: ${evenNumbers}`);

  const totalSum = await calc.sumAsync();
  print(`Sum of numbers: ${totalSum}`);
};

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
processNumbers(...data);
