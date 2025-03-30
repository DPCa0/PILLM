const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

const debounce = (fn, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
};

const memoize = (fn) => {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn.apply(this, args));
    }
    return cache.get(key);
  };
};

const throttle = (fn, limit) => {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
};

const complexCalculation = (a, b) => {
  print(`Calculating: ${a} + ${b}`);
  return a + b;
};

const logResult = result => print(`Result: ${result}`);

const advancedFunction = compose(
  debounce(logResult, 1000),
  memoize(throttle(complexCalculation, 500))
);

advancedFunction(5, 10);
setTimeout(() => advancedFunction(5, 10), 200);
setTimeout(() => advancedFunction(5, 10), 600);
setTimeout(() => advancedFunction(7, 3), 1200);
setTimeout(() => advancedFunction(5, 10), 3000);
