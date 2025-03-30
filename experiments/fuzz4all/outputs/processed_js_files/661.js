 

 
function deepClone(obj) {
  return structuredClone(obj);
}

 
function factorial(n, acc = 1n) {
  if (n <= 1) return acc;
  return factorial(n - 1n, n * acc);
}

 
const handler = {
  get(target, prop) {
    print(`Accessing property: ${prop}`);
    return prop in target ? target[prop] : 'Property does not exist';
  }
};
const dynamicObject = new Proxy({}, handler);
dynamicObject.name = "Advanced JS";
print(dynamicObject.name);
print(dynamicObject.age);

 
async function performTasks(tasks) {
  const results = await Promise.allSettled(tasks.map(task => task()));
  return results.map(result => result.status === 'fulfilled' ? result.value : result.reason);
}

const tasks = [
  async () => { throw new Error('Task 1 failed'); },
  async () => { return 'Task 2 success'; },
  async () => { return 'Task 3 success'; }
];

performTasks(tasks).then(console.log);

 
const complexKeyMap = new Map();
const key1 = { id: 1 };
const key2 = { id: 2 };

complexKeyMap.set(key1, 'Value associated with key1');
complexKeyMap.set(key2, 'Value associated with key2');

print(complexKeyMap.get(key1));  

 
const dataArray = [1, 2, 3, 2, 1, 4, 5];
const uniqueDataSet = new Set(dataArray);
print([...uniqueDataSet]);  

 
function tag(strings, ...values) {
  return strings.raw.reduce((acc, string, i) => acc + string + (values[i] || ''), '');
}

const user = { name: 'Alice', age: 25 };
print(tag`User Details:\nName: ${user.name}\nAge: ${user.age}\n`);

 