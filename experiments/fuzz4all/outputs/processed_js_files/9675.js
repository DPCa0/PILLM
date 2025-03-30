 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ success: true, data: [1, 2, 3, 4, 5] });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
}

 
function* dataProcessor(dataArray) {
  for (const data of dataArray) {
    yield data * 2;
  }
}

 
(async () => {
  try {
    const result = await fetchData('https://api.example.com/data');
    if (result.success) {
       
      const [first, second, ...rest] = [...result.data];

       
      const dataMap = new Map();
      const uniqueValues = new Set(result.data);

      result.data.forEach((value) => {
        dataMap.set(value, value * 3);
      });

       
      const processor = dataProcessor(result.data);
      print(`Processed values: ${[...processor].join(', ')}`);

      print(`First: ${first}, Second: ${second}, Rest: ${rest}`);
      print(`Mapped values: ${Array.from(dataMap.entries())}`);
      print(`Unique values: ${[...uniqueValues]}`);
    }
  } catch (error) {
    console.error(error.message);
  }
})();
