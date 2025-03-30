 

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  filterData(predicate) {
    return this.data.filter(predicate);
  }

  static async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
    return response.json();
  }
}

const processData = async (url) => {
  try {
    const rawData = await DataProcessor.fetchData(url);
    const processor = new DataProcessor(rawData);

    const isEven = ({ id }) => id % 2 === 0;
    const evenData = processor.filterData(isEven);

    evenData.forEach(({ id, name }) => {
      print(`ID: ${id}, Name: ${name}`);
    });
  } catch (error) {
    console.error(error);
  }
};

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  await processData(url);
})();
