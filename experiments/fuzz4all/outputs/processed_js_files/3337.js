 

 
const fetchData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }] } });
    }, 1000);
  });

 
const processData = async () => {
  try {
    const response = await fetchData();
    const { users } = response.data;
    print('Fetched Users:', users);
    const processed = users.map((user) => ({ ...user, timestamp: new Date() }));
    return processed;
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
const dataHandler = {
  get(target, prop) {
    print(`Getting property ${prop}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  },
};

 
(async () => {
  const users = await processData();
  const proxiedUsers = new Proxy(users, dataHandler);

   
  print('First User:', proxiedUsers[0]);
  proxiedUsers[1].name = 'Charlie';
  print('Updated Users:', proxiedUsers);
})();
