 

 
class ComplexCalculator {
  #factor;

  constructor(factor) {
    this.#factor = factor;
  }

  static async multiplyAsync(num, factor) {
     
    return new Promise((resolve) => setTimeout(() => resolve(num * factor), 1000));
  }

   
  createMultiplier() {
    return (num) => num * this.#factor;
  }
}

 
(async () => {
  const calculator = new ComplexCalculator(5);
  const multiplier = calculator.createMultiplier();

   
  const asyncResult = await ComplexCalculator.multiplyAsync(10, 2);
  print(`Async result: ${asyncResult}`);  

  const closureResult = multiplier(10);
  print(`Closure result: ${closureResult}`);  
})();
