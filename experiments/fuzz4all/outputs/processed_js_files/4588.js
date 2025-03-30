const crypto = require('crypto');
const { performance, PerformanceObserver } = require('perf_hooks');

 
const generateUUID = () => {
  return [4, 2, 2, 2, 6].map((length) => crypto.randomBytes(length).toString('hex')).join('-');
};

 
const asyncOperation = async (id) => {
  print(`Start async operation for ID: ${id}`);
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  await delay(1000);
  print(`Async operation complete for ID: ${id}`);
};

 
const target = { message: "Hello, Proxy!" };
const handler = {
  get: (obj, prop) => {
    print(`Accessing property: ${prop}`);
    return obj[prop];
  }
};
const proxyObj = new Proxy(target, handler);

 
async function* asyncGenerator(start = 0, end = 5) {
  for (let i = start; i < end; i++) {
    await new Promise(resolve => setTimeout(resolve, 500));
    yield `Generated value: ${i}`;
  }
}

 
const obs = new PerformanceObserver((items) => {
  print(items.getEntries()[0].name, items.getEntries()[0].duration);
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

(async () => {
  const id = generateUUID();
  print(`Generated UUID: ${id}`);
  
  performance.mark('asyncStart');
  await asyncOperation(id);
  performance.mark('asyncEnd');
  
  performance.measure('Async Operation Duration', 'asyncStart', 'asyncEnd');
  
  print(proxyObj.message);
  
  print("Async Generator values:");
  for await (let value of asyncGenerator()) {
    print(value);
  }
})();
