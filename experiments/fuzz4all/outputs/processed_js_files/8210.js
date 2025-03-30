 

 
function* range(start, end, step = 1) {
  for (let i = start; i <= end; i += step) {
    yield i;
  }
}

 
class AsyncDataFetcher {
  constructor(url) {
    this.url = url;
  }

   
  async fetchData() {
    const response = await fetch(this.url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }
}

 
async function processData() {
  const dataFetcher = new AsyncDataFetcher('https://jsonplaceholder.typicode.com/posts');
  
  try {
    const data = await dataFetcher.fetchData();
    print('Fetched Data:', data.slice(0, 3));  

     
    const squaredRange = await Promise.all(
      [...range(1, 5)].map(async num => {
        await new Promise(resolve => setTimeout(resolve, 100));  
        return num ** 2;
      })
    );

    print('Squared Range:', squaredRange);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
processData();
