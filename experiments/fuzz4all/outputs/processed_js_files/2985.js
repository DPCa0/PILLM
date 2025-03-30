 

class Calculator {
  constructor() {
    this.history = [];
  }

  add(...nums) {
    return nums.reduce((sum, num) => sum + num, 0);
  }

  subtract(...nums) {
    return nums.reduce((diff, num) => diff - num);
  }

  multiply(...nums) {
    return nums.reduce((product, num) => product * num, 1);
  }

  divide(...nums) {
    return nums.reduce((quotient, num) => quotient / num);
  }

  async calculate(expression) {
    const [operation, ...values] = expression.split(' ');
    const nums = values.map(Number);
    let result;

    switch (operation) {
      case 'add':
        result = this.add(...nums);
        break;
      case 'subtract':
        result = this.subtract(...nums);
        break;
      case 'multiply':
        result = this.multiply(...nums);
        break;
      case 'divide':
        result = this.divide(...nums);
        break;
      default:
        throw new Error('Unknown operation');
    }

    this.history.push({ operation, nums, result });
    return new Promise(resolve => setTimeout(() => resolve(result), 1000));
  }

  getHistory() {
    return this.history.map(({ operation, nums, result }) => 
      `${operation}(${nums.join(', ')}) = ${result}`
    ).join('\n');
  }
}

 
(async () => {
  const calc = new Calculator();
  
  try {
    print(await calc.calculate('add 5 10 15'));           
    print(await calc.calculate('subtract 100 50 10'));   
    print(await calc.calculate('multiply 2 3 4'));       
    print(await calc.calculate('divide 100 5 2'));       

    print('\nCalculation History:');
    print(calc.getHistory());
  } catch (error) {
    console.error('Calculation Error:', error);
  }
})();
