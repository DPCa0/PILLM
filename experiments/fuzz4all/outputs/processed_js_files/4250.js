 

class Fetcher {
  constructor(url) {
    this.url = url;
  }
  
  async getData() {
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

class DataProcessor {
  static process({ results }) {
     
    return results.map(({ name, height, mass }) => ({
      name,
      height: parseInt(height, 10),
      mass: parseInt(mass, 10)
    }));
  }
}

(async () => {
  const fetcher = new Fetcher('https://swapi.dev/api/people/');
  const rawData = await fetcher.getData();
  const processedData = DataProcessor.process(rawData);
  print(processedData);
})();
