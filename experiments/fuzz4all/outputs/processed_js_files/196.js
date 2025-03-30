 

 
function fetchData(id) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id, name: `Item ${id}` }), 1000)
  );
}

 
function* dataGenerator(ids) {
  for (let id of ids) {
    yield fetchData(id);
  }
}

 
async function handleData(ids) {
  const generator = dataGenerator(ids);
  let result = generator.next();
  while (!result.done) {
    let data = await result.value;
    print(data);
    result = generator.next();
  }
}

 
const loggingHandler = {
  get(target, prop, receiver) {
    print(`Getting property ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
const sampleData = { a: 1, b: 2, c: 3 };
const proxiedData = new Proxy(sampleData, loggingHandler);

 
proxiedData.a = 10;
print(proxiedData.b);

 
handleData([1, 2, 3]);
