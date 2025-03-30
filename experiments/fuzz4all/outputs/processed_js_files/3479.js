Certainly! Here's a JavaScript program that utilizes advanced features like Promises, async/await, destructuring, and ES6 classes in a complex way:

class DataFetcher {
  constructor(apiUrls) {
    this.apiUrls = apiUrls;
  }
  
  async fetchData() {
    try {
      const promises = this.apiUrls.map(url => fetch(url).then(res => res.json()));
      const data = await Promise.all(promises);
      
      return data.map(({ results }) => results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

class DataProcessor {
  process(data) {
    return data.flat().map(({ name, url }) => ({ name, url }));
  }
  
  display(data) {
    print('Processed Data:', data);
  }
}

(async () => {
  const apiUrls = [
    'https: 
    'https://pokeapi.co/api/v2/pokemon?offset=3&limit=3'
  ];
  
  const fetcher = new DataFetcher(apiUrls);
  const rawData = await fetcher.fetchData();

  const processor = new DataProcessor();
  const processedData = processor.process(rawData);

  processor.display(processedData);
})();

This script fetches data from two Pokémon API endpoints, processes it to extract names and URLs of the Pokémon, and then displays the processed data.