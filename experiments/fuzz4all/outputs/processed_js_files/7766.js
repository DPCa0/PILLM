class MathUtil {
   
  #cache = new Map();

   
  *fibonacci(n) {
    let [a, b] = [0, 1];
    while (n-- > 0) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

   
  async calculateFibonacciAsync(n) {
    if (this.#cache.has(n)) return this.#cache.get(n);

    return new Promise((resolve) => {
      setTimeout(() => {
        const result = [...this.fibonacci(n)];
        this.#cache.set(n, result);
        resolve(result);
      }, 1000);  
    });
  }

   
  static calculateSum(...numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
  }
}

 
(async () => {
  const mathUtil = new MathUtil();
  const n = 10;
  
   
  const fibNumbers = await mathUtil.calculateFibonacciAsync(n);
  print(`Fibonacci sequence up to ${n}:`, fibNumbers);

   
  const sum = MathUtil.calculateSum(...fibNumbers);
  print(`Sum of Fibonacci numbers:`, sum);
})();
