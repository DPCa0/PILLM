 

 
const handler = {
  get: (target, property) => {
    print(`Getting property: ${property}`);
    return property in target ? target[property] : `Property "${property}" doesn't exist`;
  },
  set: (target, property, value) => {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const data = new Proxy({}, handler);

// Async function utilizing promises
const fetchData = async () => {
  print('Fetching data...');
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data retrieved!'), 2000);
  });
  const result = await promise;
  print(result);
  return result;
};

// Generator function
function* dataGenerator() {
  print('Generator starts');
  yield fetchData();
  print('Fetching more data...');
  yield new Promise((resolve) => setTimeout(() => resolve('More data retrieved!'), 1500));
}

 
(async function executeGenerator() {
  const generator = dataGenerator();
  for await (let value of generator) {
    print(`Generator yielded: ${value}`);
  }
})();

 
data.message = "Hello, Proxy!";
print(data.message);
print(data.nonExistentProp);
