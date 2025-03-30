 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

 
const createValidatedObject = (obj) => {
  return new Proxy(obj, {
    set(target, prop, value) {
      if (typeof value !== 'string') {
        throw new TypeError('Property values must be strings');
      }
      target[prop] = value;
      return true;
    }
  });
};

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

 
const processUserData = ({ name = 'Guest', age = 18 } = {}) => {
  print(`Name: ${name}, Age: ${age}`);
};

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  try {
    const data = await fetchData(url);

     
    const user = createValidatedObject({});
    user.name = 'Alice';
     

     
    processUserData({ name: user.name });

     
    const idGen = idGenerator();
    print(`Generated ID: ${idGen.next().value}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();
