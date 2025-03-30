 

 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

 
const handler = {
  get: (obj, prop) => {
    print(`Property '${prop}' has been accessed.`);
    return obj[prop];
  },
};

 
const processData = ({ name: userName = 'Guest', age = 0 }) => {
  print(`User: ${userName}, Age: ${age}`);
};

 
(async () => {
  try {
     
    const user = {
      name: 'Alice',
      age: 25,
    };

     
    const proxyUser = new Proxy(user, handler);

     
    print(`Name: ${proxyUser.name}`);
    print(`Age: ${proxyUser.age}`);

     
    const apiData = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    
     
    processData(apiData);

  } catch (error) {
    console.error('Error:', error);
  }
})();
