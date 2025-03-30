class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this.sequence = this.generateSequence();
  }

  *generateFibonacci() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }

  generateSequence() {
    return [...this.generateFibonacci()];
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async processData(url) {
    const data = await this.fetchData(url);
    const mappedData = this.sequence.map((num, index) => ({
      index,
      fibonacci: num,
      additionalData: data[index] || null,
    }));
    return mappedData;
  }
}

(async () => {
  const sequence = new FibonacciSequence(10);
  print('Fibonacci Sequence:', sequence.sequence);

  const data = await sequence.processData('https://jsonplaceholder.typicode.com/posts');
  print('Processed Data:', data);
})();
