class AdvancedCalculator {
  constructor() {
    this.history = [];
  }

   
  sum(...numbers) {
    const result = numbers.reduce((acc, val) => acc + val, 0);
    this.addToHistory('sum', numbers, result);
    return result;
  }

   
  max(...numbers) {
    const result = Math.max(...numbers);
    this.addToHistory('max', numbers, result);
    return result;
  }

  min(...numbers) {
    const result = Math.min(...numbers);
    this.addToHistory('min', numbers, result);
    return result;
  }

   
  getHistory() {
    return this.history.map(({ operation, numbers, result }) => 
      `${operation}(${numbers.join(', ')}) = ${result}`
    ).join('\n');
  }

   
  #addToHistory(operation, numbers, result) {
    this.history.push({ operation, numbers, result });
  }
}

const calc = new AdvancedCalculator();

print(calc.sum(1, 2, 3, 4));  
print(calc.max(5, 10, 15));   
print(calc.min(5, 10, 15));   
print(calc.getHistory());
