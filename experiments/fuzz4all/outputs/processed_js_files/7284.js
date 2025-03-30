 
const factorial = (n, acc = 1) => {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc);
};

 
const createLoggingProxy = (obj) => new Proxy(obj, {
  get(target, prop) {
    print(`Accessing property "${prop}"`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting property "${prop}" to "${value}"`);
    return Reflect.set(target, prop, value);
  }
});

 
const fetchData = async (urls) => {
  try {
    const promises = urls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
      return response.json();
    });
    return Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
};

 
const sql = (strings, ...values) => {
  return strings.reduce((acc, str, i) => `${acc}${str}${values[i] ? `'${values[i]}'` : ''}`, '');
};

 
const uniqueNumbers = new Set([1, 2, 3, 3, 4]);
const userMap = new Map();
userMap.set('Alice', { age: 25, city: 'Wonderland' });
userMap.set('Bob', { age: 30, city: 'Builderland' });

 
(async () => {
  print(`Factorial of 5: ${factorial(5)}`);  

  const loggingProxy = createLoggingProxy({ name: 'Test Object' });
  print(loggingProxy.name);
  loggingProxy.name = 'Updated Object';

  const data = await fetchData(['https://jsonplaceholder.typicode.com/posts/1']);
  print(data);

  const query = sql`SELECT * FROM users WHERE id = ${1} AND name = ${'Alice'}`;
  print(query);

  print(uniqueNumbers);
  print(userMap.get('Alice'));
})();
