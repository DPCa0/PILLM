const data = [
  { name: 'Alice', age: 28 },
  { name: 'Bob', age: 34 },
  { name: 'Charlie', age: 22 }
];

 
const handler = {
  get(target, property, receiver) {
    print(`Getting ${property}...`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Setting ${property} to ${value}...`);
    return Reflect.set(target, property, value, receiver);
  }
};

const proxiedData = new Proxy(data, handler);

 
async function fetchData() {
  print('Fetching data...');
  const fetchPromises = proxiedData.map(user => 
    new Promise((resolve) => setTimeout(() => resolve({ ...user, status: 'fetched' }), 1000))
  );
  const results = await Promise.all(fetchPromises);
  print('Data fetched:', results);
  return results;
}

 
async function processData() {
  const fetchedData = await fetchData();
  const [firstUser, ...otherUsers] = fetchedData;
  print(`First User: ${firstUser.name}, Others:`, otherUsers.map(user => user.name));
  
   
  proxiedData.push({ name: 'Dave', age: 30 });
  proxiedData[0].age = 29;
}

 
function customMessage(strings, user) {
  return `${strings[0]}${user.name}${strings[1]}${user.age}${strings[2]}`;
}

 
print(customMessage`User: ${data[0]} is ${data[0].age} years old.`);

 
function* userGenerator(users) {
  for (const user of users) {
    yield user;
  }
}

const userGen = userGenerator(data);
for (const user of userGen) {
  print(`Generated User: ${user.name}`);
}

processData().catch(err => console.error('Error:', err));
