class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  return response.json();
}

const main = async () => {
  const fib = fibonacci();
  const deferred = new Deferred();

  setTimeout(() => {
    deferred.resolve('Hello from deferred!');
  }, 1000);

  try {
    print('Fetching data...');
    const data = await getData();
    print('Data fetched:', data);

    print('Fibonacci sequence:');
    for (let i = 0; i < 5; i++) {
      print(fib.next().value);
    }

    const message = await deferred.promise;
    print(message);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

main();
