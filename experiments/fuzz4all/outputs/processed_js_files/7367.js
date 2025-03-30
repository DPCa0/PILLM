(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  function* fibonacci(n) {
    let [a, b, i] = [0, 1, 0];
    while (i < n) {
      yield a;
      [a, b] = [b, a + b];
      i++;
    }
  }

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async function main() {
    print('Fetching data...');
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print('Fetched data:', data);

    print('Generating Fibonacci sequence...');
    const fibSeq = [...fibonacci(10)];
    print('Fibonacci sequence:', fibSeq);

    print('Delaying for 2 seconds...');
    await delay(2000);

    print('Composing functions...');
    const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
    const add2 = x => x + 2;
    const multiply3 = x => x * 3;
    const combined = compose(multiply3, add2);

    print('Result of composing add2 and multiply3 on 5:', combined(5));
  }

  main();
})();
