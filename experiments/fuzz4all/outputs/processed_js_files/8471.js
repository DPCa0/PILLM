 

 
async function fetchData(id) {
  const simulatedData = { 1: 'apple', 2: 'banana', 3: 'cherry' };
  return new Promise((resolve) => {
    setTimeout(() => resolve(simulatedData[id] || 'unknown'), 1000);
  });
}

 
function* dataRequestGenerator(ids) {
  for (let id of ids) {
    yield fetchData(id);
  }
}

 
const dbHandler = {
  get: (target, prop) => {
    print(`Accessing data for ID: ${prop}`);
    return prop in target ? target[prop] : 'not found';
  }
};

const simulatedDB = new Proxy({ 1: 'apple', 2: 'banana', 3: 'cherry' }, dbHandler);

 
(async function main() {
  const ids = [1, 2, 3, 4];
  const dataGen = dataRequestGenerator(ids);
  
  print('Fetching data asynchronously:');
  for (let request of dataGen) {
    const data = await request;
    print(`Fetched: ${data}`);
  }

  print('\nAccessing simulated database using Proxy:');
  ids.forEach(id => {
    print(`Data for ID ${id}: ${simulatedDB[id]}`);
  });
})();
