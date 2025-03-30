 

 
const UNIQUE_KEY = Symbol('uniqueKey');

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Getting ${String(prop)}`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value, receiver) => {
    print(`Setting ${String(prop)} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
async function fetchData() {
  const data = new Map();
  data.set('user', { id: 1, name: 'Alice' });

  return new Proxy(data, handler);
}

 
async function complexOperations() {
  try {
    const dataProxy = await fetchData();

     
    dataProxy[UNIQUE_KEY] = 'SecretValue';

     
    print('User:', dataProxy.get('user'));
    print('Unique Key:', dataProxy[UNIQUE_KEY]);

     
    dataProxy.set('user', { id: 2, name: 'Bob' });
    print('Updated User:', dataProxy.get('user'));

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

 
complexOperations();
