 
const fetchData = async (url) => {
   
  const response = await fetch(url);
  return await response.json();
};

 
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      print(`Fetching from cache for args: ${key}`);
      return cache.get(key);
    }
    print(`Calculating result for args: ${key}`);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

 
const processData = async () => {
   
  const users = await fetchData('https://jsonplaceholder.typicode.com/users');
  
   
  const result = users
    .filter(({ address: { city } }) => city === 'South Christy')  
    .map(({ id, name, email, company: { name: companyName } }) => ({
      id,
      name,
      email,
      companyName,
    }));  

  return result;
};

 
const memoizedProcessData = memoize(processData);

 
memoizedProcessData().then((data) => print('Processed Data:', data));
memoizedProcessData().then((data) => print('Processed Data (Memoized):', data));
