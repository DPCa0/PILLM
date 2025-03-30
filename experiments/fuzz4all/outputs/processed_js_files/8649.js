class FetchData {
  constructor(url) {
    this.url = url;
  }

  async getData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

const processData = (data) => {
  return Object.entries(data).map(([key, value]) => ({
    [key]: typeof value === 'string' ? value.toUpperCase() : value
  }));
};

const logData = (processedData) => {
  console.group('Processed Data');
  processedData.forEach(data => console.table(data));
  console.groupEnd();
};

(async () => {
  const apiURL = 'https://jsonplaceholder.typicode.com/users';
  const fetchData = new FetchData(apiURL);

  const data = await fetchData.getData();
  if (data) {
    const processedData = processData(data);
    logData(processedData);
  }
})();
