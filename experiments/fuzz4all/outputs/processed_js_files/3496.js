 

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield ++id;
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Getting property '${prop}'`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  }
};

const user = new Proxy({}, handler);

 
const fetchData = () => new Promise(resolve => setTimeout(() => resolve({ data: 'Sample data' }), 1000));

 
async function manageData() {
  print('Fetching data...');
  const data = await fetchData();
  print('Data fetched:', data);
  
  const idGen = idGenerator();
  user.name = 'John Doe';
  user.id = idGen.next().value;
  
  print('User:', user);
}

 
manageData();
