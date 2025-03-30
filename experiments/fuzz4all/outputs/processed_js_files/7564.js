 
async function fetchData(url) {
   
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  try {
     
    await delay(1000);
     
    const response = await Promise.resolve({ json: () => ({ data: 'Sample Data from ' + url }) });

     
    const { json } = response;
     
    const data = json()?.data;

    print(`Fetched Data: ${data}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting property '${prop}'`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value) {
    print(`Setting property '${prop}' to '${value}'`);
    return Reflect.set(...arguments);
  }
};

const obj = new Proxy({}, handler);

 
obj.name = 'Advanced JS';
print(obj.name);

 
(async () => {
  await fetchData('https://api.example.com/data');
})();

 
const customMap = new Map();
customMap.set('key1', 'value1');
customMap.set('key2', 'value2');

 
customMap[Symbol.iterator] = function*() {
  for (let [key, value] of Array.from(this)) {
    yield `${key}: ${value}`;
  }
};

 
for (const item of customMap) {
  print(item);
}
