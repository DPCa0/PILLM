 
(async () => {
  const { default: _ } = await import('lodash');

   
  const handler = {
    get: function (target, prop) {
      return prop in target ? target[prop] : `Property ${prop} does not exist`;
    },
    set: function (target, prop, value) {
      print(`Setting value '${value}' to '${prop}'`);
      target[prop] = value;
      return true;
    }
  };

  const targetObject = {
    name: 'Advanced JS',
    level: 'Intermediate'
  };

  const proxy = new Proxy(targetObject, handler);

  print(proxy.name);  
  print(proxy.nonExistentProperty);  

  proxy.newProperty = 'New Value';  
  print(proxy.newProperty);  

   
  const uniqueNumbers = new Set([1, 2, 3, 4, 5, 5, 6]);
  print(uniqueNumbers);  

  const scores = new Map();
  scores.set('Alice', 95);
  scores.set('Bob', 80);
  scores.set('Charlie', 85);

  for (const [name, score] of scores) {
    print(`${name}: ${score}`);
  }

   
  const fetchUserData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      if (!response.ok) throw new Error('Network response was not ok');
      const userData = await response.json();
      print('User data:', userData);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  fetchUserData();

   
  const user = {
    username: 'developer',
    email: 'dev@example.com'
  };
  
  const { username, email } = user;
  print(`User: ${username}, Email: ${email}`);

   
  const data = [1, 2,