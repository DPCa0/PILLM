 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

 
const targetObject = {
  message: "Hello, world!"
};

const handler = {
  get: (target, property) => {
    if (property in target) {
      return `Intercepted: ${target[property]}`;
    } else {
      return `Property ${property} does not exist`;
    }
  }
};

const proxy = new Proxy(targetObject, handler);

 
async function complexOperation() {
  const iterator = numberGenerator();
  const [first, second] = [iterator.next().value, iterator.next().value];  

  print(`First number: ${first}, Second number: ${second}`);
  
  print(proxy.message);

  await delay(1000);  

  const message = proxy.nonExistentProperty;
  print(message);
}

complexOperation();
