 
const processData = ({ name, age, ...rest }) => ({
  name: name.toUpperCase(),
  ageIn5Years: age + 5,
  ...rest,
  timestamp: new Date().toISOString()
});

 
const createMultiplier = (factor) => (number) => number * factor;

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return processData(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const secret = Symbol('secret');
const user = {
  name: 'John Doe',
  age: 30,
  [secret]: 'This is a secret message'
};

const handler = {
  get: (target, prop, receiver) => {
    if (prop === secret) {
      return 'Access Denied';
    }
    return Reflect.get(target, prop, receiver);
  }
};

const proxyUser = new Proxy(user, handler);

 
const myModule = (() => {
  const privateVar = 'I am private';
  const publicVar = 'I am public';
  
  const privateMethod = () => `Accessing ${privateVar}`;

  return {
    publicMethod: () => `This is a public method and ${privateMethod()}`,
    publicVar
  };
})();

 
(async () => {
  print('Multiplied value:', createMultiplier(3)(10));  

  const processedData = await fetchData('https://jsonplaceholder.typicode.com/users/1');
  print('Processed Data:', processedData);

  print('Proxy User Name:', proxyUser.name);
  print('Attempt to access secret:', proxyUser[secret]);

  print('Module Public Var:', myModule.publicVar);
  print('Module Public Method:', myModule.publicMethod());
})();
