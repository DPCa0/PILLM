 
const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false },
  { name: 'Carol', age: 35, active: true },
  { name: 'Dave', age: 40, active: false }
];

 
async function fetchUserData() {
  return new Promise(resolve => {
    setTimeout(() => resolve(users), 1000);
  });
}

 
function* paginate(items, pageSize) {
  for (let i = 0; i < items.length; i += pageSize) {
    yield items.slice(i, i + pageSize);
  }
}

 
const userHandler = {
  get(target, prop, receiver) {
    print(`Accessing property '${prop}'`);
    return Reflect.get(target, prop, receiver);
  }
};

 
(async function() {
  const data = await fetchUserData();
  const paginatedUsers = paginate(data, 2);
  
  for (const page of paginatedUsers) {
    const proxies = page.map(user => new Proxy(user, userHandler));
    
    await Promise.all(proxies.map(async user => {
       
      return new Promise(resolve => {
        setTimeout(() => {
          print(`User: ${user.name}, Age: ${user.age}, Active: ${user.active}`);
          resolve();
        }, 500);
      });
    }));
  }
})();
