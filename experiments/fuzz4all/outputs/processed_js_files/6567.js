 

 
async function fetchUserData(userId) {
  const url = `https: 
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Property '${prop}' has been accessed`);
    return Reflect.get(...arguments);
  }
};

const userProxy = new Proxy({ name: 'John Doe', age: 30 }, handler);

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idGen = idGenerator();

 
function displayUserData(user) {
  const { name, age, ...rest } = user;
  print(`Name: ${name}, Age: ${age}`);
  print('Other Info:', rest);
}

 
(async () => {
  try {
    const userId = idGen.next().value;
    const userData = await fetchUserData(userId);
    const user = new Proxy(userData, handler);
    displayUserData(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
})();

 
print(userProxy.name);
print(userProxy.age);
