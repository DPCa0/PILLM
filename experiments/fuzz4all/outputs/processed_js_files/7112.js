 

 
const fetchUser = () => new Promise((resolve) =>
  setTimeout(() => resolve({ id: 1, name: "Jane Doe", age: 30 }), 1000)
);

async function getUserData() {
   
  const user = await fetchUser();

   
  const { name, age } = user;

   
  return `User ${name} is ${age} years old.`;
}

 
const handler = {
  get(target, property) {
    print(`Property '${property}' accessed.`);
    return Reflect.get(target, property);
  },
};

 
getUserData().then((message) => {
  print(message);

   
  const userProxy = new Proxy({ id: 1, name: "Jane Doe", age: 30 }, handler);

   
  print(userProxy.name);
  print(userProxy.age);
});
