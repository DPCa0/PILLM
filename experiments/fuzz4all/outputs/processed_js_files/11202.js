 
class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

async function processData(url) {
  const fetcher = new DataFetcher(url);
  const data = await fetcher.fetchData();
  if (!data) return;

   
  const { name, age, ...rest } = data;
  print(`Name: ${name}, Age: ${age}`);

   
  const detailedData = {
    ...rest,
    processedTimestamp: new Date().toISOString(),
  };

   
  return new Promise((resolve) => {
    setTimeout(() => {
      print('Processed Data:', detailedData);
      resolve(detailedData);
    }, 2000);
  });
}

 
const API_URL = `https: 
processData(API_URL).then((result) => print('Final Result:', result));
