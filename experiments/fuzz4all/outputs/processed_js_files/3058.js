 
const asyncOperation = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    Math.random() > 0.5 ? resolve("Success!") : reject("Failed!");
  }, 1000);
});

 
async function* asyncGenerator() {
  try {
    const result1 = await asyncOperation();
    yield `First operation: ${result1}`;
    const result2 = await asyncOperation();
    yield `Second operation: ${result2}`;
    const result3 = await asyncOperation();
    yield `Third operation: ${result3}`;
  } catch (error) {
    yield `Error occurred: ${error}`;
  }
}

 
(async () => {
  for await (let message of asyncGenerator()) {
    print(message);
  }
})();

 
const handler = {
  get: (target, property) => {
    return property in target ? target[property] : `Property "${property}" does not exist`;
  }
};

const targetObject = { name: "Advanced JS", type: "Complex Example" };
const proxy = new Proxy(targetObject, handler);

 
print(proxy.name);  
print(proxy.nonExistentProperty);  

 
const uniqueSet = new Set([1, 2, 3, 3, 4]);
const keyValueMap = new Map([['name', 'JavaScript'], ['type', 'Map']]);

 
print([...uniqueSet]);  
print(keyValueMap.get('name'));  

 
const calculateSum = (...numbers) => numbers.reduce((sum, num) => sum + num, 0);
const numbersArray = [10, 20, 30];
print(calculateSum(...numbersArray));  
