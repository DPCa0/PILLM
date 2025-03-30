 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ status: 200, data: { user: { id: 1, name: 'John Doe', role: 'admin' } } });
      } else {
        reject(new Error('Not Found'));
      }
    }, 1000);
  });
};

 
const delayedLog = (message, delay) => {
  return new Promise((resolve) => setTimeout(() => {
    print(message);
    resolve();
  }, delay));
};

 
const user = {
  id: 1,
  name: 'John Doe',
  role: 'admin'
};

const userProxy = new Proxy(user, {
  get(target, prop) {
    print(`Accessing property "${prop}"`);
    return target[prop];
  }
});

 
const main = async () => {
  try {
     
    const { status, data: { user: apiUser } } = await fetchData('https://api.example.com/data');

    if (status === 200) {
      const { id, name, role } = apiUser;
      print(`Fetched User - ID: ${id}, Name: ${name}, Role: ${role}`);

      await delayedLog(`Delayed message: Welcome ${name}!`, 2000);

       
      print(`Proxy User Name: ${userProxy.name}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
main();
