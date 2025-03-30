class ComplexCalculator {
  constructor() {
    this.memory = new Map();
  }

  async calculate(expression) {
    const evalAsync = (expr) => new Promise((resolve, reject) => {
      try {
         
        const result = new Function('with (this) { return ' + expr + '; }').call(this.memory);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });

    return evalAsync(expression);
  }

  memorize(name, value) {
    this.memory.set(name, value);
  }

  async executeAndMemorize(name, expression) {
    try {
      const result = await this.calculate(expression);
      this.memorize(name, result);
      print(`Memorized ${name}: ${result}`);
    } catch (error) {
      console.error(`Error calculating expression: ${expression}`, error);
    }
  }
}

 
const calc = new ComplexCalculator();

 
calc.executeAndMemorize('x', '5 * 10');
calc.executeAndMemorize('y', 'x / 2');
calc.executeAndMemorize('z', 'Math.sqrt(y) + Math.pow(x, 2)');

 
setTimeout(() => {
  calc.executeAndMemorize('result', 'z + y - x');
}, 100);
