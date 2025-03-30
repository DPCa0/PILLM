 
const average = (...numbers) => numbers.reduce((a, b) => a + b, 0) / numbers.length;

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const handler = {
  get: (target, prop) => prop in target ? target[prop] : 'Property does not exist',
  set: (target, prop, value) => {
    if (typeof value === 'number') {
      target[prop] = value;
      return true;
    } else {
      console.warn(`Invalid value assignment to ${prop}: Must be a number.`);
      return false;
    }
  }
};

const data = new Proxy({}, handler);

 
(async () => {
   
  const apiData = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  print('Fetched Data:', apiData);

   
  data.value1 = 100;
  data.value2 = 'A string';  

  print('Value1:', data.value1);
  print('Non-existent value:', data.value3);

   
  print('Average of [2, 4, 6]:', average(2, 4, 6));
})();
