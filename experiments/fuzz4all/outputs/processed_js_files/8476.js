 
class AsyncCalculator {
  constructor() {
    this.cache = new Map();
  }

  async compute(formula) {
     
    const parsedFormula = parseFormula`${formula}`;

    if (this.cache.has(parsedFormula)) {
      print("Fetching from cache...");
      return this.cache.get(parsedFormula);
    }

     
    const { evaluate } = await import('./mathEvaluator.js');
    const result = evaluate(parsedFormula);
    
    this.cache.set(parsedFormula, result);
    return result;
  }
}

 
function parseFormula(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return `${result}${str}${values[i] || ''}`;
  }, '').replace(/\s+/g, '');  
}

(async () => {
  const calc = new AsyncCalculator();
  const formula = "3 + 5 * (2 - 8)";
  
   
  const [firstResult, secondResult] = await Promise.all([
    calc.compute(formula),
    calc.compute(formula)  
  ]);

  print(`First result: ${firstResult}`);
  print(`Second result (cached): ${secondResult}`);
})();

This code demonstrates advanced JavaScript features such as tagged template literals, dynamic import, async/await, Promise.all, and caching with Map. It represents a concise yet complex program to evaluate and cache mathematical formulas asynchronously.