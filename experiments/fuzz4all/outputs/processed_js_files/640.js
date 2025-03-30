 

 
const fetchData = async (url) => {
  return new Promise((resolve) => setTimeout(() => resolve(`Data from ${url}`), 1000));
};

 
const uniqueId = Symbol('id');

 
const handler = {
  get: (obj, prop) => {
    if (prop === 'password') {
      return 'Access Denied';
    }
    return obj[prop];
  }
};

 
const userData = {
  [uniqueId]: 101,
  name: 'John Doe',
  age: 30,
  password: 'secret',
};

 
const proxyUser = new Proxy(userData, handler);

 
function* userGenerator(user) {
  for (let key in user) {
    yield [key, user[key]];
  }
}

 
(async function() {
  print('Fetching data...');
  const data = await fetchData('https://api.example.com/user');
  print(data);

  print('\nUser Information:');
  for (let [key, value] of userGenerator(proxyUser)) {
    print(`${key}: ${value}`);
  }

   
  const { name, age } = proxyUser;
  print(`\nDestructured Data: Name - ${name}, Age - ${age}`);
})();
