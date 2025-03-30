 
function logCalls(target, name, descriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args) {
    print(`Calling ${name} with`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

class AdvancedCalculator {
  constructor() {
    this.result = 0;
  }

   
  @logCalls
  add(a, b) {
    this.result = a + b;
    return this;
  }

  @logCalls
  multiply(a, b) {
    this.result = a * b;
    return this;
  }

   
  static createCalculatorProxy() {
    return new Proxy(new AdvancedCalculator(), {
      get(target, prop) {
        if (prop === 'result') {
          print(`Accessing result: ${target[prop]}`);
        }
        return target[prop];
      },
      set(target, prop, value) {
        if (prop === 'result' && typeof value !== 'number') {
          throw new Error('Result must be a number');
        }
        target[prop] = value;
        return true;
      }
    });
  }
}

 
function* calculationSequence(calc) {
  yield calc.add(1, 2).result;
  yield calc.multiply(3, 4).result;
}

 
const calcProxy = AdvancedCalculator.createCalculatorProxy();

 
const sequence = calculationSequence(calcProxy);

for (const value of sequence) {
  print('Yielded Result:', value);
}
