 
async function* fetchUserData(userIds) {
  for (const id of userIds) {
    yield new Promise((resolve) => {
      setTimeout(() => {
         
        resolve({ id, name: `User${id}` });
      }, Math.random() * 1000);
    });
  }
}

async function processUsers(userIds) {
  const userIterator = fetchUserData(userIds);
  for await (const user of userIterator) {
    print(`Fetched user: ${user.name}`);
  }
}

 
const userHandler = {
  get(target, prop) {
    if (prop === 'secret') {
      return 'This is a secret!';
    }
    return target[prop];
  },
  set(target, prop, value) {
    if (prop === 'age' && (value < 0 || value > 150)) {
      console.warn('Invalid age');
      return false;
    }
    target[prop] = value;
    return true;
  }
};

const user = new Proxy({ name: 'Alice', age: 25 }, userHandler);
print(user.name);  
print(user.secret);  
user.age = -5;  

 
const secretKey = Symbol('secretKey');
user[secretKey] = 'User123Secret';

 
const promises = [
  Promise.resolve(1),
  Promise.reject('Error'),
  Promise.resolve(2),
];

Promise.allSettled(promises).then(results => {
  results.forEach(result => print(result.status, result.value || result.reason));
});

 
processUsers([1, 2, 3]);
