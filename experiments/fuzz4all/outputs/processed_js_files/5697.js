 

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const withLogging = (fn) => {
  return async function (...args) {
    print(`Arguments: ${JSON.stringify(args)}`);
    const result = await fn(...args);
    print(`Result: ${JSON.stringify(result)}`);
    return result;
  };
};

 
const targetObject = { x: 10, y: 20 };
const proxy = new Proxy(targetObject, {
  get(target, prop) {
    print(`Getting ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
});

 
const uniqueProp = Symbol('unique');
proxy[uniqueProp] = 'This is unique!';

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const loggedFetchData = withLogging(fetchData);
  const data = await loggedFetchData(url);

   
  print(proxy.x);  
  proxy.y = 30;  

  print('Unique property:', proxy[uniqueProp]);
  print('Fetched data:', data);
})();
