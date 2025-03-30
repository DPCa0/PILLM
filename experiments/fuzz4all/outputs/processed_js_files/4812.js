 
class APIClient {
  constructor() {
    this.baseURL = 'https://jsonplaceholder.typicode.com';
  }

   
  async fetchData(endpoint) {
    const response = await fetch(`${this.baseURL}/${endpoint}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  }
}

class DataProcessor {
   
  static *infiniteGenerator(start = 0) {
    let i = start;
    while (true) yield i++;
  }

   
  static processData(data) {
    return data.map(item => ({
      ...item,
      titleLength: item.title.length,
      randomID: Math.floor(Math.random() * 1000)
    }));
  }
}

(async () => {
  const client = new APIClient();
  try {
     
    const [users, posts] = await Promise.all([
      client.fetchData('users'),
      client.fetchData('posts')
    ]);

    const processedPosts = DataProcessor.processData(posts);

     
    const { id: firstUserId, name: firstUserName } = users[0];
    print(`User: ${firstUserName}, ID: ${firstUserId}`);
    print('Processed Posts:', processedPosts.slice(0, 5));

     
    const userProxy = new Proxy(users[0], {
      get(target, prop) {
        print(`Accessing property: ${prop}`);
        return target[prop];
      }
    });

    print(userProxy.name);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
