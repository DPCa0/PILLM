 

 
const simulateAsyncOperation = (result, delay) => 
  new Promise(resolve => setTimeout(() => resolve(result), delay));

 
function* asyncSequence() {
  yield simulateAsyncOperation('First async result', 1000);
  yield simulateAsyncOperation('Second async result', 500);
  yield simulateAsyncOperation('Third async result', 700);
}

 
async function processAsyncSequence() {
  const sequence = asyncSequence();
  for (let operation of sequence) {
    const result = await operation;
    print(result);
  }
}

 
const targetObject = {
  message: 'Hello, Proxy!',
};

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Accessing property: ${property}`);
      return target[property];
    }
    return 'Property not found';
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  },
};

 
const proxiedObject = new Proxy(targetObject, handler);

 
processAsyncSequence().then(() => {
   
  print(proxiedObject.message);
  proxiedObject.newMessage = 'New message set through proxy';
  print(proxiedObject.newMessage);
  print(proxiedObject.nonExistentProperty);
});
