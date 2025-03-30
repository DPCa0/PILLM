 
const handler = {
  get: (target, property) => {
    print(`Accessing property: ${property}`);
    return Reflect.get(target, property);
  }
};

 
const user = {
  name: "Alice",
  age: 25,
  get details() {
    return `${this.name}, Age: ${this.age}`;
  }
};

 
const proxyUser = new Proxy(user, handler);

 
async function fetchUserData() {
  const [name, age] = await Promise.all([
    new Promise(resolve => setTimeout(() => resolve(proxyUser.name), 1000)),
    new Promise(resolve => setTimeout(() => resolve(proxyUser.age), 1000))
  ]);

  print(`Fetched data - Name: ${name}, Age: ${age}`);
}

 
(async () => {
  print(proxyUser.details);  
  await fetchUserData();
  print('End of execution');
})();
