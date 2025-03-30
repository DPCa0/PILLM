 

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop === 'greeting') {
      return Reflect.get(target, prop, receiver) + ', dear User!';
    }
    return Reflect.get(target, prop, receiver);
  }
};

const targetObject = { greeting: 'Hello' };
const proxy = new Proxy(targetObject, handler);

 
const asyncOperation = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('The async operation was successful!');
    }, 1000);
  });
};

 
async function handleAsyncOperation() {
  try {
    print(proxy.greeting);  
    let result = await asyncOperation();  
    print(result);
  } catch (error) {
    console.error('Something went wrong:', error);
  }
}

 
handleAsyncOperation();
