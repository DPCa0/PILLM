 

 
const fetchData = async () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: 'Alice', age: 25, location: 'Wonderland' };
      Math.random() > 0.1 ? resolve(data) : reject('Data fetch failed');
    }, 1000);
  });

  try {
    const { name, age, ...rest } = await promise;  
    return { name, age, ...rest };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

 
const processData = ({ name, age, location, error }) => {
  if (error) {
    return `Error: ${error}`;
  }
  return `User ${name}, aged ${age}, is located in ${location}.`;
};

 
(async () => {
  const data = await fetchData();
  print(processData(data));  
})();
