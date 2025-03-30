 
(async () => {
  try {
     
    const { default: axios } = await import('https://cdn.skypack.dev/axios');

     
    class DataFetcher {
      #baseUrl;
      
      constructor(baseUrl) {
        this.#baseUrl = baseUrl;
      }

       
      #buildUrl(endpoint) {
        return `${this.#baseUrl}/${endpoint}`;
      }

       
      async fetchData(endpoint) {
        const url = this.#buildUrl(endpoint);
        const response = await axios.get(url);
        return response?.data;
      }
    }

     
    const fetcher = new DataFetcher('https://jsonplaceholder.typicode.com');

     
    const data = await fetcher.fetchData('posts/1');
    print(data?.title ?? 'No title found');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
