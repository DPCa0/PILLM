 
const fetchData = async (url) => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { id: 1, name: 'John Doe', email: 'johndoe@example.com' } });
    }, 1000);
  });
};

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Getting ${prop} property: ${obj[prop]}`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Setting ${prop} to ${value}`);
      obj[prop] = value;
      return true;
    }
  });
};

 
(async () => {
  try {
    const url = 'https://api.example.com/user/1';
    const response = await fetchData(url);
    const user = createLoggingProxy(response.data);

     
    print(user.id);
    print(user.name);

     
    user.email = 'john.updated@example.com';

     
    print(user);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
