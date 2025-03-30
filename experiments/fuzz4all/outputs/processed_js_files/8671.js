 
class ComplexCalculation {
  constructor(...values) {
    this.values = values;
  }

  async calculate() {
    try {
      const results = await Promise.all(this.values.map(val => this.asyncSquare(val)));
      const total = results.reduce((acc, val) => acc + val, 0);
      return total;
    } catch (error) {
      console.error('Error in calculation:', error);
    }
  }

  asyncSquare(value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (typeof value !== 'number') {
          reject('Non-numeric value encountered');
        } else {
          resolve(value * value);
        }
      }, 100);
    });
  }
}

(async () => {
  const complexCalc = new ComplexCalculation(1, 2, 3, 4, 5);
  const result = await complexCalc.calculate();
  print('The total of squares:', result);
})();

 
function logValues(...args) {
  const [first, second, ...rest] = args;
  print('First:', first);
  print('Second:', second);
  print('Rest:', rest);
}

logValues(10, 20, 30, 40, 50);
