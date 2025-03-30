 

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    } else {
      return `Property ${prop} not found`;
    }
  }
};

 
const user = new Proxy({ name: 'Alice', age: 30 }, handler);

 
async function fetchData() {
  const mockApiCall = new Promise((resolve) =>
    setTimeout(() => resolve({ id: 1, name: 'John Doe' }), 1000)
  );

  print('Fetching data...');
  const data = await mockApiCall;
  print('Data fetched:', data);
  return data;
}

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
async function processIds() {
  const gen = idGenerator();
  for (let i = 0; i < 3; i++) {
    print('Generated ID:', gen.next().value);
    await fetchData();
  }
}

 
(async () => {
  print('User Name:', user.name);
  await processIds();
})();
