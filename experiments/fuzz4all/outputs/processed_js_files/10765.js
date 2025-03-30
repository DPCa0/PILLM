class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }
  resolve(value) { this._resolve(value); }
  reject(reason) { this._reject(reason); }
}

async function* fetchData() {
  const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
  for (let url of urls) {
    const response = await fetch(url);
    yield await response.json();
  }
}

(async () => {
  const def = new Deferred();

  const asyncIterator = fetchData();
  const results = [];

  asyncIterator.next().then(async function processResult(result) {
    if (result.done) {
      def.resolve(results);
      return;
    }
    results.push(result.value);
    asyncIterator.next().then(processResult);
  });

  const data = await def.promise;
  print(data);

  const [first, second] = data;
  print(`Title 1: ${first.title}, Title 2: ${second.title}`);
})();
