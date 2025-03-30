 

 
const fakeApiCall = (delay, result) => new Promise(resolve => setTimeout(() => resolve(result), delay));

 
function* fetchSequentialData() {
  print("Fetching first data set...");
  const firstData = yield fakeApiCall(1000, "First Data Set");

  print("Fetching second data set...");
  const secondData = yield fakeApiCall(1000, "Second Data Set");

  print("Fetching third data set...");
  const thirdData = yield fakeApiCall(1000, "Third Data Set");

  return [firstData, secondData, thirdData];
}

 
const asyncRunner = async (generator) => {
  const iterator = generator();

  const iterate = async (iteration) => {
    if (iteration.done) return iteration.value;
    const value = await iteration.value;
    return iterate(iterator.next(value));
  };

  return iterate(iterator.next());
};

 
const dataProxy = (data) => {
  return new Proxy(data, {
    get(target, property) {
      if (property in target) {
        print(`Accessing ${property}`);
        return target[property];
      } else {
        console.warn(`Property ${property} does not exist`);
        return undefined;
      }
    }
  });
};

 
(async () => {
  const rawData = await asyncRunner(fetchSequentialData);
  const data = dataProxy(rawData);

  print("Data received and proxied:");
  print(data[0]);  
  print(data[1]);  
  print(data[3]);  
})();
