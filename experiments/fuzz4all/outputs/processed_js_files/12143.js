 
const fetchData = async () => {
   
  const simulateFetch = (url) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url) {
          resolve({ data: `Data from ${url}` });
        } else {
          reject('Invalid URL');
        }
      }, 1000);
    });

  try {
     
    const { data: data1 } = await simulateFetch('https://api.example.com/data1');
    print(`Fetched: ${data1}`);

    const { data: data2 } = await simulateFetch('https://api.example.com/data2');
    print(`Fetched: ${data2}`);

     
    const [response1, response2] = await Promise.all([
      simulateFetch('https://api.example.com/data3'),
      simulateFetch('https://api.example.com/data4'),
    ]);

    print(`Fetched concurrently: ${response1.data}, ${response2.data}`);

     
    const dataSet = new Set([data1, data2, response1.data, response2.data]);
    const dataMap = new Map();
    dataSet.forEach((item, index) => dataMap.set(index, item));

    print('Data stored in Map:', [...dataMap.entries()]);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
(async () => {
  await fetchData();
})();
