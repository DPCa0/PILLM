class DataLoader {
  #data;  

  constructor(data) {
    this.#data = data;
  }

  async *[Symbol.asyncIterator]() {
    for (let item of this.#data) {
      await new Promise(resolve => setTimeout(resolve, 100));  
      yield item;
    }
  }

  static async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return new DataLoader(data);
  }
}

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  
  try {
    const dataLoader = await DataLoader.fetchData(url);

    for await (const data of dataLoader) {
      print(data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
