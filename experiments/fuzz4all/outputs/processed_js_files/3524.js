 
(async () => {
  if (typeof window !== 'undefined') {
     
    const { default: axios } = await import('https://cdn.jsdelivr.net/npm/axios@1.4.0/dist/axios.min.js');

     
    const fetchData = async (url) => {
      try {
        const { data } = await axios.get(url);
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

     
    const dataHandler = {
      get(target, prop) {
        if (prop in target) {
          return target[prop];
        } else {
          console.warn(`Property ${prop} does not exist on the target`);
          return null;
        }
      },
      set(target, prop, value) {
        if (typeof value === 'string' && value.length < 50) {
          target[prop] = value;
          return true;
        } else {
          console.error('Only strings with less than 50 characters are allowed');
          return false;
        }
      },
    };

    const dataProxy = new Proxy({}, dataHandler);

     
    const processUserData = async ({ name, ...rest }) => {
      print(`Processing data for ${name}`);
      dataProxy.name = name;
      dataProxy.additionalInfo = JSON.stringify(rest);
      print('Processed Data:', dataProxy);
    };

     
    const apiUrl = 'https://jsonplaceholder.typicode.com/users/1';
    const userData = await fetchData(apiUrl);
    await processUserData(userData);
  } else {
    console.error('This script is designed for browser environments only.');
  }
})();
