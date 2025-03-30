class APIClient {
  static #instance;  
  #baseURL;  

  constructor(baseURL) {
    if (APIClient.#instance) {
      return APIClient.#instance;  
    }
    this.#baseURL = baseURL;
    APIClient.#instance = this;
  }

  async fetchData(endpoint) {
    const response = await fetch(`${this.#baseURL}${endpoint}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }
}

const fetchDataWithRetry = async (endpoint, retries = 3) => {
  const client = new APIClient('https://jsonplaceholder.typicode.com');
  for (let i = 0; i < retries; i++) {
    try {
      return await client.fetchData(endpoint);
    } catch (error) {
      if (i === retries - 1) throw error;  
    }
  }
};

(async () => {
  try {
    const posts = await fetchDataWithRetry('/posts');
    const postTitles = posts.map(({ title }) => title);

    const uniqueTitles = new Set(postTitles);  

    print([...uniqueTitles]);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
