 

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ name: 'Alice', age: 25, location: 'Wonderland' });
  }, 1000);
});

 
function* dataGenerator() {
  const data = yield fetchData();
  return data;
}

 
async function handleData() {
  const generator = dataGenerator();
  const { value: promise } = generator.next();
  
  try {
    const result = await promise;
    const finalData = generator.next(result).value;
    print('Fetched Data:', finalData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const createDynamicObject = (obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      return prop in target ? target[prop] : `Property ${prop} does not exist`;
    },
    set(target, prop, value) {
      print(`Setting ${prop} to ${value}`);
      target[prop] = value;
      return true;
    }
  });
};

 
(async () => {
  await handleData();

  const dynamicUser = createDynamicObject({ username: 'Bob' });
  print(dynamicUser.username);  
  print(dynamicUser.email);  
  
  dynamicUser.email = 'bob@example.com';  
  print(dynamicUser.email);  
})();
