 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      url === 'https://api.example.com/data'
        ? resolve({ id: 1, name: 'Data Item', values: [10, 20, 30] })
        : reject('Invalid URL');
    }, 1000);
  });
};

 
const processData = async () => {
  try {
     
    const { id, name, values } = await fetchData('https://api.example.com/data');

     
    const newValues = [...values, 40, 50];

    print(`Fetched Data: ${name} (ID: ${id})`);
    print(`Values: ${newValues.join(', ')}`);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

 
const handler = {
  apply: (target, thisArg, argumentsList) => {
    print(`Calling ${target.name} with arguments: ${argumentsList}`);
    return target.apply(thisArg, argumentsList);
  }
};

 
const processDataWithLogging = new Proxy(processData, handler);

 
processDataWithLogging();
