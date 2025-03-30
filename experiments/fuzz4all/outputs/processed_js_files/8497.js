 
async function fetchUserData(userId) {
   
  const fetchData = (id) => new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User${id}`, age: 20 + id });
    }, 1000);
  });

  try {
     
    const { id, name, age } = await fetchData(userId);
    print(`Fetched Data: ${name}, ${age} years old.`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

 
const userHandler = {
  get(target, property) {
    if (property in target) {
      print(`Getting property '${property}'`);
      return Reflect.get(target, property);
    }
    console.warn(`Property '${property}' does not exist`);
    return null;
  }
};

 
const user = { id: 1, name: 'Alice', age: 25 };
const proxyUser = new Proxy(user, userHandler);

 
print(proxyUser?.name ?? 'Unknown User');
print(proxyUser?.address ?? 'Address not available');

 
fetchUserData(3);

 
(() => {
  const message = 'User Information';
  print(`--- ${message} ---`);
})();

 
const userSet = new Set([1, 2, 3]);
const userMap = new Map();
userMap.set('id', 1);
userMap.set('name', 'John');

 
for (const id of userSet) {
  print(`User Set contains: ${id}`);
}

for (const [key, value] of userMap) {
  print(`User Map contains: ${key} = ${value}`);
}
