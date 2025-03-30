 

 
const userData = [
  { name: "Alice", age: 28, role: "admin" },
  { name: "Bob", age: 22, role: "user" },
  { name: "Charlie", age: 35, role: "moderator" }
];

 
const dataProxy = new Proxy(userData, {
  get(target, property) {
    print(`Accessing ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting ${property} to ${JSON.stringify(value)}`);
    target[property] = value;
    return true;
  }
});

 
async function fetchUserData() {
  print("Fetching user data...");
  return new Promise(resolve => {
    setTimeout(() => resolve(dataProxy), 1000);
  });
}

 
async function processUsers() {
  const users = await fetchUserData();
  
  const [firstUser, ...otherUsers] = users;
  
  const isAdult = ({ age }) => age >= 18;
  const adults = otherUsers.filter(isAdult);
  
  print(`First User: ${firstUser.name}`);
  print(`Adult Users: ${adults.map(({ name }) => name).join(", ")}`);
}

 
processUsers();
