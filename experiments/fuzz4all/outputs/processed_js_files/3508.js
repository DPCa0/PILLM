 
const dataProxy = (target) => {
  return new Proxy(target, {
    get(obj, prop) {
      if (prop in obj) {
        print(`Accessing property "${prop}":`, obj[prop]);
        return obj[prop];
      } else {
        print(`Property "${prop}" not found`);
        return null;
      }
    },
    set(obj, prop, value) {
      print(`Setting property "${prop}" to:`, value);
      obj[prop] = value;
      return true;
    }
  });
};

const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'JavaScript Mastery' });
    }, 1000);
  });
};

const processAsyncData = async () => {
  const data = await fetchData();
  const proxiedData = dataProxy(data);
  
  print('Initial Data:', proxiedData);

  proxiedData.name = 'Advanced JS Techniques';
  print('Updated Data:', proxiedData);
  
  print('Non-existing Property Access:', proxiedData.nonExistent);
};

processAsyncData();
