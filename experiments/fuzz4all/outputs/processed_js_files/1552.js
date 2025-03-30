 
class ComplexCalculator {
  #history = [];
  
  constructor(name) {
    this.name = name;
  }
  
   
  static getInstance(name) {
    return new ComplexCalculator(name);
  }

   
  #logOperation(operation, result) {
    this.#history.push({ operation, result });
  }

   
  async calculate(operation) {
    const [operand1, operator, operand2] = operation.split(' ');
    const num1 = BigInt(operand1);
    const num2 = BigInt(operand2);
    
    let result;
    switch (operator) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      case '/': result = num1 / num2; break;
      default: throw new Error('Invalid operation');
    }
    
     
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.#logOperation(operation, result);
    return result;
  }

   
  *getHistory() {
    yield* this.#history;
  }
}

(async () => {
  const calc = ComplexCalculator.getInstance('AdvancedCalc');
  
  print('Calculating 12345678901234567890 + 98765432109876543210...');
  print(await calc.calculate('12345678901234567890 + 98765432109876543210'));  
  
  print('Calculating 98765432109876543210 - 12345678901234567890...');
  print(await calc.calculate('98765432109876543210 - 12345678901234567890'));  
  
  print('Operation History:');
  for (const entry of calc.getHistory()) {
    print(`${entry.operation} = ${entry.result}`);
  }
})();
