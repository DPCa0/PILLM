 

 
const fakeApiCall = () => new Promise(resolve => setTimeout(() => resolve(Math.random()), 1000));

 
function* apiCallGenerator() {
  while (true) {
    yield fakeApiCall();
  }
}

 
async function handleApiCalls(generator, maxCalls) {
  let count = 0;
  for await (let value of generator()) {
    print(`API Call #${++count}:`, value);
    if (count >= maxCalls) break;
  }
}

 
const targetObject = {
  data: [],
  async addData(value) {
    this.data.push(value);
    print(`Data Added: ${value}`);
  }
};

 
const proxy = new Proxy(targetObject, {
  get(target, property) {
    print(`Accessing property '${property}'`);
    return target[property];
  },
  set(target, property, value) {
    if (property === 'data' && !Array.isArray(value)) {
      throw new Error("Data must be an array");
    }
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  }
});

 
(async () => {
  const generatorInstance = apiCallGenerator();
  const maxApiCalls = 5;

  await handleApiCalls(generatorInstance, maxApiCalls);

  proxy.addData(await fakeApiCall());
  print('Final Data Array:', proxy.data);
})();
