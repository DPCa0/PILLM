 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

 
const processData = (data) => {
   
  const { name, age, ...rest } = data;
  print(`Name: ${name}, Age: ${age}`);
  print('Other Info:', { ...rest });

   
  const map = new Map(Object.entries(data));
  for (const [key, value] of map) {
    print(`${key}: ${value}`);
  }

   
  const uniqueValues = new Set(Object.values(data));
  print('Unique Values:', [...uniqueValues]);

   
  const greet = (greeting = 'Hello', ...names) => {
    names.forEach((name) => print(`${greeting}, ${name}!`));
  };
  greet('Hi', name);
};

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/users/1';  
  const data = await fetchData(url);
  if (data) processData(data);
})();
