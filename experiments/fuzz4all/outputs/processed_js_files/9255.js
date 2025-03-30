 

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
    }, 1000);
  });
}

 
async function processUsers() {
  const users = await fetchData();

   
  const uniqueNames = new Set(users.map(({ name }) => name));

   
  const userMap = new Map(
    users.map(({ id, name }) => [id, `User: ${name}`])
  );

  return { uniqueNames, userMap };
}

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property '${prop}'`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  }
};

 
(async () => {
  const { uniqueNames, userMap } = await processUsers();

   
  const proxiedUserMap = new Proxy(userMap, handler);

  print('Unique Names:', Array.from(uniqueNames));
  print('User Map:', proxiedUserMap);

   
  print('Get User 1:', proxiedUserMap.get(1));
  proxiedUserMap.set(3, 'User: Charlie');
  print('Get User 3:', proxiedUserMap.get(3));
})();
