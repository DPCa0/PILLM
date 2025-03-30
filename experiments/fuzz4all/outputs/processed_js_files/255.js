 
 

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Fetch Error: ${error.message}`);
    }
  }
}

const mergeObjects = (...objects) => objects.reduce((acc, obj) => ({ ...acc, ...obj }), {});

(async () => {
  const api = new ApiService('https://jsonplaceholder.typicode.com');

  const [user, posts, comments] = await Promise.all([
    api.fetchData('/users/1'),
    api.fetchData('/posts?userId=1'),
    api.fetchData('/comments?postId=1'),
  ]);

  const { name, email } = user;
  const postTitles = posts.map(({ title }) => title);
  const [{ body: firstComment }] = comments;

  print(`User: ${name}, Email: ${email}`);
  print(`Posts: ${postTitles.join(', ')}`);
  print(`First Comment: ${firstComment}`);

  const mergedData = mergeObjects(user, { postTitles }, { firstComment });
  print('Merged Data:', mergedData);
})();
