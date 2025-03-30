 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ status: 200, data: { user: { name: 'John Doe', age: 30, hobbies: ['Reading', 'Traveling'] } } });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
};

 
const userHandler = {
  get: function(target, prop, receiver) {
    print(`Accessing ${prop} property`);
    return Reflect.get(target, prop, receiver);
  }
};

 
(async () => {
  try {
    const { data: { user } } = await fetchData('https://api.example.com/data');
    
     
    const proxiedUser = new Proxy(user, userHandler);

     
    const { name, ...rest } = proxiedUser;
    print(`Name: ${name}`);
    
     
    const updatedUser = { ...proxiedUser, country: 'USA' };
    print('Updated User:', updatedUser);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
