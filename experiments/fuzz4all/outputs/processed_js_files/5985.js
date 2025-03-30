 

 
function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { userId: 1, id: 101, title: "Sample Data", completed: false } });
    }, 1000);
  });
}

 
function* fetchGenerator(url) {
  const response = yield fetchData(url);
  return response;
}

 
const handler = {
  get: (target, property) => {
    print(`Getting ${property} from object.`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}.`);
    target[property] = value;
    return true;
  }
};

 
async function processData(url) {
  const iterator = fetchGenerator(url);
  const { value: promise } = iterator.next();
  const result = await promise;

   
  const { data: { userId, id, title, completed } } = result;
  
   
  const dataProxy = new Proxy({ userId, id, title, completed }, handler);

   
  print(dataProxy.title);
  dataProxy.completed = true;
  print(dataProxy.completed);
}

 
processData('https://jsonplaceholder.typicode.com/todos/1');
