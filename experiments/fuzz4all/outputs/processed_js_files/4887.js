class Fibonacci {
  *generate(limit) {
    let [prev, curr] = [0, 1];
    while (limit--) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }
}

const pipeline = {
   
  async pipe(input, ...fns) {
    for (const fn of fns) {
      input = await fn(input);
    }
    return input;
  }
};

(async () => {
  const fib = new Fibonacci();
  const fibSequence = [...fib.generate(10)];

   
  const processNumber = async num => num * num;
  const squaredNumbers = await Promise.all(fibSequence.map(processNumber));

   
  const logger = new Proxy(console, {
    get(target, prop) {
      if (prop === 'log') {
        return (...args) => target.log(new Date().toISOString(), ...args);
      }
      return target[prop];
    }
  });

   
  const result = await pipeline.pipe(
    squaredNumbers,
    numbers => numbers.map(num => num + 1),
    numbers => numbers.filter(num => num % 2 === 0),
  );

  logger.log("Final Result:", result);
})();
