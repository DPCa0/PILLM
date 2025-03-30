class Fibonacci {
  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (;;) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }
}

const calculateAsync = async (num) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(num * num), 1000);
  });
};

(async () => {
  const fibonacci = new Fibonacci();
  const sequence = [...fibonacci].slice(0, 10);  

  print('First 10 Fibonacci numbers:', sequence);

  const squaredNumbers = await Promise.all(sequence.map(calculateAsync));

  const squaredObject = squaredNumbers.reduce((acc, num, index) => {
    acc[`fib_${index + 1}`] = num;
    return acc;
  }, {});

  print('Squared Fibonacci numbers:', squaredObject);

  const proxy = new Proxy(squaredObject, {
    get: (obj, prop) => {
      return prop in obj ? obj[prop] : `No such property as "${prop}"`;
    },
  });

  print('Accessing fib_3:', proxy.fib_3);
  print('Accessing fib_11:', proxy.fib_11);
})();
