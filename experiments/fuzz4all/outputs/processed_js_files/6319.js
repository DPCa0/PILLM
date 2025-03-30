 
const target = {
  firstName: 'Jane',
  lastName: 'Doe',
  age: 30,
};

const handler = {
  get: (obj, prop) => {
    print(`Property '${prop}' accessed.`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Setting '${prop}' to '${value}'.`);
    obj[prop] = value;
    return true;
  },
};

const proxy = new Proxy(target, handler);

 
async function* fetchUserData(userIds) {
  for (const id of userIds) {
    print(`Fetching data for user ${id}`);
    yield new Promise((resolve) =>
      setTimeout(() => resolve({ id, name: `User${id}` }), 1000)
    );
  }
}

async function processUsers(userIds) {
  for await (const userData of fetchUserData(userIds)) {
    print(`Received:`, userData);
  }
}

const userIds = [1, 2, 3];
processUsers(userIds);

 
print(proxy.firstName);  
proxy.age = 31;  

 
function upper(strings, ...values) {
  return strings.reduce(
    (acc, str, i) => acc + str + (values[i] ? values[i].toUpperCase() : ''),
    ''
  );
}

const name = 'John';
print(upper`Hello, ${name}! Welcome to the future.`);
