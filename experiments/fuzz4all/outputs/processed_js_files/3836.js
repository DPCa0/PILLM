Certainly! Here is a JavaScript program that uses advanced features such as promises, async/await, destructuring, rest/spread operators, and classes:

class AsyncProcessor {
  constructor(...tasks) {
    this.tasks = tasks;
  }

  async run() {
    const results = await Promise.all(this.tasks.map(task => task()));
    return results.reduce((acc, cur) => [...acc, ...cur], []);
  }
}

const fetchData = async (id) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, data: `Data for ${id}` });
    }, Math.random() * 1000);
  });
};

const transformData = (data) => {
  return data.map(({ id, data }) => ({ [id]: data.toUpperCase() }));
};

const logResults = (results) => {
  print('Processed Results:', ...results);
};

(async () => {
  const ids = [1, 2, 3, 4, 5];
  const tasks = ids.map(id => async () => {
    const data = await fetchData(id);
    return transformData([data]);
  });

  const processor = new AsyncProcessor(...tasks);
  const results = await processor.run();
  logResults(results);
})();

This program defines an `AsyncProcessor` class to manage multiple asynchronous tasks, which fetch data and transform it before logging the combined results.