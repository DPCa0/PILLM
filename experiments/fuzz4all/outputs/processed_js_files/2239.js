 
class AdvancedCalculator {
  #history = [];
  #addToHistory(operation, result) {
    this.#history.push({ operation, result });
  }

  add(a, b) {
    const result = a + b;
    this.#addToHistory(`${a} + ${b}`, result);
    return result;
  }

  subtract(a, b) {
    const result = a - b;
    this.#addToHistory(`${a} - ${b}`, result);
    return result;
  }

  multiply(a, b) {
    const result = a * b;
    this.#addToHistory(`${a} * ${b}`, result);
    return result;
  }

  divide(a, b) {
    if (b === 0) throw new Error("Division by zero");
    const result = a / b;
    this.#addToHistory(`${a} / ${b}`, result);
    return result;
  }

  *[Symbol.iterator]() {
    for (const entry of this.#history) {
      yield entry;
    }
  }
}

 
(async () => {
  try {
     
    const { default: uuidv4 } = await import('https://jspm.dev/uuid');

    const calc = new AdvancedCalculator();
    print(`Addition: ${calc.add(5, 3)}`);
    print(`Subtraction: ${calc.subtract(9, 4)}`);
    print(`Multiplication: ${calc.multiply(7, 8)}`);
    print(`Division: ${calc.divide(16, 2)}`);

    print("Operation History:");
    for (const entry of calc) {
      print(entry);
    }

     
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await response.json();
    print(`Fetched User: ${user.name} (ID: ${uuidv4()})`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
