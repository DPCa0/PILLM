 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield ++id;
  }
}

const idGen = idGenerator();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handler = {
  get: function(target, prop) {
    return prop in target ? target[prop] : `Property '${prop}' not found`;
  },
  set: function(target, prop, value) {
    if (typeof value === 'number') {
      target[prop] = value;
    } else {
      throw new Error('Only numbers are allowed');
    }
  }
};

const createAsyncObject = async () => {
  const obj = { id: idGen.next().value, value: 0 };
  await delay(1000);
  return new Proxy(obj, handler);
};

(async () => {
  const proxiedObj = await createAsyncObject();
  print(`Created object with id: ${proxiedObj.id}`);  
  print(proxiedObj.unknownProperty);  
  
  try {
    proxiedObj.value = 'string';  
  } catch (e) {
    console.error(e.message);
  }
  
  proxiedObj.value = 42;  
  print(proxiedObj.value);  
})();
