 

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const dataHandler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      console.warn(`Property ${prop} does not exist`);
      return undefined;
    }
  },
  set(target, prop, value) {
    if (typeof value === 'string' && value.length > 0) {
      target[prop] = value;
    } else {
      console.warn('Value must be a non-empty string');
    }
    return true;
  }
};

(async () => {
  try {
    const userData = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    const userProxy = new Proxy(userData, dataHandler);

    print(`User Name: ${userProxy.name}`);
    userProxy.username = 'NewUsername';
    print(`Updated Username: ${userProxy.username}`);

    userProxy.invalidProperty;  
    userProxy.username = '';  

  } catch (error) {
    console.error('Fetch error:', error);
  }
})();
