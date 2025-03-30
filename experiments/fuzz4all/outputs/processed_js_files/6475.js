class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* asyncGenerator(arr) {
  for (const item of arr) {
    await new Promise((res) => setTimeout(res, 100));
    yield item;
  }
}

const fetchData = async () => {
  const data = [1, 2, 3, 4, 5];
  const deferred = new Deferred();
  const processedData = [];

  const processItem = async (item) => {
    const result = item * 2;  
    processedData.push(result);
    if (processedData.length === data.length) {
      deferred.resolve(processedData);
    }
  };

  (async () => {
    for await (const item of asyncGenerator(data)) {
      processItem(item);
    }
  })();

  return deferred.promise;
};

fetchData().then((result) => print('Processed Data:', result));

const obj = {
  a: 1,
  b: 2,
  [Symbol.iterator]: function* () {
    yield* Object.entries(this);
  },
};

for (const [key, value] of obj) {
  print(`Key: ${key}, Value: ${value}`);
}

function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    [prev, curr] = [curr, prev + curr];
    yield prev;
  }
}

print([...fibonacci(5)]);  

(async () => {
  print('Starting asynchronous iteration');
  for await (let num of asyncGenerator([6, 7, 8])) {
    print(`Async number: ${num}`);
  }
})();
