class FibonacciSequence {
  #memo = new Map();

  constructor() {
    this.#memo.set(0, 0);
    this.#memo.set(1, 1);
  }

  *[Symbol.iterator]() {
    let n = 0;
    while (true) {
      yield this.calculateFibonacci(n++);
    }
  }

  calculateFibonacci(n) {
    if (this.#memo.has(n)) {
      return this.#memo.get(n);
    }
    const value = this.calculateFibonacci(n - 1) + this.calculateFibonacci(n - 2);
    this.#memo.set(n, value);
    return value;
  }
}

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

const fetchFibonacciFact = async (num) => {
  try {
    const data = await fetchJSON(`https: 
    print(`Fact about ${num}: ${data}`);
  } catch (error) {
    console.error('Error fetching fact:', error);
  }
};

(async function main() {
  const fibonacci = new FibonacciSequence();
  const iterator = fibonacci[Symbol.iterator]();
  const numbersToFetch = [...Array(5)].map(() => iterator.next().value);

   
  await Promise.all(numbersToFetch.map(fetchFibonacciFact));
})();
