 

 
const _private = Symbol('private');

class ComplexObject {
  constructor() {
    this[_private] = { data: 'Confidential' };
  }

  get confidentialData() {
    return this[_private].data;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting property ${String(prop)}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property ${String(prop)} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  },
};

const obj = new ComplexObject();
const proxy = new Proxy(obj, handler);

 
async function fetchData() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data fetched successfully!'), 1000);
  });

  try {
    print('Fetching data...');
    const result = await promise;
    print(result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

proxy.confidentialData;
proxy.newProp = 'Some Value';
fetchData();
