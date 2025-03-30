 
const fetchJson = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

 
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Getting property: ${prop}`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Setting property: ${prop} = ${value}`);
      obj[prop] = value;
      return true;
    }
  });
};

 
(async () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';

  try {
    const data = await fetchJson(apiUrl);
    print('Fetched Data:', data);
    
    const userData = createLoggingProxy({ name: 'John', age: 30 });
    print(userData.name);  
    userData.age = 31;  

    const logFetch = debounce((url) => print('Fetching:', url), 1000);
    logFetch(apiUrl);
    logFetch(apiUrl);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
