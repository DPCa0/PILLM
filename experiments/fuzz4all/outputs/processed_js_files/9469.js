 

class ApiFetcher {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetchData(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}

class DataProcessor {
  static process({ name, age, location: { city, country } }) {
    return `${name} is ${age} years old and lives in ${city}, ${country}.`;
  }
}

const fetchAndProcessData = async () => {
  const fetcher = new ApiFetcher('https://api.example.com/');
  try {
    const data = await fetcher.fetchData('/user');
    print(DataProcessor.process(data));
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};

fetchAndProcessData();
