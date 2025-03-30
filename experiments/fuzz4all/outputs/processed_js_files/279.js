 
const fetchData = async (url) => {
   
  const response = await fetch(url);
   
  const data = await response.json();
  return data;
};

 
const createLoggingProxy = (obj) => {
  return new Proxy(obj, {
    get(target, property) {
      print(`Accessing property "${property}"`);
      return target[property];
    },
    set(target, property, value) {
      print(`Setting property "${property}" to "${value}"`);
      target[property] = value;
      return true;
    },
  });
};

 
const processData = (data) => {
  const { id, name, ...rest } = data;
  print(`ID: ${id}, Name: ${name}`);
  print('Other Data:', rest);
};

 
function* numberGenerator(max) {
  let num = 0;
  while (num < max) {
    yield num++;
  }
}

 
const gen = numberGenerator(5);

 
Promise.all([
  fetchData('https://jsonplaceholder.typicode.com/users/1'),
  fetchData('https://jsonplaceholder.typicode.com/users/2'),
]).then(([user1, user2]) => {
  const proxyUser1 = createLoggingProxy(user1);
  const proxyUser2 = createLoggingProxy(user2);

   
  print(proxyUser1.name);
  proxyUser2.email = 'newemail@example.com';

   
  processData(proxyUser1);
  processData(proxyUser2);
});

 
for (const num of gen) {
  print(`Generated number: ${num}`);
}

 
const user = {
  address: {
    city: 'Metropolis',
  },
};
const city = user.address?.city ?? 'Default City';
print(`City: ${city}`);
