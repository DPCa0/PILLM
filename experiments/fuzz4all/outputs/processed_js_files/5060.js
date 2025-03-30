 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

 
const displayData = ({ name, age, job }) => {
  print(`Name: ${name}, Age: ${age}, Job: ${job}`);
};

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    }
    return 'Property does not exist';
  }
};

 
const user = { name: "Alice", age: 30, job: "Engineer" };
const proxyUser = new Proxy(user, handler);

 
const fetchMultipleData = async () => {
  try {
    const [data1, data2] = await Promise.all([
      fetchData('https://api.example.com/data1'),
      fetchData('https://api.example.com/data2'),
    ]);
    displayData(data1);
    displayData(data2);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
(async () => {
   
  const module = {
    export: { fetchMultipleData, proxyUser },
    import: () => console.log('Module functions imported successfully')
  };
  
  module.import();
  
   
  await module.export.fetchMultipleData();
  
   
  print(`User: ${module.export.proxyUser.name}`);  
  print(`Non-existent Property: ${module.export.proxyUser.nonExistent}`);  
})();
