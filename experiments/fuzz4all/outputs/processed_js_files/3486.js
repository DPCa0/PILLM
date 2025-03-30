 
const { default: axios } = await import('https://cdn.skypack.dev/axios');

 
const createLoggerProxy = (obj) => new Proxy(obj, {
  get(target, prop) {
    print(`Property "${prop}" accessed, value: ${target[prop]}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Property "${prop}" set to value: ${value}`);
    return Reflect.set(target, prop, value);
  }
});

 
async function* fetchUsers() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  yield* response.data;
}

(async () => {
   
  const userNames = new Set();
  
  for await (const user of fetchUsers()) {
    userNames.add(user.name);
  }

   
  const [...uniqueNames] = userNames;
  
   
  uniqueNames.forEach((name, index) => {
    print(`User ${index + 1}: ${name}`);
  });
  
   
  const userStats = createLoggerProxy({ visits: 0, likes: 0 });

   
  userStats.visits += 1;
  userStats.likes += 10;
  print(`Current likes: ${userStats.likes}`);
})();
