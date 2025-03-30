 

 
async function fetchData() {
  const simulateAPICall = () => new Promise(resolve => setTimeout(() => {
    resolve({
      status: 200,
      data: { users: [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }] }
    });
  }, 1000));

  try {
    let { status, data } = await simulateAPICall();
    if (status === 200) {
      displayUsers(data.users);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
function displayUsers(users) {
  for (const { name, age } of users) {
    print(`Name: ${name}, Age: ${age}`);
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Getting property: ${property}`);
    return property in target ? target[property] : 'Property does not exist';
  },
  set: (target, property, value) => {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const user = new Proxy({}, handler);
user.name = 'Charlie';
print(user.name);

 
fetchData();
