 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockData = {
        '/api/data': { id: 1, name: 'Sample Data' },
        '/api/user': { id: 2, name: 'John Doe' }
      };
      mockData[url] ? resolve(mockData[url]) : reject('404 Not Found');
    }, 1000);
  });
};

const apiHandler = {
  get: async (target, prop) => {
    try {
      const data = await target(prop);
      print(`Fetched data from ${prop}:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching from ${prop}:`, error);
      return null;
    }
  }
};

const api = new Proxy(fetchData, apiHandler);

(async () => {
  const data1 = await api['/api/data'];
  const user = await api['/api/user'];
  const errorTest = await api['/api/unknown'];
  print('Data:', data1);
  print('User:', user);
})();
