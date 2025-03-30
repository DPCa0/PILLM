 

 
const fetchData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: 'Sample Data' }), 1000)
  );

 
function* dataProcessor() {
  const data = yield fetchData();
  print('Processed:', data.toUpperCase());
}

 
async function handleData(generator) {
  const gen = generator();

  const nextValue = await gen.next().value;
  gen.next(nextValue.data);  
}

 
const handler = {
  get(target, property) {
    print(`Accessed property "${property}"`);
    return Reflect.get(target, property);
  },
};

const data = { name: 'Advanced JS', type: 'Example' };
const proxyData = new Proxy(data, handler);

 
const uniqueProp = Symbol('unique');
const map = new Map();
map.set(proxyData, { [uniqueProp]: 'Special Value' });

 
handleData(dataProcessor);

 
print(proxyData.name);  
print(map.get(proxyData)[uniqueProp]);  
