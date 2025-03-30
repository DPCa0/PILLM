 

class Calculator {
  constructor() {
    this.log = [];
  }

  add(a, b) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = a + b;
        this.logOperation(`${a} + ${b} = ${result}`);
        resolve(result);
      }, 1000);
    });
  }

  subtract(a, b) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = a - b;
        this.logOperation(`${a} - ${b} = ${result}`);
        resolve(result);
      }, 1000);
    });
  }

  logOperation(operation) {
    this.log.push(operation);
  }

  async performOperations() {
    const numbers = { x: 5, y: 3, z: 2 };
    const { x, y, z } = numbers;
    
    try {
      const sum = await this.add(x, y);
      print(`Sum: ${sum}`);

      const diff = await this.subtract(sum, z);
      print(`Difference: ${diff}`);
    } catch (error) {
      console.error('Error performing operations:', error);
    } finally {
      print('Operation log:', this.log);
    }
  }
}

const calculator = new Calculator();
calculator.performOperations();
