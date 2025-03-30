 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: 'John Doe', age: 30, occupation: 'Software Developer' };
      resolve(data);
    }, 1000);
  });
};

 
const processData = async () => {
  try {
    const { name, ...rest } = await fetchData();
    print(`Fetched Data: Name - ${name}`);
    
     
    print(`Additional Details: ${JSON.stringify({ ...rest })}`);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

 
processData();
