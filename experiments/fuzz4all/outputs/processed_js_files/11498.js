 

 
const handler = {
  get(target, prop) {
    print(`Getting ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const user = new Proxy({name: 'Alice', age: 25}, handler);

 
function* fetchData() {
  yield new Promise(resolve => setTimeout(() => resolve("Data 1"), 1000));
  yield new Promise(resolve => setTimeout(() => resolve("Data 2"), 2000));
  yield new Promise(resolve => setTimeout(() => resolve("Data 3"), 3000));
}

 
async function processData() {
  const dataGenerator = fetchData();
  for (const dataPromise of dataGenerator) {
    const data = await dataPromise;
    print(`Fetched: ${data}`);
  }
}

 
user.name = 'Bob';
print(user.age);
processData();
