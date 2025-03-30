 
 

 
const fetchData = (data, delay) => new Promise(resolve => setTimeout(() => resolve(data), delay));

 
function* dataGenerator() {
  yield fetchData({user: 'Alice'}, 1000);
  yield fetchData({user: 'Bob'}, 500);
  yield fetchData({user: 'Charlie'}, 1500);
}

 
async function processUsers(generator) {
  const results = [];
  for (const promise of generator) {
    const data = await promise;
    results.push(data);
  }
  return results;
}

 
const handler = {
  get(target, prop) {
    print(`Accessing property ${String(prop)}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property ${String(prop)} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
const userMap = new Proxy(new Map(), handler);

 
async function main() {
  const users = await processUsers(dataGenerator());
  users.forEach(user => {
    userMap.set(user.user, user);
  });

  print('All users processed:');
  userMap.forEach((value, key) => print(`${key}:`, value));
}

 
main();
