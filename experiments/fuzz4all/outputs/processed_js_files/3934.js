 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: 'Sample Data from ' + url });
      } else {
        reject('URL not provided');
      }
    }, 1000);
  });
}

 
async function processData(url) {
  try {
    const { data } = await fetchData(url);  
    print('Data fetched:', data);

    const parsedData = parseData(...data.split(' '));  
    print('Parsed Data:', parsedData);
  } catch (error) {
    console.error('Error:', error);
  }
}

 
function parseData(...args) {
  return args.map(word => word.toUpperCase());  
}

 
processData('https://example.com/api/data');
