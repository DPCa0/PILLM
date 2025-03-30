 
const EventEmitter = require('events');

 
const handler = {
  get(target, property) {
    print(`Accessing property '${property}' with value '${target[property]}'`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property '${property}' to value '${value}'`);
    target[property] = value;
    return true;
  }
};

 
const userData = new Map();
userData.set('user1', { name: 'Alice', age: 25 });
userData.set('user2', { name: 'Bob', age: 30 });

 
const proxyUserData = new Proxy(userData, handler);

 
async function fetchUserData(userId) {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (proxyUserData.has(userId)) {
        resolve(proxyUserData.get(userId));
      } else {
        reject(new Error('User not found'));
      }
    }, 1000);
  });
}

 
class UserEventEmitter extends EventEmitter {}
const userEmitter = new UserEventEmitter();

 
userEmitter.on('userFetched', (user) => {
  print(`User fetched: ${user.name}, Age: ${user.age}`);
});

userEmitter.on('error', (err) => {
  console.error(`Error: ${err.message}`);
});

 
(async () => {
  try {
    const user = await fetchUserData('user1');
    userEmitter.emit('userFetched', user);
  } catch (error) {
    userEmitter.emit('error', error);
  }
})();

 
const uniqueNames = new Set(['Alice', 'Bob', 'Charlie']);

 
for (const name of uniqueNames) {
  print(`Unique Name: ${name}`);
}

 
function sum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

console.log(`Sum of numbers: ${sum(1, 2, 3,