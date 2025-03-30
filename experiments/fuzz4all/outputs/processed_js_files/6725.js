 

const fakeDatabase = {};

 
const handler = {
  get: (target, prop) => {
    print(`Fetching ${prop}`);
    return prop in target ? target[prop] : undefined;
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

 
const db = new Proxy(fakeDatabase, handler);

 
function* databaseOps(db, key, value) {
  db[key] = value;
  yield new Promise(resolve => setTimeout(resolve, 1000));
  yield db[key];
}

 
async function performOps() {
  const ops = databaseOps(db, 'user1', 'John Doe');

   
  ops.next();

   
  const result = await ops.next().value;
  
  print(`Retrieved Value: ${result}`);
}

 
performOps();
