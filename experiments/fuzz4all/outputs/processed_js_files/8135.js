 

const simulateAsyncOperation = (data, delay) => 
  new Promise(resolve => setTimeout(() => resolve(data), delay));

function* dataGenerator() {
  yield simulateAsyncOperation({ user: { name: 'Alice', age: 30 } }, 1000);
  yield simulateAsyncOperation({ user: { name: 'Bob', age: 25 } }, 1000);
  yield simulateAsyncOperation({ user: { name: 'Charlie', age: 35 } }, 1000);
}

async function processUserData() {
  const generator = dataGenerator();
  let result = generator.next();

  while (!result.done) {
    const data = await result.value;
    const { user: { name, age } } = data;
    
    const userProxy = new Proxy(data.user, {
      get: (target, prop) => {
        if (prop === 'info') {
          return `${target.name} is ${target.age} years old.`;
        }
        return target[prop];
      }
    });
    
    print(userProxy.info);
    result = generator.next();
  }
}

processUserData();
