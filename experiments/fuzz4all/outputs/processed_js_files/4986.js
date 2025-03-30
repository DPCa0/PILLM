 

 
async function* fetchData() {
  const mockData = [1, 2, 3, 4, 5];
  for (let item of mockData) {
     
    await new Promise((resolve) => setTimeout(resolve, 100));
    yield item;
  }
}

 
const asyncIteratorHandler = {
  get: (target, property) => {
    if (property === Symbol.asyncIterator) {
      print("Async iteration started");
      return target[property].bind(target);
    }
    return target[property];
  },
};

 
const fetchDataIterator = fetchData();
const proxiedIterator = new Proxy(fetchDataIterator, asyncIteratorHandler);

 
(async () => {
  for await (const value of proxiedIterator) {
    print(`Received value: ${value}`);
     
    const processed = [value]
      .map((x) => x * 2)
      .filter((x) => x > 5)
      .reduce((acc, cur) => acc + cur, 0);
    print(`Processed value: ${processed}`);
  }
})();
