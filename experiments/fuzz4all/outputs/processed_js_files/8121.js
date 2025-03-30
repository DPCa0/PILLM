 

const simulateFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ data: [1, 2, 3, 4, 5], status: 200 });
      } else {
        reject({ error: 'Not Found', status: 404 });
      }
    }, 1000);
  });
};

const processData = async (url) => {
  try {
    const response = await simulateFetch(url);
    if (response.status !== 200) throw new Error('Failed to fetch data');

    const { data } = response;
    const processedData = data.map(num => num * 2)
                             .filter(num => num > 5);

    print('Processed Data:', processedData);

    const result = processedData.reduce((acc, val) => acc + val, 0);
    print('Sum of Processed Data:', result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

processData('https://api.example.com/data');
