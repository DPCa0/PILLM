class Fibonacci {
  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (true) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }
}

async function computeHeavyTask(num) {
  return new Promise(resolve => {
    setTimeout(() => resolve(num * num), 1000);
  });
}

async function* asyncNumberGenerator() {
  for (let i = 1; i <= 5; i++) {
    yield await computeHeavyTask(i);
  }
}

async function run() {
  print("First 5 Fibonacci numbers:");
  const fibonacci = new Fibonacci();
  const fibIterator = fibonacci[Symbol.iterator]();
  [...Array(5)].forEach(() => print(fibIterator.next().value));

  print("\nAsync squared numbers:");
  for await (const num of asyncNumberGenerator()) {
    print(num);
  }

  print("\nFinished all tasks!");
}

run();
