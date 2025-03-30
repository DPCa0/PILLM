 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
class DataFetchError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataFetchError';
  }
}

 
async function* numberSequence(start, end) {
  for (let i = start; i <= end; i++) {
    await delay(500);
    yield i;
  }
}

 
async function fetchData(urls) {
  const fetchPromises = urls.map(url => fetch(url).then(res => {
    if (!res.ok) throw new DataFetchError(`Failed to fetch data from ${url}`);
    return res.json();
  }));

  const results = await Promise.allSettled(fetchPromises);
  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return { url: urls[index], data: result.value };
    } else {
      return { url: urls[index], error: result.reason.message };
    }
  });
}

 
(async () => {
   
  const [start, end] = [1, 5];
  const urls = ['https://jsonplaceholder.typicode.com/posts', 'https://jsonplaceholder.typicode.com/users'];

  print(`Fetching data from ${urls.length} URLs...`);
  const dataResults = await fetchData(urls);
  print('Data fetching results:', dataResults);

  print(`Generating numbers from ${start} to ${end}:`);
  for await (const num of numberSequence(start, end)) {
    print(num);
  }

   
  const userName = dataResults[1]?.data[0]?.name ?? 'Unknown';
  print(`Fetched user name: ${userName}`);
})();
