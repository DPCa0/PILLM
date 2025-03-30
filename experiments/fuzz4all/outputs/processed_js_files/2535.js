class DeferredPromise {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* asyncGenerator() {
  let i = 0;
  while (i < 5) {
    yield new Promise((resolve) =>
      setTimeout(() => resolve(`Data chunk ${i++}`), 1000)
    );
  }
}

function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

function deepClone(obj) {
  return structuredClone(obj);
}

const fetchData = async () => {
  const dp = new DeferredPromise();
  const dataStream = asyncGenerator();
  let result = [];
  
  for await (const dataChunk of dataStream) {
    print(`Processing: ${dataChunk}`);
    result.push(dataChunk);
    if (result.length === 5) dp.resolve(result);
  }
  
  return dp.promise;
};

const logResult = debounce((data) => print('Debounced Result:', data), 2000);

fetchData().then((data) => {
  const clonedData = deepClone(data);
  logResult(clonedData);
});
