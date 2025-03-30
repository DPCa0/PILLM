 

 
async function* fetchData() {
  const simulateFetch = (data, delay) => new Promise(resolve => setTimeout(() => resolve(data), delay));
  
  yield await simulateFetch({ user: 'Alice' }, 1000);
  yield await simulateFetch({ user: 'Bob' }, 1000);
  yield await simulateFetch({ user: 'Charlie' }, 1000);
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop} from ${JSON.stringify(target)}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value} in ${JSON.stringify(target)}`);
    return Reflect.set(...arguments);
  }
};

 
async function handleData() {
  const dataGenerator = fetchData();
  for await (const data of dataGenerator) {
    const proxiedData = new Proxy(data, handler);
    print(`Fetched user: ${proxiedData.user}`);
    proxiedData.retrievedAt = new Date().toISOString();
  }
}

 
handleData().then(() => print('All data processed.'));
