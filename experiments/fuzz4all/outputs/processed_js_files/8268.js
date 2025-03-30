 
async function* dataStream() {
  const data = [1, 2, 3, 4, 5];
  for (const item of data) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield item;
  }
}

 
const transformer = (fn) => async function* (source) {
  for await (const item of source) {
    yield fn(item);
  }
};

 
const handler = {
  get(target, prop) {
    print(`Accessing property "${prop}"`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting property "${prop}" to "${value}"`);
    return Reflect.set(target, prop, value);
  }
};

const complexObj = new Proxy({ name: 'Complex Object', value: 10 }, handler);

 
(async () => {
  const double = x => x * 2;
  const doubledStream = transformer(double);

   
  for await (const item of doubledStream(dataStream())) {
    print(`Processed item: ${item}`);
  }

   
  print(complexObj.name);   
  complexObj.value = 20;          
})();
