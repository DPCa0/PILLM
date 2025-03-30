(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  class Fibonacci {
    constructor(limit) {
      this.limit = limit;
    }

    *sequence() {
      let [a, b] = [0, 1];
      while (a < this.limit) {
        yield a;
        [a, b] = [b, a + b];
      }
    }
  }

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  };

  try {
    const fib = new Fibonacci(100);
    const results = [];
    
    for (const num of fib.sequence()) {
      print(`Fibonacci number: ${num}`);
      results.push(num);
      await delay(500);  
    }

    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched Data:', data);

    const doubledFib = results.map(num => num * 2);
    const doubledResults = doubledFib.reduce((acc, val) => ({ ...acc, [val]: val }), {});

    print('Doubled Fibonacci:', doubledResults);
  } catch (error) {
    console.error('Error encountered:', error);
  }
})();
