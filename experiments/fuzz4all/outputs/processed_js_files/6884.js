 

class FetchData {
  #apiUrl;

  constructor(apiUrl) {
    this.#apiUrl = apiUrl;
  }

  async getData(endpoint) {
    try {
      const response = await fetch(`${this.#apiUrl}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

const processData = async () => {
  const api = new FetchData('https://jsonplaceholder.typicode.com');
  const dataPromise = api.getData('posts');
  
   
  const [posts, additionalData] = await Promise.all([dataPromise, Promise.resolve({ extra: 'info' })]);

   
  const { 0: firstPost, ...restPosts } = posts;

  print('First Post:', firstPost);
  print('Additional Data:', additionalData);
  print('Remaining Posts:', { ...restPosts });
};

processData();
