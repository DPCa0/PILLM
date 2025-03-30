 

class DataManager {
  constructor() {
    this.data = new Map();
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  processAndStoreData = async (url) => {
    try {
      const data = await this.fetchData(url);
      for (const { id, ...rest } of data) {
        this.data.set(id, { ...rest });
      }
      print('Data processed and stored:', this.data);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  };

  *dataIterator() {
    for (const [id, value] of this.data.entries()) {
      yield { id, ...value };
    }
  }

  findDataByKey(key) {
    const result = [...this.dataIterator()].find(({ id }) => id === key);
    return result || null;
  }
}

 
(async () => {
  const dataManager = new DataManager();
  await dataManager.processAndStoreData('https://jsonplaceholder.typicode.com/posts');
  
   
  const [firstData, ...restData] = [...dataManager.dataIterator()];
  print('First data entry:', firstData);
  print('Rest of the data:', restData);

   
  const logAllData = (...entries) => {
    entries.forEach(entry => print('Entry:', entry));
  };

  logAllData(...dataManager.dataIterator());

   
  const specificData = dataManager.findDataByKey(1);
  print('Specific data found:', specificData);
})();
