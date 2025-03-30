 

 
const handler = {
  get: (target, property) => {
    if (property === 'secret') {
      return 'Access Denied';
    }
    return Reflect.get(target, property);
  },
};

const sensitiveData = new Proxy({ name: 'John Doe', age: 30, secret: 'Sensitive Info' }, handler);

 
const fetchData = async () => {
  const fetchUserData = () => new Promise(resolve => setTimeout(() => resolve({ user: 'Alice' }), 1000));
  const fetchProductData = () => new Promise(resolve => setTimeout(() => resolve({ product: 'Laptop' }), 1500));

  const [user, product] = await Promise.all([fetchUserData(), fetchProductData()]);
  return { ...user, ...product };
};

 
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => `${acc}${str}<strong>${values[i] || ''}</strong>`, '');
}

const user = 'Bob';
const action = 'logged in';
const message = highlight`User ${user} has ${action}!`;

 
const items = {
  [Symbol.iterator]: function* () {
    yield* ['Apple', 'Banana', 'Cherry'];
  }
};

 
(async () => {
  print(sensitiveData.name);  
  print(sensitiveData.secret);  

  const data = await fetchData();
  print('Fetched Data:', data);  

  print('Message:', message);  

  for (const item of items) {
    print(item);  
  }
})();
