 

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      name: 'John Doe',
      age: 30,
      address: {
        city: 'New York',
        zip: '10001'
      },
      friends: ['Jane', 'Mark', 'Emma']
    });
  }, 1000);
});

 
async function getUserData() {
  const data = await fetchData();
  const { name, age, address: { city }, ...rest } = data;  
  return { name, age, city, ...rest };  
}

 
const handler = {
  get(target, property) {
    print(`Getting property: ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
(async () => {
  const user = await getUserData();
  const proxiedUser = new Proxy(user, handler);

   
  print(`User: ${proxiedUser.name}, Age: ${proxiedUser.age}, City: ${proxiedUser.city}`);
  proxiedUser.name = 'Jane Smith';
  print(`Updated User: ${proxiedUser.name}`);
})();
