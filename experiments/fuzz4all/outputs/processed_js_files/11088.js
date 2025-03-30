 
(async () => {
   
  const { default: fetch } = await import('node-fetch');

   
  async function getData(url) {
    const response = await fetch(url);
    return await response.json();
  }

   
  const apiHandler = {
    get: function (target, property) {
      print(`Accessing property ${property}`);
      if (property in target) {
        return target[property];
      } else {
        return () => console.warn(`No API method for ${property}`);
      }
    },
  };

  const api = new Proxy(
    {
      getUser: () => getData('https://jsonplaceholder.typicode.com/users/1'),
      getPost: () => getData('https://jsonplaceholder.typicode.com/posts/1'),
    },
    apiHandler
  );

   
  const user = await api.getUser();
  print(`User Name: ${user.name}`);

   
  const { title, body } = await api.getPost();
  print(`Post Title: ${title}`);
  print(`Post Body: ${body}`);

   
  const numbers = [1, 2, 3];
  const doubleNumbers = numbers.map(n => n * 2);
  print(...doubleNumbers);

   
  const complexResult = Object.entries(user)
    .filter(([key]) => key.startsWith('a'))
    .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
    .join('; ');

  print(`Filtered User Info: ${complexResult}`);

   
  print(user.address?.city || 'City not available');

   
  function* range(start, end) {
    for (let i = start; i <= end; i++) {
      yield i;
    }
  }

  print([...range(1, 5)]);
})();
