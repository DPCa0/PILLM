class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.memo = new Map([[0, 0], [1, 1]]);
  }
  
   
  compute(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    const result = this.compute(n - 1) + this.compute(n - 2);
    this.memo.set(n, result);
    return result;
  }
  
  *[Symbol.iterator]() {
    let i = 0;
    while (true) {
      const value = this.compute(i);
      if (value > this.limit) return;
      yield value;
      i++;
    }
  }
}

const limit = 1000;
const fibonacci = new Fibonacci(limit);

 
const fibArray = [...fibonacci];
print(`Fibonacci series up to ${limit}: ${fibArray}`);

 
async function getRandomNumberFact() {
  try {
    const response = await fetch('http://numbersapi.com/random/trivia');
    const fact = await response.text();
    print(`Random number fact: ${fact}`);
  } catch (error) {
    console.error('Error fetching number fact:', error);
  }
}

getRandomNumberFact();
