class Fibonacci {
  #memo = new Map([[0, 0], [1, 1]]);
  
  *[Symbol.iterator]() {
    let [a, b] = [0, 1];
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
  
  nth(n) {
    if (this.#memo.has(n)) return this.#memo.get(n);
    let result = this.nth(n - 1) + this.nth(n - 2);
    this.#memo.set(n, result);
    return result;
  }
}

const fib = new Fibonacci();

 
async function logFibonacci(n) {
  print(`Fibonacci numbers up to ${n}:`);
  for (let num of fib) {
    print(num);
    if (num >= fib.nth(n)) break;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

 
Promise.all([
  logFibonacci(10),
  logFibonacci(15)
]).then(() => {
  print("All Fibonacci numbers have been logged.");
}).catch(err => {
  console.error(err);
});
