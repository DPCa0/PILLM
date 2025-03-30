class Fibonacci {
  constructor() {
    this.memo = new Map();
  }

  get(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    let result = this.get(n - 1) + this.get(n - 2);
    this.memo.set(n, result);
    return result;
  }
}

const fibonacci = new Fibonacci();

function* fibonacciSequence(max) {
  let i = 0;
  while (true) {
    let value = fibonacci.get(i);
    if (value > max) break;
    yield value;
    i++;
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

(async () => {
  print("Fibonacci Sequence up to 100:");
  for (let num of fibonacciSequence(100)) {
    print(num);
  }

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print("Fetched Data:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();

 
const handler = {
  get(target, prop) {
    print(`Accessing property '${prop}'`);
    return target[prop];
  }
};

const targetObject = { a: 1, b: 2, c: 3 };
const proxyObject = new Proxy(targetObject, handler);

print(proxyObject.a);  
print(proxyObject.b);  
