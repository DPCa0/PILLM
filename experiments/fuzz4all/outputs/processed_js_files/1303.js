 

 
function fetchData(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, data: `Data for ID: ${id}` }), 1000);
  });
}

 
function* idGenerator() {
  for (let i = 1; i <= 5; i++) {
    yield i;
  }
}

 
const dataLogger = {
  get(target, prop, receiver) {
    print(`Accessed property "${prop}"`);
    return Reflect.get(target, prop, receiver);
  }
};

 
async function processIDs() {
  const generator = idGenerator();
  let result = generator.next();

  while (!result.done) {
    const id = result.value;
    try {
      const data = await fetchData(id);
      const proxiedData = new Proxy(data, dataLogger);
      print(proxiedData.data);   
    } catch (error) {
      console.error(`Error fetching data for ID: ${id}`, error);
    }
    result = generator.next();
  }
}

processIDs();
