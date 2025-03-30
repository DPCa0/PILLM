 

 
class AdvancedCalculator {
   
  #history = [];

   
  #logOperation(operation, result) {
    this.#history.push({ operation, result });
  }

   
  add(a, b) {
    const result = a + b;
    this.#logOperation(`${a} + ${b}`, result);
    return result;
  }

   
  subtract(a, b) {
    const result = a - b;
    this.#logOperation(`${a} - ${b}`, result);
    return result;
  }

   
  *getHistory() {
    for (let entry of this.#history) {
      yield entry;
    }
  }
}

 
function calculateAndLog(calc, ...operations) {
  for (let [operation, a, b] of operations) {
    let result;
    switch (operation) {
      case 'add':
        result = calc.add(a, b);
        break;
      case 'subtract':
        result = calc.subtract(a, b);
        break;
      default:
        print(`Unknown operation: ${operation}`);
        continue;
    }
    print(`Result of ${operation}(${a}, ${b}): ${result}`);
  }
}

 
const calculator = new AdvancedCalculator();

 
calculateAndLog(
  calculator,
  ['add', 5, 3],
  ['subtract', 10, 4],
  ['add', 1, 2]
);

 
print('\nCalculation History:');
for (let { operation, result } of calculator.getHistory()) {
  print(`${operation} = ${result}`);
}
