class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.apiUrl}/${endpoint}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  filterData(filterFn) {
    return this.data.filter(filterFn);
  }

  processData(mapFn) {
    return this.data.map(mapFn);
  }
}

(async () => {
  const fetcher = new DataFetcher('https://jsonplaceholder.typicode.com');
  try {
    const users = await fetcher.fetchData('users');
    const processor = new DataProcessor(users);

    const filteredUsers = processor.filterData(user => user.address.geo.lat > 0);
    const processedUsers = processor.processData(user => ({
      fullName: `${user.name} (${user.username})`,
      email: user.email
    }));

    print(processedUsers);
  } catch (error) {
    console.error('Error in processing data:', error);
  }
})();
