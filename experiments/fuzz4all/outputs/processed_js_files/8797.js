Certainly! Below is a JavaScript program that uses advanced features such as Promises, async/await, destructuring, and higher-order functions.

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ data: [1, 2, 3, 4, 5] });
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
};

 
const withLogging = (func) => {
  return (...args) => {
    print('Arguments:', ...args);
    const result = func(...args);
    print('Result:', result);
    return result;
  };
};

 
const processData = async (url) => {
  try {
    const { data } = await fetchData(url);
    print('Fetched Data:', data);

     
    const sum = data.reduce((acc, curr) => acc + curr, 0);
    const average = sum / data.length;
    return { sum, average };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

 
const processDataWithLogging = withLogging(processData);

 
processDataWithLogging('https://api.example.com/data').then((result) => {
  if (result) {
    print(`Sum: ${result.sum}, Average: ${result.average}`);
  }
});

This program simulates fetching data from an API and uses various JavaScript features to process and log the data.