 

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => resolve(Math.floor(Math.random() * 100)), 1000);
});

 
function* dataGenerator(count) {
  for (let i = 0; i < count; i++) {
    yield fetchData();
  }
}

 
async function fetchGeneratedData(generator) {
  const results = [];
  for (let promise of generator) {
    results.push(await promise);
  }
  return results;
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Property ${prop} has been accessed.`);
    return Reflect.get(target, prop, receiver);
  }
};

 
const target = {
  data: 'Initial data'
};

 
const proxy = new Proxy(target, handler);

 
(async () => {
   
  print(proxy.data);

   
  const generator = dataGenerator(5);
  const data = await fetchGeneratedData(generator);
  print('Fetched Data:', data);
})();
