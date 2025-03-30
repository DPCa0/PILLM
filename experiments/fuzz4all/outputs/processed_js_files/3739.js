 

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return `Property "${prop}" does not exist on the target object.`;
    }
  }
};

const targetObject = { message: 'Hello, Proxy!' };
const proxyObject = new Proxy(targetObject, handler);

 
async function fetchData() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched after 2 seconds');
    }, 2000);
  });
  const result = await promise;
  return result;
}

 
function* numberGenerator() {
  let number = 1;
  while (true) {
    yield number++;
  }
}

 
async function run() {
  print(proxyObject.message);  
  print(proxyObject.nonExistentProperty);  

  const data = await fetchData();  
  print(data);

  const generator = numberGenerator();  
  print(generator.next().value);  
  print(generator.next().value);  
  print(generator.next().value);  
}

run();
