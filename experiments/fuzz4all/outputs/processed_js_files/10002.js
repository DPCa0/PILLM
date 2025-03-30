 

 
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

 
const dataHandler = {
  get(target, property, receiver) {
    print(`Getting property ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Setting property ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};

 
function* dataGenerator(data) {
  for (const item of data) {
    yield item;
  }
}

 
(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    let data = await fetchData(url);

     
    const proxiedData = new Proxy(data, dataHandler);

     
    const gen = dataGenerator(proxiedData);
    for (const user of gen) {
      print(`User: ${user.name}`);
    }

     
    proxiedData[0].name = "Updated Name";
    print(`Updated first user's name: ${proxiedData[0].name}`);
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
