 
 

const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const processData = ({ name, age, ...rest }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const details = { name, age, ...rest, processed: true };
      resolve(details);
    }, 1000);
  });
};

const logData = ({ name, age, processed }) => {
  print(`Name: ${name}, Age: ${age}, Processed: ${processed}`);
};

(async () => {
  try {
    const rawData = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    const processedData = await processData({ ...rawData, status: 'active' });
    logData(processedData);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();

This program fetches data from a placeholder API, processes it with a delay, and logs the processed data using various advanced JavaScript features.