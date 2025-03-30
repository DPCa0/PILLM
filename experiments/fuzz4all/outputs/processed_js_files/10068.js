class Fibonacci {
  #memo = new Map();

  constructor(max = 1000) {
    this.max = max;
    this[Symbol.iterator] = function* () {
      let n = 0;
      while (n < this.max) {
        yield this.compute(n++);
      }
    };
  }

  compute(n) {
    if (n <= 1) return n;
    if (this.#memo.has(n)) return this.#memo.get(n);
    const result = this.compute(n - 1) + this.compute(n - 2);
    this.#memo.set(n, result);
    return result;
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

function observeElement(selector) {
  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
}

(async () => {
  const fibo = new Fibonacci(15);
  print([...fibo]);

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print(data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }

  const observedElement = await observeElement('#dynamic-element');
  print('Element observed:', observedElement);
})();
