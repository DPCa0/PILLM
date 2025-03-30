const complexFunction = (() => {
  const asyncOperation = () => new Promise((resolve) => setTimeout(() => resolve(Math.random()), 1000));

  const* generateAsyncRandom(max) {
    while (true) {
      const randomValue = yield asyncOperation();
      if (randomValue > max) break;
      yield randomValue;
    }
  }

  return async (max) => {
    const generator = generateAsyncRandom(max);
    let result = generator.next();
    
    while (!result.done) {
      const randomValue = await result.value;
      print('Generated:', randomValue);
      result = generator.next(randomValue);
    }
    
    print('Finished generating numbers.');
  };
})();

(async () => {
  const numbers = [0.2, 0.4, 0.6, 0.8];
  for (const number of numbers) {
    print(`Running generator with max: ${number}`);
    await complexFunction(number);
  }
})();
