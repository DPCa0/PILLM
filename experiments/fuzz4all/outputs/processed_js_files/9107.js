class DataFetcher {
  static #apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor() {
    this.cache = new Map();
  }

  async #fetchFromApi(endpoint) {
    const response = await fetch(`${DataFetcher.#apiUrl}/${endpoint}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }

  async getData(endpoint) {
    if (this.cache.has(endpoint)) {
      print('Fetching from cache...');
      return this.cache.get(endpoint);
    }

    print('Fetching from API...');
    const data = await this.#fetchFromApi(endpoint);
    this.cache.set(endpoint, data);
    return data;
  }
}

const useAsyncHandler = async (promise) => {
  try {
    const data = await promise;
    print('Data received:', data);
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

const main = async () => {
  const dataFetcher = new DataFetcher();
  
  await useAsyncHandler(dataFetcher.getData(1));
  await useAsyncHandler(dataFetcher.getData(1));  
  await useAsyncHandler(dataFetcher.getData(2));
  
  const [firstPost, secondPost] = await Promise.all([
    dataFetcher.getData(3),
    dataFetcher.getData(4),
  ]);

  print('First Post:', firstPost);
  print('Second Post:', secondPost);
};

main();
