 

class ComplexCalculator {
  constructor() {
    this.history = [];
  }

   
  *calculate(expression) {
    const result = eval(expression);
    this.history.push({ expression, result });
    yield result;
  }

  getHistory() {
    return this.history;
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Accessing property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value, receiver) => {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
async function performCalculations(calculator, expressions) {
  for (const expr of expressions) {
    const calcGen = calculator.calculate(expr);
    const result = calcGen.next().value;
    print(`Result of "${expr}" is ${result}`);
  }
  await new Promise(resolve => setTimeout(resolve, 1000));  
  print('Calculations complete.');
}

 
const expressions = ['5 + 5', '10 * 3', '8 / 2'];
const [expr1, ...restExprs] = expressions;
print(`First expression: ${expr1}`);
print(`Remaining expressions: ${restExprs}`);

 
const calculator = new Proxy(new ComplexCalculator(), handler);

 
performCalculations(calculator, expressions).then(() => {
  print('History:', calculator.getHistory());
});
