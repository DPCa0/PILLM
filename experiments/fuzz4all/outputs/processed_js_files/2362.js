 
const handler = {
  get(target, prop) {
    if (prop === 'secret') {
      return 'Access Denied';
    }
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    if (prop === 'frozenProperty') {
      throw new Error('Cannot modify frozenProperty');
    }
    return Reflect.set(target, prop, value);
  }
};

 
const person = {
  name: 'Alice',
  age: 30,
  secret: 'hidden'
};

 
const proxyPerson = new Proxy(person, handler);

 
async function fetchData() {
  const data = new Promise((resolve) => {
    setTimeout(() => resolve({ message: 'Hello from the Future!' }), 1000);
  });
  print(await data);
}

 
const dataMap = new Map();
dataMap.set('key1', 'value1').set('key2', 'value2');
const uniqueNumbers = new Set([1, 2, 3, 2, 1]);

 
const getUserInfo = ({ name, age }) => `Name: ${name}, Age: ${age}`;

 
(async () => {
  print('Welcome to advanced JavaScript!');
  print(proxyPerson.name);  
  print(proxyPerson.secret);  
  try {
    proxyPerson.frozenProperty = 'newValue';
  } catch (e) {
    console.error(e.message);
  }

  await fetchData();

  print(getUserInfo(proxyPerson));  
  print([...dataMap.entries()]);
  print([...uniqueNumbers]);
})();
