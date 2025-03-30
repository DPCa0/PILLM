 

class ComplexCalculator {
  constructor(...numbers) {
    this.numbers = numbers;
  }
  
   
  add(...newNumbers) {
    this.numbers.push(...newNumbers);
    return this.numbers.reduce((acc, curr) => acc + curr, 0);
  }

   
  subtractAsync(...numbersToSubtract) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = this.numbers.reduce((acc, curr) => acc - curr, numbersToSubtract.reduce((acc, curr) => acc + curr, 0));
        resolve(result);
      }, 1000);
    });
  }

   
  async multiplyAsync(factor) {
    const result = await new Promise((resolve) => {
      setTimeout(() => {
        const multiplied = this.numbers.map(num => num * factor);
        resolve(multiplied.reduce((acc, curr) => acc + curr, 0));
      }, 1000);
    });
    return result;
  }
}

(async () => {
  const calculator = new ComplexCalculator(10, 20, 30);
  const sum = calculator.add(5, 15);
  print('Sum:', sum);

  const difference = await calculator.subtractAsync(5, 10);
  print('Difference:', difference);

  const product = await calculator.multiplyAsync(2);
  print('Product:', product);
})();
