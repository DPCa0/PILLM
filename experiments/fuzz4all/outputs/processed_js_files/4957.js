class Fibonacci {
  constructor(max) {
    this.max = max;
    this.memo = new Proxy({}, {
      get: (target, name) => {
        if (!(name in target)) {
          target[name] = this.calculate(name);
        }
        return target[name];
      }
    });
  }

  calculate(n) {
    if (n <= 1) return n;
    return this.memo[n - 1] + this.memo[n - 2];
  }

  *[Symbol.iterator]() {
    let i = 0;
    while (this.memo[i] <= this.max) {
      yield this.memo[i++];
    }
  }
}

async function displayFibonacciSequence(max) {
  const fib = new Fibonacci(max);
  for await (const number of fib) {
    print(number);
  }
}

function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const handleResize = debounce(() => {
  print('Resized to', window.innerWidth, 'x', window.innerHeight);
}, 200);

window.addEventListener('resize', handleResize);

(async () => {
  const maxNumber = 100;
  print(`Fibonacci sequence up to ${maxNumber}:`);
  await displayFibonacciSequence(maxNumber);
})();
