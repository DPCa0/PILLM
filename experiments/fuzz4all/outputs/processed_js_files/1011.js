 

 
function* numberGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

 
async function simulateAsyncOperation(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * num);
    }, 100);
  });
}

 
const loggingHandler = {
  get(target, property, receiver) {
    print(`Accessing property: ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Setting property: ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  },
};

const data = { result: [] };
const proxiedData = new Proxy(data, loggingHandler);

 
async function processNumbers() {
  const gen = numberGenerator(1, 5);
  for (let num of gen) {
    const result = await simulateAsyncOperation(num);
    proxiedData.result.push(result);
  }
  print('Final result:', proxiedData.result);
}

processNumbers();
