 

 
const fetchData = async (endpoint) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        '/user': { id: 1, name: 'Alice' },
        '/settings': { theme: 'dark', notifications: true }
      };
      data[endpoint] ? resolve(data[endpoint]) : reject('Endpoint not found');
    }, 1000);
  });
};

 
const createDefaultMap = (defaultValue) => {
  return new Proxy(new Map(), {
    get: (map, prop) => map.has(prop) ? map.get(prop) : defaultValue,
  });
};

const main = async () => {
  try {
    const userEndpoint = '/user';
    const settingsEndpoint = '/settings';

     
    const userPromise = fetchData(userEndpoint);
    const settingsPromise = fetchData(settingsEndpoint);

    const [userData, settingsData] = await Promise.all([userPromise, settingsPromise]);

     
    const dataMap = createDefaultMap('Unknown');
    dataMap.set('User', userData);
    dataMap.set('Settings', settingsData);

    print('Fetched User:', dataMap.get('User'));
    print('Fetched Settings:', dataMap.get('Settings'));

     
    print('Fetched Non-existent:', dataMap.get('NonExistent'));
  } catch (error) {
    console.error('Error:', error);
  }
};

 
main();
