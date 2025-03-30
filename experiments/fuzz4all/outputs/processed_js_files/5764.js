 

 
function* fetchDataGenerator() {
  yield new Promise(resolve => setTimeout(() => resolve('Data 1'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Data 2'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Data 3'), 1000));
}

 
async function handleDataFetch() {
  const dataGen = fetchDataGenerator();
  for await (let data of dataGen) {
    print(data);
  }
}

 
const createLoggingProxy = (obj) => {
  return new Proxy(obj, {
    get(target, property) {
      print(`Accessing property: ${property}`);
      return target[property];
    },
    set(target, property, value) {
      print(`Setting property: ${property} to ${value}`);
      target[property] = value;
      return true;
    }
  });
};

 
const obj = { a: 1, b: 2, c: 3 };
const loggedObj = createLoggingProxy(obj);

 
print(loggedObj.a);  
loggedObj.b = 20;          
print(loggedObj.b);  

 
handleDataFetch().then(() => print('Data fetch complete'));
