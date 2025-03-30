 

 
const loggingHandler = {
  get(target, property, receiver) {
    print(`Getting ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Setting ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};

const data = { message: "Hello, World!", count: 1 };
const proxiedData = new Proxy(data, loggingHandler);

 
function* numberGenerator(limit) {
  for (let i = 1; i <= limit; i++) {
    yield new Promise(resolve => setTimeout(() => resolve(i), 1000));
  }
}

 
async function processNumbers() {
  const gen = numberGenerator(5);
  for await (const num of gen) {
    print(`Generated number: ${num}`);
    proxiedData.count += num;
    print(`Updated count: ${proxiedData.count}`);
  }
}

 
processNumbers().catch(console.error);
