const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error);
  }
};

const processData = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      let processedData = data.map(item => ({ ...item, processed: true }));
      resolve(processedData);
    } catch (error) {
      reject('Processing Error:', error);
    }
  });
};

const executePipeline = async (url) => {
  try {
    const data = await fetchData(url);
    const processedData = await processData(data);

    processedData.forEach(item => {
      print(`Item ID: ${item.id}, Processed: ${item.processed}`);
    });
  } catch (error) {
    console.error('Pipeline Error:', error);
  }
};

 
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

 
executePipeline(apiUrl);
