 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  const data = await delay(1000).then(() => ({ user: 'Alice', age: 30, location: 'Wonderland' }));
  const { user, age, location } = data;
  print(`User: ${user}, Age: ${age}, Location: ${location}`);
}

 
function* dataGenerator() {
  yield 'Data 1';
  yield 'Data 2';
  yield 'Data 3';
}

 
const dataHandler = {
  get: (obj, prop) => {
    print(`Accessing property: ${prop}`);
    return obj[prop];
  }
};

const data = {
  prop1: 'Hello',
  prop2: 'World'
};

const proxiedData = new Proxy(data, dataHandler);

 
function processData() {
  const gen = dataGenerator();
  for (let value of gen) {
    print(value);
  }
  print(proxiedData.prop1);
  print(proxiedData.prop2);
}

 
fetchData().then(processData);
