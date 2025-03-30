 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new CustomError(`Fetch error: ${response.statusText}`);
    }
    const data = await response.json();
    print("Data received:", data);
  } catch (error) {
    if (error instanceof CustomError) {
      console.error("Custom error occurred:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

 
function* squaresGenerator(limit) {
  for (let i = 1; i <= limit; i++) {
    yield i ** 2;
  }
}

 
const obj = { a: 1, b: 2 };
const proxy = new Proxy(obj, {
  get(target, prop, receiver) {
    print(`Getting property ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
});

 
(async () => {
  print("Starting program...");

  print("Fetching data from placeholder API...");
  await fetchData('https://jsonplaceholder.typicode.com/posts/1');

  print("Generating squares...");
  const squares = squaresGenerator(5);
  for (const square of squares) {
    print("Square:", square);
  }

  print("Using proxy object...");
  print("Value of a:", proxy.a);
  print("Value of b:", proxy.b);

  print("Delaying for 2 seconds...");
  await delay(2000);

  print("Program finished.");
})();
