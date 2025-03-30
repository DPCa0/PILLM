 
 

const fetchData = url =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: `Data from ${url}` });
      } else {
        reject(new Error('No URL provided'));
      }
    }, 1000);
  });

function* dataProcessor(data) {
  print('Processing data...');
  yield data.toUpperCase();
  yield [...data].reverse().join('');
  return data.length;
}

async function processData(url) {
  try {
    const { data } = await fetchData(url);
    print(`Fetched data: ${data}`);
    
    const generator = dataProcessor(data);
    
    for (let result of generator) {
      print(`Processed step: ${result}`);
    }

    const { value: length } = generator.next();
    print(`Data length: ${length}`);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

 
const config = { url: 'https://api.example.com/data' };
const { url } = config;

processData(url);
