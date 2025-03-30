const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = ({ data }) =>
  data
    .map(({ id, value }) => ({ id, computedValue: value * Math.random() }))
    .sort((a, b) => b.computedValue - a.computedValue);

class DataHandler {
  #apiUrl;

  constructor(url) {
    this.#apiUrl = url;
  }

  async getProcessedData() {
    try {
      const rawData = await fetchData(this.#apiUrl);
      return processData(rawData);
    } catch (error) {
      console.error('Error fetching or processing data:', error);
      throw error;
    }
  }
}

(async () => {
  const apiHandler = new DataHandler('https://api.example.com/data');
  try {
    const processedData = await apiHandler.getProcessedData();
    print('Processed Data:', processedData);
  } catch (error) {
    console.error('Unhandled error:', error);
  }
})();
