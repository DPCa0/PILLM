 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, data: { user: { id: 1, name: 'John Doe', age: 30 } } });
    }, 1000);
  });
};

 
const extractUserData = ({ status, data }) => {
  if (status === 200) {
    const { user: { name, age } } = data;
    return `User: ${name}, Age: ${age}`;
  }
  return 'Error: Data not found';
};

 
const userProxyHandler = {
  get(target, prop, receiver) {
    print(`Accessed property: ${prop}`);
    return Reflect.get(...arguments);
  },
};

(async () => {
  try {
    const response = await fetchData('https://api.example.com/user');
    const userMessage = extractUserData(response);
    print(userMessage);

    const user = response.data.user;
    const proxiedUser = new Proxy(user, userProxyHandler);

     
    print(`Proxied User: ${proxiedUser.name}, Age: ${proxiedUser.age}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
