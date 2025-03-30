 

class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchData() {
    const response = await fetch(this.apiUrl);
    const data = await response.json();
    return data;
  }
}

function createFilter(criteria) {
  return function (item) {
    return Object.entries(criteria).every(([key, value]) => item[key] === value);
  };
}

async function processData() {
  const apiUrl = 'https://jsonplaceholder.typicode.com/users';
  const fetcher = new DataFetcher(apiUrl);

  try {
    const data = await fetcher.fetchData();
    const filterBy = { city: 'South Christy' };

    const filteredData = data.filter(user => {
      const { address: { city } } = user;  
      return createFilter(filterBy)({ city });
    });

    print('Filtered Data:', filteredData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

processData();
