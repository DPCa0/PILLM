 
(function() {
   
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

   
  const processUser = ({ name, ...details }) => {
    print(`Name: ${name}`);
    print('Details:', details);
  };

   
  const users = [
    { id: 1, name: 'Alice', age: 28 },
    { id: 2, name: 'Bob', age: 34 },
    { id: 3, name: 'Charlie', age: 22 },
  ];

  const [firstUser, ...otherUsers] = users;
  print('First User:', firstUser);

   
  const names = users.map(user => user.name);
  const adults = users.filter(user => user.age >= 30);

  print('Names:', names);
  print('Adults:', adults);

   
  const uniqueNames = new Set(names);
  print('Unique Names:', uniqueNames);

   
  const handler = {
    get: (target, prop) => {
      return prop in target ? target[prop] : `Property ${prop} does not exist`;
    }
  };

  const proxyUser = new Proxy(users[0], handler);
  print('Proxy User Name:', proxyUser.name);
  print('Proxy User Address:', proxyUser.address);

   
  (async () => {
    const data = await fetchData('https://jsonplaceholder.typicode.com/users');
    if (data) {
      processUser(data[0]);
    }
  })();
})();
