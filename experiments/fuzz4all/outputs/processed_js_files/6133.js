class Fibonacci {
  *generate(n) {
    let [a, b] = [0, 1];
    while (n-- > 0) {
      [a, b] = [b, a + b];
      yield a;
    }
  }
}

const fibonacciSeries = new Fibonacci();
const sequence = [...fibonacciSeries.generate(10)];

const promiseAllSettledDemo = async () => {
  const promises = sequence.map(num => 
    new Promise((resolve, reject) => {
      setTimeout(() => (num % 2 === 0 ? resolve(num) : reject(num)), 100);
    })
  );

  const results = await Promise.allSettled(promises);
  const resolvedValues = results
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value);

  print('Resolved Fibonacci numbers:', resolvedValues);
};

(async () => {
  try {
    await promiseAllSettledDemo();
  } catch (error) {
    console.error('Error processing Fibonacci numbers:', error);
  }
})();
