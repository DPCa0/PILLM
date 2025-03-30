class Fibonacci {
  constructor(limit) {
    this.limit = limit;
  }

  *generateSequence() {
    let [prev, curr] = [0, 1];
    while (curr <= this.limit) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  static async fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    return data.title;
  }

  async displayInfo() {
    print('Fibonacci Sequence:');
    for (const num of this.generateSequence()) {
      print(num);
    }

    try {
      const title = await Fibonacci.fetchData();
      print(`Fetched Title: ${title}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

const fib = new Fibonacci(21);
fib.displayInfo();
