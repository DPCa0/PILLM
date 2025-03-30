 

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Accessing property "${prop}"`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Setting property "${prop}" to "${value}"`);
      obj[prop] = value;
      return true;
    }
  });
};

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: 'Sample Data' }), 1000);
  });
};

 
function* stepGenerator() {
  yield 'Step 1: Initialize';
  yield 'Step 2: Fetching Data...';
  yield 'Step 3: Data Retrieved';
}

 
const main = async () => {
  const steps = stepGenerator();

  print(steps.next().value);  
  print(steps.next().value);  

   
  const dataProxy = createLoggingProxy(await fetchData());

  print(`Data: ${dataProxy.data}`);  

  print(steps.next().value);  
};

main();
