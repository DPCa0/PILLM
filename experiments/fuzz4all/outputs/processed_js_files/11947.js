class AsyncCalculator {
  constructor() {
    this.history = [];
  }

  async add(x, y) {
    await this.logOperation('add', x, y);
    return x + y;
  }

  async subtract(x, y) {
    await this.logOperation('subtract', x, y);
    return x - y;
  }

  async multiply(x, y) {
    await this.logOperation('multiply', x, y);
    return x * y;
  }

  async divide(x, y) {
    if (y === 0) throw new Error('Division by zero');
    await this.logOperation('divide', x, y);
    return x / y;
  }

  async logOperation(operation, x, y) {
    this.history.push({ operation, x, y, timestamp: new Date() });
    await this.persistHistory();
  }

  async persistHistory() {
     
    return new Promise(resolve => setTimeout(resolve, 100));
  }

  getHistory() {
    return [...this.history];
  }
}

(async () => {
  const calculator = new AsyncCalculator();

  try {
    print(await calculator.add(10, 5));  
    print(await calculator.subtract(10, 5));  
    print(await calculator.multiply(10, 5));  
    print(await calculator.divide(10, 5));  

     
    print(calculator.getHistory());
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
