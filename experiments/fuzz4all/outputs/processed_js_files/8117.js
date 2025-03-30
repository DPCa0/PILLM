 
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

 
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

 
const asyncFibonacci = async (n) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fibonacci(n));
    }, 1000);
  });
};

 
(async () => {
  try {
    const inputNumber = 10;  
    print(`Calculating Fibonacci for ${inputNumber}...`);
    const result = await asyncFibonacci(inputNumber);
    print(`Fibonacci(${inputNumber}) = ${result}`);
  } catch (error) {
    console.error('Error calculating Fibonacci:', error);
  }
})();

 
const uniqueFibNumbers = new Set();
for (let i = 0; i <= 10; i++) {
  uniqueFibNumbers.add(fibonacci(i));
}
print('Unique Fibonacci numbers up to 10:', [...uniqueFibNumbers]);

 
const [first, second, ...rest] = [...uniqueFibNumbers];
print('First:', first, 'Second:', second, 'Rest:', rest);
