const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

class DataManager {
  constructor(data) {
    this.data = data;
  }

  filterData(predicate) {
    return this.data.filter(predicate);
  }

  async processData(callback) {
    for await (const item of this.data) {
      callback(item);
    }
  }
}

const advancedFunctionality = async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    const manager = new DataManager(data);

    const filteredData = manager.filterData(item => item.userId === 1);
    print('Filtered Data:', filteredData);

    print('Processing Data:');
    await manager.processData(item => print(item.title));
  } catch (error) {
    console.error('Error:', error);
  }
};

advancedFunctionality();
