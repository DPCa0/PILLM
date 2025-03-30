 
async function* dataStream(max) {
  for (let i = 0; i < max; i++) {
    await new Promise(res => setTimeout(res, 100));  
    yield { value: i, timestamp: new Date() };
  }
}

 
function processData({ value, timestamp }) {
  print(`Processing value: ${value}, timestamp: ${timestamp?.toISOString()}`);
}

 
const handler = {
  apply: (target, thisArg, args) => {
    print(`Called processData with arguments: ${JSON.stringify(args)}`);
    return target.apply(thisArg, args);
  }
};

const proxiedProcessData = new Proxy(processData, handler);

 
(async () => {
  const maxDataPoints = 10;
  const stream = dataStream(maxDataPoints);
  for await (const data of stream) {
     
    const { value, timestamp = new Date() } = data ?? {};
    const augmentedData = { ...data, augmented: true };

     
    proxiedProcessData(augmentedData);
  }
})();

 
const valueSet = new Set([1, 2, 2, 3, 4]);
const valueMap = new Map(valueSet.values(), [1, 2, 3, 4].map(v => v * v));
print('Unique values:', [...valueSet]);
print('Value map:', [...valueMap.entries()]);
