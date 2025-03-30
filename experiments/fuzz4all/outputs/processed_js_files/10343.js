 

 
function* dataStream() {
  let i = 0;
  while (i < 5) {
    yield new Promise(resolve => setTimeout(() => resolve(i++), 1000));
  }
}

 
async function processDataStream(stream) {
  for await (let data of stream) {
    print(`Received data: ${data}`);
  }
  return 'Data processing complete';
}

 
const handler = {
  get: (target, property, receiver) => {
    print(`Accessing property '${property}'`);
    return Reflect.get(target, property, receiver);
  },
  set: (target, property, value, receiver) => {
    print(`Setting property '${property}' to '${value}'`);
    return Reflect.set(target, property, value, receiver);
  }
};

const targetObject = { message: "Hello, world!" };
const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.message);
proxyObject.message = "Hello, Proxy!";

 
const stream = dataStream();
processDataStream(stream).then(message => print(message));
