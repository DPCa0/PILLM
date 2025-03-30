class CustomPromise extends Promise {
  finally(onFinally) {
    const constructor = this.constructor;
    return this.then(
      value => constructor.resolve(onFinally()).then(() => value),
      reason => constructor.resolve(onFinally()).then(() => { throw reason; })
    );
  }
}

async function* asyncGenerator() {
  const data = [10, 20, 30];
  for (let item of data) {
    yield await new CustomPromise(resolve => setTimeout(() => resolve(item), 1000));
  }
}

(async () => {
  const results = [];
  const logResults = () => print('Results:', results);

  try {
    for await (const value of asyncGenerator()) {
      results.push(value);
      print(`Fetched: ${value}`);
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    logResults();
  }
})();
