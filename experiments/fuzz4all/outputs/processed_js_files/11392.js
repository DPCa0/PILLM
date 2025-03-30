 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      print('Fetching from cache:', key);
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

 
const processData = ({ name, age, hobbies }) => {
  const [firstHobby, ...otherHobbies] = hobbies;
  return `Name: ${name}, Age: ${age}, Hobbies: ${firstHobby}, Others: ${otherHobbies.join(', ')}`;
};

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/users/1';
  const memoizedFetch = memoize(fetchData);

  const userData = await memoizedFetch(url);
  if (userData) {
    const processedData = processData({ name: userData.name, age: userData.age, hobbies: userData.hobbies || ['Reading'] });
    print(processedData);
  }

   
  await memoizedFetch(url);
})();
