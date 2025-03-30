 

 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

 
const sampleData = [
  { id: 1, name: 'Alice', age: 28 },
  { id: 2, name: 'Bob', age: 32 },
];

 
const dataHandler = {
  get: (target, prop) => {
    print(`Getting property ${prop}`);
    return prop in target ? target[prop] : 'Property not found';
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

const proxyData = new Proxy(sampleData, dataHandler);

 
const createFilter = (key, value) => (item) => item[key] === value;

 
const filteredData = sampleData.filter(createFilter('age', 28));

 
(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/users');
    print('Fetched Data:', data);

     
    print(proxyData[0]);  
    proxyData[0].age = 29;  

     
    print('Filtered Data:', filteredData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
