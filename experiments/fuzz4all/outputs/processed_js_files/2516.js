 

 
function* fetchDataGenerator() {
  const data1 = yield fetch('/api/data1').then(res => res.json());
  print('Data 1:', data1);
  const data2 = yield fetch('/api/data2').then(res => res.json());
  print('Data 2:', data2);
  return 'All data fetched';
}

 
function runGenerator(genFunc) {
  const generator = genFunc();

  function handle(result) {
    if (result.done) return Promise.resolve(result.value);

    return Promise.resolve(result.value).then(
      res => handle(generator.next(res)),
      err => handle(generator.throw(err))
    );
  }

  try {
    return handle(generator.next());
  } catch (ex) {
    return Promise.reject(ex);
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property: ${prop}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const monitoredObject = new Proxy({ name: 'JavaScript', version: 'ES6+' }, handler);

async function main() {
  try {
     
    const result = await runGenerator(fetchDataGenerator);
    print(result);

     
    print(monitoredObject.name);
    monitoredObject.version = 'ES2020';
    print(monitoredObject.version);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
