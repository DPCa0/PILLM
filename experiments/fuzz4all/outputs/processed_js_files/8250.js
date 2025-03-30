 
const users = [
  { id: 1, name: 'Alice', age: 28 },
  { id: 2, name: 'Bob', age: 34 },
  { id: 3, name: 'Charlie', age: 22 }
];

 
const userProxy = new Proxy(users, {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Accessing property '${prop}'`);
      return Reflect.get(target, prop, receiver);
    } else {
      throw new Error(`Property '${prop}' does not exist on target`);
    }
  }
});

 
function* ageGenerator(userList) {
  for (const user of userList) {
    yield user.age;
  }
}

 
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    print('Fetched data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
(async function main() {
  print('Iterating over user ages:');
  
  const ages = ageGenerator(userProxy);
  for (let age of ages) {
    print(`User age: ${age}`);
  }

  await fetchData();

   
  const [firstUser, ...rest] = userProxy;
  print(`First user: ${firstUser.name}`, 'Rest:', rest);
})();
