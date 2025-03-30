 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* asyncGenerator() {
  yield delay(1000).then(() => print('Step 1 completed after 1 second'));
  yield delay(2000).then(() => print('Step 2 completed after 2 seconds'));
  yield delay(1500).then(() => print('Step 3 completed after 1.5 seconds'));
}

 
async function runGenerator(genFunc) {
  const iterator = genFunc();
  let result = iterator.next();
  while (!result.done) {
    await result.value;
    result = iterator.next();
  }
  print('All steps completed');
}

 
const target = {
  message: 'Hello, world!'
};

const handler = {
  get: function(obj, prop) {
    if (prop === 'message') {
      return `Proxy says: ${obj[prop]}`;
    }
    return Reflect.get(obj, prop);
  },
  set: function(obj, prop, value) {
    if (prop === 'message' && typeof value === 'string') {
      obj[prop] = `User updated message to: ${value}`;
      return true;
    }
    return false;
  }
};

const proxy = new Proxy(target, handler);

 
runGenerator(asyncGenerator);

 
print(proxy.message);  
proxy.message = 'Hi there!';
print(proxy.message);  
