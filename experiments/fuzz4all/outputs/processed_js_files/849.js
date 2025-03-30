 
const logAccess = (target, property) => {
  print(`Accessed property: ${property}`);
  return target[property];
};

const handler = {
  get: (target, property, receiver) => {
    if (Reflect.has(target, property)) {
      return Reflect.get(target, property, receiver);
    } else {
      return logAccess(target, property);
    }
  },
};

const user = {
  [Symbol.for('id')]: 123,
  name: 'Alice',
  age: 30,
};

const proxyUser = new Proxy(user, handler);

const fetchData = (delay) =>
  new Promise((resolve) => setTimeout(() => resolve('Data fetched!'), delay));

async function getUserData() {
  print('Fetching user data...');
  const data = await fetchData(2000);
  print(data);
  print(`User: ${proxyUser.name}, ID: ${proxyUser[Symbol.for('id')]}`);
}

getUserData().catch((error) => console.error(error));
