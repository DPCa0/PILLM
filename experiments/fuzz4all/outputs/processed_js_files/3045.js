class Fibonacci {
  constructor(maxValue) {
    this.maxValue = maxValue;
    this[Symbol.iterator] = function*() {
      let a = 0, b = 1;
      while (a <= this.maxValue) {
        yield a;
        [a, b] = [b, a + b];
      }
    };
  }
}

async function getFibonacciSum(maxValue) {
  const fibSequence = new Fibonacci(maxValue);
  let sum = 0;
  for await (const num of fibSequence) {
    sum += num;
  }
  return sum;
}

const doubleNumbers = new Proxy([], {
  set(target, property, value) {
    target[property] = value * 2;
    return true;
  }
});

(async () => {
  const maxFibValue = 1000;
  const sumOfFibs = await getFibonacciSum(maxFibValue);
  print(`Sum of Fibonacci numbers up to ${maxFibValue}: ${sumOfFibs}`);
  
  doubleNumbers.push(5);
  print(`Doubled number in proxy array: ${doubleNumbers[0]}`);
})();
