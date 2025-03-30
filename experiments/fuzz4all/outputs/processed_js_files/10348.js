 

async function* fetchData(urls) {
  for (const url of urls) {
    const dataPromise = new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
    yield dataPromise;
  }
}

async function processUrls(urls) {
  const dataGenerator = fetchData(urls);
  const results = [];

  for await (const dataPromise of dataGenerator) {
    try {
      const data = await dataPromise;
      results.push(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  return results;
}

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
];

processUrls(urls).then(data => print('Fetched data:', data)).catch(err => console.error(err));
