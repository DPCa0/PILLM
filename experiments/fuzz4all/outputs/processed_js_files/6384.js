 
 

class ApiService {
  constructor(url) {
    this.url = url;
  }

  async fetchData(endpoint) {
    const response = await fetch(`${this.url}/${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }
}

const apiService = new ApiService('https://jsonplaceholder.typicode.com');

 
const handler = {
  get(target, property, receiver) {
    const origMethod = target[property];
    return async function(...args) {
      print(`Calling ${property} with`, args);
      const result = await Reflect.apply(origMethod, target, args);
      print(`Result from ${property}:`, result);
      return result;
    };
  }
};

const proxiedApi = new Proxy(apiService, handler);

 
(async () => {
  try {
    const posts = await proxiedApi.fetchData('posts');
    const firstPost = posts[0];

     
    const { userId, id, title, body } = firstPost;
    print(`User ID: ${userId}, Post ID: ${id}`);
    print(`Title: ${title}`);
    print(`Body: ${body}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
