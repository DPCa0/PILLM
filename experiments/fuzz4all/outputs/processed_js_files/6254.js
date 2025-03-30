 

 
const fetchData = (endpoint) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        user: { id: 1, name: 'Alice' },
        settings: { theme: 'dark', notifications: true },
      };
      endpoint === '/user' ? resolve(data.user) : resolve(data.settings);
    }, 1000);
  });
};

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Accessed property: ${prop}`);
      return obj[prop];
    },
  });
};

 
async function getUserData() {
  try {
    const [user, settings] = await Promise.all([
      fetchData('/user'),
      fetchData('/settings'),
    ]);

    const proxiedUser = createLoggingProxy(user);
    const proxiedSettings = createLoggingProxy(settings);

    print(`User Name: ${proxiedUser.name}`);
    print(`User Theme: ${proxiedSettings.theme}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
getUserData();
