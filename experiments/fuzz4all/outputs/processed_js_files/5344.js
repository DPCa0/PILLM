 

 
async function* asyncDataStream() {
  const data = [10, 20, 30, 40, 50];
  for (const item of data) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield item;
  }
}

 
const target = { count: 0 };
const handler = {
  get: (obj, prop) => {
    print(`Getting property: ${prop}`);
    return prop in obj ? obj[prop] : 0;
  },
  set: (obj, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};
const proxy = new Proxy(target, handler);

 
(async () => {
  print('Starting async data processing...');
  for await (const value of asyncDataStream()) {
    print(`Received value: ${value}`);
    proxy.count += value;
  }
  print(`Final count: ${proxy.count}`);
})().catch(err => console.error(err));
