class Fibonacci {
  constructor() {
    this.memo = new Map([[0, 0], [1, 1]]);
  }

  compute(n) {
    if (this.memo.has(n)) return this.memo.get(n);
    let result = this.compute(n - 1) + this.compute(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const generateSequence = function* (length) {
  const fib = new Fibonacci();
  for (let i = 0; i < length; i++) {
    yield fib.compute(i);
  }
};

const sequence = generateSequence(10);
print([...sequence]);

(async () => {
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  };

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print(`Title: ${data.title}`);
  } catch (error) {
    console.error('Fetching failed:', error);
  }
})();
