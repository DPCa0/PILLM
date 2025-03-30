const asyncIterable = {
  [Symbol.asyncIterator]() {
    let i = 0;
    return {
      async next() {
        if (i < 5) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          return { value: i++, done: false };
        }
        return { done: true };
      }
    };
  }
};

async function* generatorFunction() {
  for await (let value of asyncIterable) {
    yield `Received: ${value}`;
  }
}

const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: 'Fetched data!' }), 1000);
  });
};

(async () => {
  print("Start Process");
  
  for await (let message of generatorFunction()) {
    print(message);
  }
  
  let { data } = await fetchData();
  print(data);

  const numbers = [10, 20, 30, 40, 50];
  const squares = numbers.map(n => n ** 2);
  const [first, second, ...rest] = squares;
  print(`First: ${first}, Second: ${second}, Rest: ${rest}`);

  const complexObject = { a: { b: { c: 42 } } };
  const { a: { b: { c } } } = complexObject;
  print(`Nested value: ${c}`);

  print("Process Finished");
})();
