 

 
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: 'John Doe', age: 30, location: 'New York' });
    }, 1000);
  });
}

 
async function* dataGenerator() {
  const data = await fetchData();
  yield data.user;
  yield data.age;
  yield data.location;
}

 
const generatorProxy = new Proxy(dataGenerator(), {
  get(target, prop, receiver) {
    if (prop === 'next') {
      print('Next value requested');
    }
    return Reflect.get(target, prop, receiver);
  }
});

 
(async () => {
  print('Fetching data...');
  for await (const value of generatorProxy) {
    print('Received:', value);
  }
  print('All data fetched');
})();
