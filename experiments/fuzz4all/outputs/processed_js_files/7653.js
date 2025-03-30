 

 
const fetchData = (url) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(`Data from ${url}`);
  }, 1000);
});

 
function* urlGenerator() {
  yield 'https://api.example.com/data1';
  yield 'https://api.example.com/data2';
  yield 'https://api.example.com/data3';
}

 
async function processURLs(generator) {
  for (let url of generator) {
    const data = await fetchData(url);
    print(data);
  }
}

 
const handler = {
  get: (target, prop) => {
    if (typeof target[prop] === 'function') {
      return function (...args) {
        print(`Called method: ${prop} with arguments: ${JSON.stringify(args)}`);
        return target[prop].apply(this, args);
      };
    }
    return target[prop];
  }
};

 
const taskRunner = {
  start: function* () {
    yield* urlGenerator();
  }
};

 
const proxiedTaskRunner = new Proxy(taskRunner, handler);

 
(async () => {
  const generator = proxiedTaskRunner.start();
  await processURLs(generator);
})();
