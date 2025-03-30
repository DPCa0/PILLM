const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  filterByField(field, value) {
    return this.data.filter(item => item[field] === value);
  }

  sortDataByField(field) {
    return [...this.data].sort((a, b) => (a[field] > b[field] ? 1 : -1));
  }

  async processFieldAsync(field, callback) {
    for (const item of this.data) {
      item[field] = await callback(item[field]);
    }
  }
}

const url = 'https://jsonplaceholder.typicode.com/users';
fetchData(url)
  .then(data => {
    const processor = new DataProcessor(data);
    print('Filtered Data:', processor.filterByField('company', 'Romaguera-Crona'));
    print('Sorted Data:', processor.sortDataByField('name'));
    return processor.processFieldAsync('username', async (username) => {
      await new Promise(resolve => setTimeout(resolve, 100));
      return username.toUpperCase();
    });
  })
  .then(() => console.log('Field processing complete'))
  .catch(error => console.error('Error fetching or processing data:', error));
