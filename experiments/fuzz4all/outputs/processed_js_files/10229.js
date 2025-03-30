 
(async () => {
  const { default: _ } = await import('https://cdn.skypack.dev/lodash');
  
   
  const userProfile = { name: 'Alice', contact: { email: 'alice@example.com' } };
  const email = userProfile?.contact?.email ?? 'Email not provided';

  print(`User Email: ${email}`);

   
  const handler = {
    get(target, prop, receiver) {
      if (prop in target) {
        print(`Accessing ${String(prop)}`);
        return Reflect.get(target, prop, receiver);
      } else {
        print(`Property ${String(prop)} doesn't exist`);
        return 'N/A';
      }
    }
  };

  const user = new Proxy({ name: 'Bob', age: 25 }, handler);
  print(user.name);
  print(user.email);

  // Employing Promise.allSettled for handling multiple async operations
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch from ${url}`);
    return response.json();
  };

  const urls = [
    'https: 
    'https://api.github.com/users/microsoft',
    'invalid-url'
  ];

  const results = await Promise.allSettled(urls.map(fetchData));
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      print('Fetched data:', result.value);
    } else {
      console.error('Error:', result.reason);
    }
  });

   
  const original = { nested: { value: 42 } };
  const clone = typeof structuredClone === 'function' ? structuredClone(original) : _.cloneDeep(original);
  
  print('Original:', original);
  print('Clone:', clone);
})();
