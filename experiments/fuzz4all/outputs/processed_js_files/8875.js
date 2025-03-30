class Fibonacci {
  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (true) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
}

async function fetchRandomFact() {
  const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
  const data = await response.json();
  return data.text;
}

const fib = new Fibonacci();
const fibArray = Array.from({ length: 10 }, () => fib[Symbol.iterator]().next().value);

print('First 10 Fibonacci numbers:', fibArray);

fetchRandomFact().then(fact => {
  print('Random Fact:', fact);
});

Promise.all(fibArray.map(async (num) => {
  const isEven = await new Promise((resolve) => {
    setTimeout(() => resolve(num % 2 === 0), 100);
  });
  return { num, isEven };
})).then(results => {
  print('Fibonacci numbers with parity:', results);
});
