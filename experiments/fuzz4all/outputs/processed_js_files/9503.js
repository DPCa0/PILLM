 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: "Alice", age: 25, location: "Wonderland" };
      resolve(data);
    }, 1000);
  });
};

 
async function getUserData() {
  try {
    const user = await fetchData();
    print(`Fetched User: ${user.name}, Age: ${user.age}, Location: ${user.location}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const userHandler = {
  get(target, property) {
    print(`Accessing ${property}: ${target[property]}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

async function main() {
   
  const data = await fetchData();
  const proxyUser = new Proxy(data, userHandler);

   
  print(`Name: ${proxyUser.name}`);
  proxyUser.age = 26;
  print(`Updated Age: ${proxyUser.age}`);
}

getUserData();
main();
