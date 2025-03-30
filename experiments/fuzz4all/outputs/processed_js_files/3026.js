 

class Fetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

const processData = async (url) => {
  const fetcher = new Fetcher(url);
  const data = await fetcher.fetchData();

  if (!data) return;

  const uniqueData = [...new Set(data.map(item => item.id))];
  const map = new Map();
  
  for (const id of uniqueData) {
    const { name, info: { age, email } } = data.find(item => item.id === id);
    map.set(id, { name, age, email });
  }

  return [...map.values()];
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const result = await processData(url);
  print(result);
})();
