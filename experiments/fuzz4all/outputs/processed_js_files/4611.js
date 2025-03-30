Certainly! Below is a JavaScript program that utilizes advanced features such as asynchronous programming, promises, destructuring, and arrow functions in a somewhat complex manner.

const fetchData = (url) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });

const processData = (data) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const processedData = data.split('').reverse().join('');
      resolve(processedData);
    }, 1000);
  });

async function handleRequest(urls) {
  try {
    const promises = urls.map((url) => fetchData(url).then(processData));
    const results = await Promise.all(promises);
    const [firstResult, ...restResults] = results;
    print(`First Processed Result: ${firstResult}`);
    restResults.forEach((result, index) =>
      console.log(`Processed Result ${index + 2}: ${result}`)
    );
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];

handleRequest(urls);

This script defines two promises for fetching and processing data, then uses async/await to manage multiple asynchronous operations concurrently and logs the processed results.