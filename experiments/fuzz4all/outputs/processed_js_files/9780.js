class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this.sequence = this.#generateFibonacci();
  }

   
  #generateFibonacci() {
    const seq = [0, 1];
    for (let i = 2; i < this.limit; i++) {
      seq[i] = seq[i - 1] + seq[i - 2];
    }
    return seq;
  }

  *[Symbol.iterator]() {
    for (const number of this.sequence) {
      yield number;
    }
  }

  static async fetchFibonacciFromAPI(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch Fibonacci data:', error);
    }
  }
}

(async () => {
  const fibonacci = new FibonacciSequence(10);
  print([...fibonacci]);

  const apiUrl = 'https://example.com/fibonacci';  
  const apiData = await FibonacciSequence.fetchFibonacciFromAPI(apiUrl);
  print(apiData);
})();

 
 
 
 
 
