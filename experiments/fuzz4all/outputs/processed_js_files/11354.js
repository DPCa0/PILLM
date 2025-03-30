 
 

class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.apiUrl}/${endpoint}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch data: ${error}`);
    }
  }
}

const processData = async () => {
  const apiFetcher = new DataFetcher('https://jsonplaceholder.typicode.com');

  try {
    const [posts, users] = await Promise.all([
      apiFetcher.fetchData('posts'),
      apiFetcher.fetchData('users')
    ]);

    const enrichedData = posts.map((post) => {
      const user = users.find((u) => u.id === post.userId);
      return {
        ...post,
        userName: user ? user.username : 'Unknown',
        userEmail: user ? user.email : 'Unknown',
      };
    });

    console.log(`Processed Data:\n${enrichedData.slice(0, 5).map((post, index) => `
      Post ${index + 1}:
      Title: ${post.title}
      Author: ${post.userName}
      Email: ${post.userEmail}
    `).join('\n')}`);

  } catch (error) {
    console.error(`Error in processing data: ${error}`);
  }
};

processData();
