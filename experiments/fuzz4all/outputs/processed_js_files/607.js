class FibonacciGenerator {
  constructor(max) {
    this.max = max;
    this[Symbol.iterator] = this.generatorFunction();
  }

  *generatorFunction() {
    let a = 0, b = 1;
    while (a <= this.max) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

(async () => {
  const fib = new FibonacciGenerator(100);
  const dataUrl = 'https://jsonplaceholder.typicode.com/posts';
  const posts = await fetchData(dataUrl);

  print("Fibonacci sequence up to 100:");
  for (let num of fib) {
    print(num);
  }

  if (posts) {
    print("\nFirst 5 posts titles:");
    posts.slice(0, 5).forEach(post => print(post.title));
  }
})();
