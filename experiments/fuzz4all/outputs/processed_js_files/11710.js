 

 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

 
const uniqueKey = Symbol('unique');

 
const userDataHandler = {
  get: (target, property) => {
    print(`Accessing property: ${property}`);
    if (property === uniqueKey) {
      return 'This is a unique value';
    }
    return Reflect.get(target, property);
  },
  set: (target, property, value) => {
    print(`Setting property: ${property} to ${value}`);
    return Reflect.set(target, property, value);
  }
};

 
(async () => {
  try {
    const userData = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    const proxiedUserData = new Proxy(userData, userDataHandler);

    print(proxiedUserData.name);  
    proxiedUserData.email = 'newemail@example.com';  
    print(proxiedUserData.email);  

    print(proxiedUserData[uniqueKey]);  

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
