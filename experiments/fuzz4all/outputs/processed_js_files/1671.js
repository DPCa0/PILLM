 

 
async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'Advanced JS Features' });
    }, 1000);
  });
}

 
async function manipulateData() {
  const data = await fetchData();
  const proxy = new Proxy(data, {
    get(target, property) {
      if (property in target) {
        return Reflect.get(target, property);
      } else {
        print(`Property "${property}" not found!`);
        return undefined;
      }
    },
    set(target, property, value) {
      print(`Setting property "${property}" to "${value}"`);
      return Reflect.set(target, property, value);
    }
  });

  print(`Fetched data: ${proxy.name}`);
  proxy.newProperty = 'This is a proxy feature';
  print(`Added new property: ${proxy.newProperty}`);
  proxy.id = 2;
  print(`Updated id: ${proxy.id}`);
}

 
function measureExecutionTime(fn) {
  return async function(...args) {
    const start = performance.now();
    await fn(...args);
    const end = performance.now();
    print(`Execution time: ${end - start} ms`);
  };
}

 
const execute = measureExecutionTime(manipulateData);
execute();
