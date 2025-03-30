 
async function* fetchUserData() {
  const dataSources = [
    'https://jsonplaceholder.typicode.com/users/1',
    'https://jsonplaceholder.typicode.com/users/2',
    'https://jsonplaceholder.typicode.com/users/3',
  ];

  for (const url of dataSources) {
    const response = await fetch(url);
    const userData = await response.json();
    yield userData;
  }
}

const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      throw new Error(`Property ${prop} not found`);
    }
  },
};

const run = async () => {
  const userGenerator = fetchUserData();

  for await (const userData of userGenerator) {
    const userProxy = new Proxy(userData, handler);
    try {
      print(`User ID: ${userProxy.id}, Name: ${userProxy.name}`);
       
      print(userProxy.nonExistentProperty);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
};

run();
