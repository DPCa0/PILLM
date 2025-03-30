 

 
const asyncOperation = (msg, delay) => new Promise(resolve => setTimeout(() => resolve(msg), delay));

 
const processPipeline = async (operations) => {
  try {
    const results = await operations.reduce(async (acc, operation) => {
      const resolvedAcc = await acc;
      const result = await operation();
      return [...resolvedAcc, result];
    }, Promise.resolve([]));
    
    print("Pipeline completed with results:", results);
  } catch (error) {
    console.error("Pipeline error:", error);
  }
};

 
const operations = [
  () => asyncOperation("Operation 1 completed", 1000),
  () => asyncOperation("Operation 2 completed", 1500),
  () => asyncOperation("Operation 3 completed", 500),
];

 
processPipeline(operations);

 
const targetObj = { message: "Hello, Proxy World!" };
const handler = {
  get: (obj, prop) => prop in obj ? obj[prop] : `Property "${prop}" not found`
};

const proxyObj = new Proxy(targetObj, handler);

print(proxyObj.message);  
print(proxyObj.nonExistentProperty);  

 
const manipulateObject = ({ a, b, ...rest }) => {
  print("Destructured properties:", a, b);
  const newObject = { ...rest, c: a + b };
  print("New Object with spread:", newObject);
  return newObject;
};

 
const originalObject = { a: 5, b: 10, x: 20, y: 30 };
manipulateObject(originalObject);

 
const uniqueSet = new Set([1, 2, 3, 4, 4, 3, 2, 1]);
print("Unique values from Set:", [...uniqueSet]);

const keyValueMap = new Map();
keyValueMap.set('key1', 'value1');
keyValueMap.set('