 
 

async function fetchData(url) {
  try {
     
    const mockFetch = (url) => new Promise((resolve) => {
      setTimeout(() => resolve(`Data from ${url}`), 1000);
    });

    const data = await mockFetch(url);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function processItems(...items) {
   
  return items.map(({ name, value }) => ({ [name]: value * 2 }));
}

async function main() {
  try {
     
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const promises = urls.map(fetchData);
    const results = await Promise.all(promises);

    print('Fetched Results:', results);

    const data = [
      { name: 'item1', value: 10 },
      { name: 'item2', value: 20 },
      { name: 'item3', value: 30 }
    ];

     
    const processed = processItems(...data);
    print('Processed Data:', processed);
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

main();
