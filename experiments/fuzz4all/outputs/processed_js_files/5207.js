const fetch = require('node-fetch');

 
async function fetchData(urls) {
  try {
     
    const fetchPromises = urls.map(url => fetch(url).then(response => response.json()));
    
     
    const data = await Promise.all(fetchPromises);
    
     
    print(formatData`${data}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

 
function formatData(strings, ...values) {
  return values[0]
    .map((value, index) => `${index + 1}: ${JSON.stringify(value, null, 2)}`)
    .join('\n');
}

 
const urls = Array.from(new Set([
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
]));

 
fetchData(urls);
