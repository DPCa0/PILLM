 
const handler = {
  get: (target, prop, receiver) => {
    print(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value, receiver) => {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const targetObject = { message: "Hello, world!" };
const proxy = new Proxy(targetObject, handler);

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const generator = idGenerator();

 
async function fetchDataAndLog() {
  const { default: axios } = await import('https://cdn.skypack.dev/axios');
  
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    print('Data fetched:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
proxy.message = "Hello, Proxy World!";
print(proxy.message);
print(`Generated ID: ${generator.next().value}`);

 
fetchDataAndLog();
