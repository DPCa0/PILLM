class ComplexCalculator {
  constructor() {
    this.cache = new Map();
  }

  memoize(fn) {
    return (...args) => {
      const key = JSON.stringify(args);
      if (this.cache.has(key)) {
        print('Fetching from cache:', key);
        return this.cache.get(key);
      }
      const result = fn(...args);
      this.cache.set(key, result);
      return result;
    };
  }

  *fibonacci(n) {
    let a = 0, b = 1;
    while (n-- > 0) {
      [a, b] = [b, a + b];
      yield a;
    }
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async calculateComplexEquation(x, y) {
    print('Calculating complex equation...');
    await this.delay(1000);
    return x ** y + Math.sqrt(x * y);
  }

  async main() {
     
    const handler = {
      set(obj, prop, value) {
        if (prop === 'num' && typeof value !== 'number') {
          throw new TypeError('Expected a number');
        }
        obj[prop] = value;
        return true;
      }
    };

    const settings = new Proxy({ num: 0 }, handler);
    settings.num = 5;

    print(`Fibonacci sequence up to ${settings.num}:`);
    for (let num of this.fibonacci(settings.num)) {
      print(num);
    }

     
    const memoizedCalculation = this.memoize(this.calculateComplexEquation);
    print('Result:', await memoizedCalculation(5, 3));
    print('Result:', await memoizedCalculation(5, 3));  
  }
}

const calculator = new ComplexCalculator();
calculator.main().catch(console.error);
