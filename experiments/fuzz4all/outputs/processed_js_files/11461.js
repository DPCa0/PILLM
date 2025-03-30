 

 
const fetchData = (delay, data) => 
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

 
function* dataFetcher() {
  const data1 = yield fetchData(1000, 'Data from API 1');
  print(data1);
  const data2 = yield fetchData(2000, 'Data from API 2');
  print(data2);
  const data3 = yield fetchData(1500, 'Data from API 3');
  print(data3);
}

 
async function runGenerator(gen) {
  const iterator = gen();
  let result = iterator.next();

  while (!result.done) {
    const value = await result.value;
    result = iterator.next(value);
  }
}

 
const dataHandler = {
  get(target, prop) {
    print(`Accessing property '${prop}'`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  }
};

 
const dataObject = new Proxy({ data1: null, data2: null, data3: null }, dataHandler);

 
async function main() {
  await runGenerator(dataFetcher);

   
  print(dataObject.data1);
  dataObject.data2 = 'Updated Data 2';
  print(dataObject.data2);
}

main().catch(console.error);
