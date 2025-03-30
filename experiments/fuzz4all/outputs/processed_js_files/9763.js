 

 
const fakeApiCall = () => new Promise((resolve) => {
  const delay = Math.floor(Math.random() * 1000) + 500;
  setTimeout(() => resolve(`Data received in ${delay}ms`), delay);
});

 
function* dataFetcher() {
  print("Fetching data...");
  const data = yield fakeApiCall();
  print("Data: ", data);
  return data;
}

 
const runGenerator = (genFunc) => {
  const iterator = genFunc();

  const iterate = (iteration) => {
    if (iteration.done) return iteration.value;
    const promise = Promise.resolve(iteration.value);
    return promise.then((x) => iterate(iterator.next(x)));
  };

  return iterate(iterator.next());
};

 
const handler = {
  get(target, property) {
    print(`Getting property '${property}'`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  },
};

 
const dataStore = new Proxy({ message: 'Initial Data' }, handler);

 
runGenerator(dataFetcher).then((fetchedData) => {
   
  dataStore.message = fetchedData;
  print(dataStore.message);
});
