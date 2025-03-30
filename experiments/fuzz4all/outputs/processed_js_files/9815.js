 
const fetchData = async () => {
   
  const simulateAPICall = (data, delay) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        data ? resolve(`Data received: ${data}`) : reject('No data received');
      }, delay);
    });

  try {
     
    const [data1, data2] = await Promise.all([
      simulateAPICall('User Info', 1000),
      simulateAPICall('Order Details', 1500),
    ]);

    print(data1);
    print(data2);
    
     
    const results = await Promise.all([data1, data2].map(async (data) => {
      const processedData = await simulateAPICall(`Processed ${data}`, 500);
      return processedData;
    }));

    print('Processed Results:', results.flatMap(res => res.split(' ')));
  } catch (error) {
    console.error('Error:', error);
  }
};

 
function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const sequence = infiniteSequence();
print('Generator:', sequence.next().value);
print('Generator:', sequence.next().value);

 
fetchData();
