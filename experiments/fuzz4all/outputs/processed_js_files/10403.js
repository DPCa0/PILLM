 

 
const fetchData = async () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(500);
  return Math.floor(Math.random() * 100);
};

 
async function* generateAsyncNumbers(count) {
  for (let i = 0; i < count; i++) {
    yield await fetchData();
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Accessing property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
const asyncDataHandler = new Proxy({}, handler);

 
(async () => {
  const asyncNumbers = generateAsyncNumbers(5);

  for await (let number of asyncNumbers) {
    print(`Fetched number: ${number}`);
    asyncDataHandler[number] = `Value-${number}`;
  }

   
  print(asyncDataHandler[Object.keys(asyncDataHandler)[0]]);
})();
