 

 
async function fetchData() {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: 'Alice', age: 30, location: 'Wonderland' });
    }, 1000);
  });
}

 
function* numberGenerator() {
  let number = 1;
  while (true) {
    yield number++;
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    }
    return `Property ${prop} does not exist.`;
  },
  set: (target, prop, value) => {
    if (typeof value === 'string') {
      target[prop] = value.toUpperCase();
      return true;
    }
    throw new TypeError('Value must be a string');
  },
};

const userProxy = new Proxy({ name: '', location: '' }, handler);

(async () => {
   
  const { user, location } = await fetchData();  
  print(`Fetched Data: User - ${user}, Location - ${location}`);

   
  userProxy.name = user;
  userProxy.location = location;
  print(`Proxy User: Name - ${userProxy.name}, Location - ${userProxy.location}`);
  
   
  const gen = numberGenerator();
  print('Generated Numbers:');
  print(gen.next().value);
  print(gen.next().value);
  print(gen.next().value);
})();
