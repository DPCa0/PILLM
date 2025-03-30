 

const fetchData = async () => {
  return new Promise(resolve =>
    setTimeout(() => resolve({ name: 'John', age: 30, hobbies: ['reading', 'gaming'] }), 1000)
  );
};

const processData = async () => {
  const data = await fetchData();
  const { name, age, hobbies } = data;
  print(`Fetched Data: ${name}, ${age}, [${hobbies.join(', ')}]`);

   
  const hobbiesSet = new Set([...hobbies, 'coding']);
  print(`Unique Hobbies: [${[...hobbiesSet].join(', ')}]`);

   
  const userMap = new Map();
  userMap.set('name', name);
  userMap.set('age', age);
  userMap.set('hobbies', [...hobbiesSet]);

  print('User Map:', userMap);

   
  const handler = {
    get(target, property) {
      if (property in target) {
        print(`Accessed property: ${property}`);
        return target[property];
      }
      print(`Property ${property} not found!`);
    }
  };

  const proxiedUser = new Proxy(userMap, handler);
  print('Name through Proxy:', proxiedUser.get('name'));

   
  const clonedUser = { ...Object.fromEntries(userMap) };
  print('Cloned User:', clonedUser);
};

processData();
