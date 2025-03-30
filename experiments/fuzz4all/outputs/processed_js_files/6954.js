 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ success: true, data: [1, 2, 3, 4, 5] });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
};

 
const processData = async (callback, ...args) => {
  try {
    const { success, data } = await fetchData(...args);
    if (success) {
      const results = callback(...data);
      print(`Processed Data: ${results.join(', ')}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

 
const sumNumbers = (...numbers) => numbers.reduce((acc, val) => acc + val, 0);

 
processData(sumNumbers, 'https://api.example.com/data');
